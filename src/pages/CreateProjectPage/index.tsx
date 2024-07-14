import CredentialResponse from "@/dto/credentials/credential.response";
import GitRepoDto from "@/dto/projects/git-repo.dto";
import ProjectRepositoryRequest from "@/dto/projects/project-repository.request";
import { GitProviderEnum } from "@/etc/enums";
import BitBucketIcon from "@/icons/bitbucket";
import GithubIcon from "@/icons/github";
import GitlabIcon from "@/icons/gitlab";
import MainLayout from "@/layouts/MainLayout";
import CredentialsService from "@/services/credentials.service";
import ProjectsService from "@/services/projects.service";
import {
	ArrowLeftOutlined,
	DeleteOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import {
	Avatar,
	Button,
	Checkbox,
	Divider,
	Flex,
	Form,
	Input,
	message,
	Select,
	Space,
	Typography,
} from "antd";
import { useEffect, useState } from "react";
import CredentialSelect from "./components/CredentialSelect";
import ProviderSelect from "./components/ProviderSelect";

const { Title } = Typography;

interface ProjectRepositoryRequestFormData extends ProjectRepositoryRequest {
	provider: string;
	credential: CredentialResponse | null;
	credentialOptions: CredentialResponse[];
	repoOptions: GitRepoDto[];
	repoIndex: number;
}

export default function CreateProjectPage() {
	const getIcon = (value: string) => {
		let icon = null;
		switch (value) {
			case "github":
				icon = <GithubIcon />;
				break;
			case "gitlab":
				icon = <GitlabIcon />;
				break;
			case "bitbucket":
				icon = <BitBucketIcon />;
				break;
		}
		return icon;
	};
	const [messageApi, contextHolder] = message.useMessage();
	const [isLoading, setIsLoading] = useState(false);
	const credentialsService = CredentialsService.getInstance();
	const projectsService = ProjectsService.getInstance();
	const [credentials, setCredentials] = useState<CredentialResponse[]>([]);
	const [provider, setProvider] = useState<string>("github");
	const [selectedCredentialIndex, setSelectedCredentialIndex] =
		useState<number>();
	const [gitRepos, setGitProjects] = useState<GitRepoDto[]>([]);
	const [selectedRepoIndex, setSelectedRepoIndex] = useState<number>();

	const [isCreateMainRepo, setIsCreateMainRepo] = useState(true);
	const [mainRepoProvider, setMainRepoProvider] = useState<string>(
		GitProviderEnum.GITHUB,
	);
	const [mainRepoCredentialOptions, setMainRepoCredentialOptions] = useState<
		CredentialResponse[]
	>([]);

	useEffect(() => {
		(async () => {
			const credentials = await credentialsService.getAll(mainRepoProvider);
			setMainRepoCredentialOptions(credentials);
		})();
	}, [mainRepoProvider]);

	const childRepoInit: ProjectRepositoryRequestFormData = {
		url: "",
		credentialId: 0,
		name: "",
		provider: "",
		credential: null,
		credentialOptions: [],
		repoOptions: [],
		repoIndex: 0,
	};
	const [childrenRepos, setChildrenRepos] = useState<
		ProjectRepositoryRequestFormData[]
	>([]);

	const addChildRepository = () => {
		setChildrenRepos([...childrenRepos, childRepoInit]);
	};

	const removeChildRepository = (index: number) => {
		setChildrenRepos(childrenRepos.filter((_, i) => i !== index));
	};

	const fetchCredentials = async () => {
		setIsLoading(true);
		messageApi.open({
			key: "fetchCredentialsMsg",
			type: "loading",
			content: "Fetching credentials...",
			duration: 0,
		});
		try {
			const credentials = await credentialsService.getAll(provider);
			setCredentials(credentials);
			messageApi.destroy("fetchCredentialsMsg");
		} catch (err) {
			console.log(err);
			messageApi.open({
				key: "fetchCredentialsMsg",
				type: "error",
				content: "Error while fetching credentials!",
				duration: 1.5,
			});
		}
		setIsLoading(false);
	};

	const fetchRepos = async () => {
		if (selectedCredentialIndex != null) {
			setIsLoading(true);
			messageApi.open({
				key: "fetchReposMsg",
				type: "loading",
				content: "Fetching repositories...",
				duration: 0,
			});
			try {
				const gitRepos = await projectsService.getGitRepos(
					provider,
					credentials[selectedCredentialIndex].id,
				);
				setGitProjects(gitRepos);
				messageApi.destroy("fetchReposMsg");
			} catch (err) {
				console.log(err);
				messageApi.open({
					key: "fetchReposMsg",
					type: "error",
					content: "Error while fetching repositories!",
					duration: 1.5,
				});
			}
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setSelectedCredentialIndex(undefined);
		fetchCredentials();
	}, [provider]);

	useEffect(() => {
		setSelectedRepoIndex(undefined);
		fetchRepos();
	}, [selectedCredentialIndex]);

	return (
		<MainLayout>
			{contextHolder}
			<Title>Create Project</Title>
			<Flex vertical>
				<Form size="large" disabled={isLoading}>
					<Title level={3}>Project Info</Title>
					<Form.Item label="Project Name">
						<Input placeholder="Project Name" />
					</Form.Item>
					<Form.Item label="Description">
						<Input placeholder="Description" />
					</Form.Item>
					<Form.Item>
						<Checkbox
							defaultChecked
							value={isCreateMainRepo}
							onChange={(e) => setIsCreateMainRepo(e.target.checked)}
						>
							Create project repository
						</Checkbox>
					</Form.Item>
				</Form>
				<Form<ProjectRepositoryRequest>
					disabled={!isCreateMainRepo || isLoading}
					size="large"
				>
					<Form.Item label="Provider">
						<ProviderSelect
							value={mainRepoProvider}
							onChange={(value) => setMainRepoProvider(value)}
						/>
					</Form.Item>
					<Form.Item label="Account">
						<CredentialSelect data={mainRepoCredentialOptions} />
					</Form.Item>
					<Form.Item label="Repository Name">
						<Input placeholder="Repository Name" />
					</Form.Item>
				</Form>
				<Divider />
				<Flex vertical>
					<Flex vertical>
						{childrenRepos.map((item, index) => (
							<Form
								key={index}
								layout="vertical"
								size="large"
								disabled={isLoading}
							>
								<Title level={3}>Project Repositories</Title>
								<Flex vertical>
									<Space style={{ marginBottom: 10 }}>
										<Title style={{ margin: 0 }} level={4}>
											Repository {index + 1}
										</Title>
										<Button
											icon={<DeleteOutlined />}
											style={{ color: "red" }}
											type="text"
											onClick={() => removeChildRepository(index)}
										></Button>
									</Space>
									<Form.Item label="Provider">
										<ProviderSelect
											value={item.provider}
											onChange={(value) => {
												(async () => {
													const credentials = await credentialsService.getAll(
														value,
													);
													setChildrenRepos((prev) => {
														prev[index].provider = value;
														prev[index].credentialOptions = credentials;
														return [...prev];
													});
												})();
											}}
										/>
									</Form.Item>
									<Form.Item label="Account">
										<CredentialSelect
											value={item.credential || undefined}
											data={item.credentialOptions}
											onChange={(value) => {
												setChildrenRepos((prev) => {
													prev[index].credential = value;
													prev[index].credentialId = value.id;
													return [...prev];
												});
												(async () => {
													const repos = await projectsService.getGitRepos(
														item.provider,
														value.id,
													);
													setChildrenRepos((prev) => {
														prev[index].repoOptions = repos;
														return [...prev];
													});
												})();
											}}
										/>
									</Form.Item>
									<Form.Item label="Repository">
										<Select
											value={item.repoIndex}
											onChange={(value) => {
												setChildrenRepos((prev) => {
													prev[index].repoIndex = value;
													prev[index].url = prev[index].repoOptions[value].url;
													prev[index].name =
														prev[index].repoOptions[value].name;
													return [...prev];
												});
											}}
											placeholder="Select Repository"
											options={item.repoOptions.map((item, index) => ({
												label: item.name,
												value: index,
											}))}
											filterOption={(input, option) =>
												(option?.label ?? "")
													.toLowerCase()
													.includes(input.toLowerCase())
											}
											showSearch
										/>
									</Form.Item>
								</Flex>
							</Form>
						))}
					</Flex>
					<Button icon={<PlusOutlined />} onClick={addChildRepository}>
						Add Child Repository
					</Button>
				</Flex>
			</Flex>
			<Divider />
			<Button type="primary" htmlType="submit">
				Save
			</Button>
		</MainLayout>
	);
}
