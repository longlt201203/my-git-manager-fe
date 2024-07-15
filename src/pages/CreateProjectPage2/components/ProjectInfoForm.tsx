import CredentialSelect from "@/components/CredentialSelect";
import ProviderSelect from "@/components/ProviderSelect";
import CredentialResponse from "@/dto/credentials/credential.response";
import ProjectRequest from "@/dto/projects/project.request";
import { Checkbox, Form, Input } from "antd";
import { useEffect, useState } from "react";

interface ProjectInfoFormProps {
	form?: ProjectInfoFormInstance;
}

export default function ProjectInfoForm({ form }: ProjectInfoFormProps) {
	const [isCreateProjectRepository, setIsCreateProjectRepository] =
		useState(true);
	const [provider, setProvider] = useState<string | null>(null);
	const [credential, setCredential] = useState<CredentialResponse>();

	useEffect(() => {
		setCredential(undefined);
	}, [provider]);

	if (form) form.submit = (cb) => {};

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
					provider={provider}
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

export interface ProjectInfoFormInstance {
	submit: (cb: (data: ProjectRequest) => void) => void;
}

export const useProjectRepositoryForm = (): ProjectInfoFormInstance => {
	return {
		submit: () => {},
	};
};
