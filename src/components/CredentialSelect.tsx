import CredentialResponse from "@/dto/credentials/credential.response";
import { Avatar, Select, Space } from "antd";
import { useEffect, useState } from "react";

export interface CredentialSelectProps {
	data: CredentialResponse[];
	value?: CredentialResponse | null;
	onChange?: (credential: CredentialResponse) => void;
	disabled?: boolean;
}

export default function CredentialSelect({
	value,
	onChange,
	data,
	disabled,
}: CredentialSelectProps) {
	const [index, setIndex] = useState<number | undefined>(
		value ? data.findIndex((item) => item.id === value.id) : undefined,
	);

	const handleChange = (value: number) => {
		setIndex(value);
		onChange && onChange(data[value]);
	};

	useEffect(() => {
		setIndex(undefined);
	}, [data]);

	return (
		<Select
			value={index}
			onChange={handleChange}
			placeholder="Select Account"
			options={data.map((item, index) => ({
				label: `${item.name} (${item.username})`,
				value: index,
				avatar: item.avatar,
			}))}
			optionRender={({ label, data }) => (
				<Space>
					{<Avatar size="default" src={data.avatar} />}
					{label}
				</Space>
			)}
			disabled={disabled}
		/>
	);
}
