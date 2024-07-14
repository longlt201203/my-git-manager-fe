import CredentialSelect from "@/components/CredentialSelect";
import ProviderSelect from "@/components/ProviderSelect";
import CredentialResponse from "@/dto/credentials/credential.response";
import CredentialsService from "@/services/credentials.service";
import { Checkbox, Form, Input } from "antd";
import { useEffect, useState } from "react";

export default function ProjectInfoForm() {
	const credentialsService = CredentialsService.getInstance();

	const [isCreateProjectRepository, setIsCreateProjectRepository] =
		useState(true);
	const [provider, setProvider] = useState<string | null>(null);
	const [credentialOptions, setCredentialOptions] = useState<
		CredentialResponse[]
	>([]);
	const [credential, setCredential] = useState<CredentialResponse>();

	const fetchCredentials = async () => {
		if (!provider) return;
		const credentials = await credentialsService.getAll(provider);
		setCredentialOptions(credentials);
	};

	useEffect(() => {
		setCredential(undefined);
		fetchCredentials();
	}, [provider]);

	return (
		<Form size="large" layout="vertical">
			<Form.Item label="Project Name">
				<Input placeholder="Project Name" />
			</Form.Item>
			<Form.Item label="Description">
				<Input placeholder="Description" />
			</Form.Item>
			<Form.Item>
				<Checkbox
					onChange={(e) => setIsCreateProjectRepository(e.target.checked)}
					checked={isCreateProjectRepository}
				>
					Create project repository
				</Checkbox>
			</Form.Item>
			<Form.Item label="Provider">
				<ProviderSelect
					value={provider}
					onChange={(provider) => setProvider(provider)}
					disabled={!isCreateProjectRepository}
				/>
			</Form.Item>
			<Form.Item label="Account">
				<CredentialSelect
					data={credentialOptions}
					value={credential}
					onChange={(credential) => setCredential(credential)}
					disabled={!isCreateProjectRepository}
				/>
			</Form.Item>
			<Form.Item label="Repository Name">
				<Input
					placeholder="Repository Name"
					disabled={!isCreateProjectRepository}
				/>
			</Form.Item>
		</Form>
	);
}
