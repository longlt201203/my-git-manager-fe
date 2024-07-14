import CredentialSelect from "@/components/CredentialSelect";
import ProviderSelect from "@/components/ProviderSelect";
import RepositorySelect from "@/components/RepositorySelect";
import CredentialResponse from "@/dto/credentials/credential.response";
import GitRepoDto from "@/dto/projects/git-repo.dto";
import CredentialsService from "@/services/credentials.service";
import ProjectsService from "@/services/projects.service";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Space } from "antd";
import { useEffect, useState } from "react";

export default function ProjectRepositoryForm() {
	const credentialsService = CredentialsService.getInstance();
	const projectsService = ProjectsService.getInstance();

	const [provider, setProvider] = useState<string | null>(null);
	const [credentialOptions, setCredentialOptions] = useState<
		CredentialResponse[]
	>([]);
	const [credential, setCredential] = useState<CredentialResponse | null>(null);
	const [repos, setRepos] = useState<GitRepoDto[]>([]);
	const [selectedRepo, setSelectedRepo] = useState<GitRepoDto | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchCredentials = async () => {
		if (provider) {
			const credentials = await credentialsService.getAll(provider);
			setCredentialOptions(credentials);
		}
	};

	const fetchRepos = async () => {
		if (provider && credential) {
			setIsLoading(true);
			try {
				const repos = await projectsService.getGitRepos(
					provider,
					credential.id,
				);
				setRepos(repos);
			} catch (err) {
				console.log(err);
			}
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setCredential(null);
		setCredentialOptions([]);
		fetchCredentials();
	}, [provider]);

	useEffect(() => {
		setSelectedRepo(null);
		setRepos([]);
		fetchRepos();
	}, [credential]);

	return (
		<Form layout="vertical" size="large" disabled={isLoading}>
			<Form.Item label="Provider">
				<ProviderSelect
					value={provider}
					onChange={(provider) => setProvider(provider)}
				/>
			</Form.Item>
			<Form.Item label="Account">
				<CredentialSelect
					data={credentialOptions}
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
			>
				<RepositorySelect
					data={repos}
					value={selectedRepo}
					onChange={(repo) => setSelectedRepo(repo)}
				/>
			</Form.Item>
		</Form>
	);
}
