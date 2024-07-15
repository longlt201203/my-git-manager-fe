import CredentialResponse from "@/dto/credentials/credential.response";
import CredentialsService from "@/services/credentials.service";
import { Avatar, Select, Space } from "antd";
import { useEffect, useState } from "react";

export interface CredentialSelectProps {
	value?: number | null;
	onChange?: (credential: CredentialResponse | undefined) => void;
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
	const [internalValue, setInternalValue] = useState(value);

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
		handleChange(undefined);
		setData([]);
		fetchCredentials();
	}, [provider]);

	const handleChange = (value: number | undefined) => {
		setInternalValue(value);
		const item = data.find((item) => item.id == value);
		onChange && onChange(item);
	};

	return (
		<Select
			value={internalValue}
			onChange={handleChange}
			placeholder="Select Account"
			options={data.map((item) => ({
				label: `${item.name} (${item.username})`,
				value: item.id,
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
