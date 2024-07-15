import CredentialResponse from "@/dto/credentials/credential.response";
import CredentialsService from "@/services/credentials.service";
import { Avatar, Select, Space } from "antd";
import { useEffect, useState } from "react";

interface CredentialSelectProps {
	provider?: string;
	value?: CredentialResponse;
	onChange?: (value?: CredentialResponse) => void;
	disabled?: boolean;
}

export default function CredentialSelect({
	provider,
	value,
	onChange,
	disabled,
}: CredentialSelectProps) {
	const [selectedCredential, setSelectedCredential] = useState<
		CredentialResponse | undefined
	>();
	const [credentialOptions, setCredentialOptions] = useState<
		CredentialResponse[]
	>([]);

	const fetchCredentials = async () => {
		if (provider) {
			const credentialsService = CredentialsService.getInstance();
			const data = await credentialsService.getAll(provider);
			setCredentialOptions(data);
		}
	};

	const triggerChange = (value: number | undefined) => {
		let selectCredential = undefined;
		if (value) {
			selectCredential = credentialOptions.find((item) => item.id == value);
		}
		setSelectedCredential(selectCredential);
		onChange?.(selectCredential);
	};

	useEffect(() => {
		triggerChange(undefined);
		setCredentialOptions([]);
		fetchCredentials();
	}, [provider]);

	return (
		<Select
			options={credentialOptions.map((item) => ({
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
			value={value?.id || selectedCredential?.id}
			onChange={triggerChange}
			disabled={disabled}
		/>
	);
}
