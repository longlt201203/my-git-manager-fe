import CredentialResponse from "@/dto/credentials/credential.response";
import CredentialsService from "@/services/credentials.service";
import { Avatar, Select, Space } from "antd";
import { useEffect, useState } from "react";

export interface CredentialSelectProps {
	value?: CredentialResponse | null;
	onChange?: (credential: CredentialResponse) => void;
	onFetching?: () => void;
	onFinishFetching?: (err?: any) => void;
	disabled?: boolean;
	provider?: string | null;
}

export default function CredentialSelect({
	value,
	provider,
	onChange,
	onFetching,
	onFinishFetching,
	disabled,
}: CredentialSelectProps) {
	const credentialsService = CredentialsService.getInstance();
	const [data, setData] = useState<CredentialResponse[]>([]);

	const fetchCredentials = async () => {
		if (provider) {
			let error = undefined;
			onFetching && onFetching();
			try {
				const credentials = await credentialsService.getAll(provider);
				setData(credentials);
			} catch (err) {
				error = err;
			}
			onFinishFetching && onFinishFetching(error);
		}
	};

	useEffect(() => {
		setData([]);
		fetchCredentials();
	}, [provider]);

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
