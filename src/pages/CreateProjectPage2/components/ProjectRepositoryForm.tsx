import CredentialSelect from "@/components/CredentialSelect";
import ProviderSelect from "@/components/ProviderSelect";
import RepositorySelect from "@/components/RepositorySelect";
import CredentialResponse from "@/dto/credentials/credential.response";
import GitRepoDto from "@/dto/projects/git-repo.dto";
import ProjectRepositoryRequest from "@/dto/projects/project-repository.request";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, message, Space } from "antd";
import { useEffect, useState } from "react";

export interface ProjectRepositoryFormProps {
	form?: ProjectRepositoryFormInstance;
}

export default function ProjectRepositoryForm({
	form,
}: ProjectRepositoryFormProps) {
	const [internalForm] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();
	const [provider, setProvider] = useState<string | null>(null);
	const [credential, setCredential] = useState<CredentialResponse | null>(null);
	const [selectedRepo, setSelectedRepo] = useState<GitRepoDto | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setCredential(null);
	}, [provider]);

	useEffect(() => {
		setSelectedRepo(null);
	}, [credential]);

	if (form)
		form.submit = (cb) => {
			if (provider && credential && selectedRepo)
				cb({
					credentialId: credential.id,
					name: selectedRepo.name,
					url: selectedRepo.url,
				});
		};

	return (
		<>
			{contextHolder}
			<Form
				form={internalForm}
				layout="vertical"
				size="large"
				disabled={isLoading}
			>
				<Form.Item label="Provider" required>
					<ProviderSelect
						value={provider}
						onChange={(provider) => setProvider(provider)}
					/>
				</Form.Item>
				<Form.Item label="Account" required>
					<CredentialSelect
						provider={provider}
						value={credential}
						onChange={(credential) => setCredential(credential)}
					/>
				</Form.Item>
				<Form.Item
					label={
						<Space>
							{`Repository`}
							{isLoading && <LoadingOutlined />}
						</Space>
					}
					required
				>
					<RepositorySelect
						provider={provider}
						credentialId={credential?.id}
						value={selectedRepo}
						onChange={(repo) => setSelectedRepo(repo)}
						onFetching={() => setIsLoading(true)}
						onFinishFetching={(err) => {
							if (err) {
								messageApi.error(
									"Error while fetching repositories of this credential! Try again!",
									3,
								);
							}
							setIsLoading(false);
						}}
					/>
				</Form.Item>
			</Form>
		</>
	);
}

export interface ProjectRepositoryFormInstance {
	submit: (cb: (data: ProjectRepositoryRequest) => void) => void;
}

export const useProjectRepositoryForm = (): ProjectRepositoryFormInstance => {
	return {
		submit: () => {},
	};
};
