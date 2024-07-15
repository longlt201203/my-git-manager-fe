import CredentialSelect from "@/components/CredentialSelect3";
import ProviderSelect from "@/components/ProviderSelect";
import RepositorySelect from "@/components/RepositorySelect2";
import CredentialResponse from "@/dto/credentials/credential.response";
import ProjectRequest from "@/dto/projects/project.request";
import MainLayout from "@/layouts/MainLayout";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Checkbox,
	Divider,
	Flex,
	Form,
	Input,
	InputNumber,
	message,
	Space,
	Typography,
} from "antd";
import { useState } from "react";

const { Title } = Typography;

export default function CreateProjectPage() {
	const [form] = Form.useForm<ProjectRequest>();
	const [messageApi, contextHolder] = message.useMessage();
	const repositorySelectFetchingMsgKey = "repositorySelectFetching";

	const handleFormFinish = (data: ProjectRequest) => {
		console.log(data);
	};

	const [createProjectRepository, setCreateProjectRepository] = useState(true);
	const [mainRepoProvider, setMainRepoProvider] = useState<string>();
	const [childrenReposProvider, setChildrenReposProvider] = useState<string[]>(
		[],
	);
	const [childrenReposCredential, setChildrenReposCredential] = useState<
		(CredentialResponse | undefined)[]
	>([]);
	const [repositorySelectFetching, setRepositorySelectFetching] =
		useState(false);

	return (
		<MainLayout>
			{contextHolder}
			<Title>Create Project</Title>
			<Form<ProjectRequest>
				form={form}
				size="large"
				layout="vertical"
				onFinish={handleFormFinish}
				disabled={repositorySelectFetching}
			>
				<Title level={3}>Project Info</Title>
				<Form.Item
					name="name"
					label="Project Name"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input placeholder="Project Name" />
				</Form.Item>
				<Form.Item
					name="description"
					label="Project Description"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input placeholder="Project Description" />
				</Form.Item>
				<Form.Item>
					<Checkbox
						checked={createProjectRepository}
						onChange={(e) => setCreateProjectRepository(e.target.checked)}
					>
						Create Project Repository
					</Checkbox>
				</Form.Item>
				<Form.Item
					label="Provider"
					name={["mainRepo", "provider"]}
					rules={[
						{
							required: createProjectRepository,
						},
					]}
				>
					<ProviderSelect
						disabled={!createProjectRepository}
						onChange={(provider) => setMainRepoProvider(provider)}
					/>
				</Form.Item>
				<Form.Item
					label="Account"
					name={["mainRepo", "credential"]}
					rules={[
						{
							required: createProjectRepository,
						},
					]}
				>
					<CredentialSelect
						disabled={!createProjectRepository}
						provider={mainRepoProvider}
						onChange={(credential) => {
							form.setFieldValue(["mainRepo", "credentialId"], credential?.id);
						}}
					/>
				</Form.Item>
				<Form.Item<ProjectRequest> name={["mainRepo", "credentialId"]} hidden>
					<InputNumber />
				</Form.Item>
				<Form.Item<ProjectRequest>
					name={["mainRepo", "name"]}
					label="Repository Name"
					rules={[
						{
							required: createProjectRepository,
						},
					]}
				>
					<Input
						placeholder="Repository Name"
						disabled={!createProjectRepository}
					/>
				</Form.Item>
				<Divider />
				<Title level={3}>Project Repositories</Title>
				<Form.List name="childrenRepos">
					{(fields, { add, remove }) => (
						<>
							{fields.map((item, index) => (
								<Flex key={item.key} vertical>
									<Space>
										<Title style={{ marginBottom: 0 }} level={4}>
											Repository {index + 1}
										</Title>
										<Button
											type="text"
											icon={<DeleteOutlined style={{ color: "red" }} />}
											onClick={() => {
												setChildrenReposProvider((prev) => {
													prev.splice(index, 1);
													return [...prev];
												});
												remove(item.name);
											}}
										></Button>
									</Space>
									<Form.Item
										label="Provider"
										name={[item.name, "provider"]}
										rules={[
											{
												required: true,
											},
										]}
									>
										<ProviderSelect
											value={childrenReposProvider[index]}
											onChange={(provider) => {
												setChildrenReposCredential((prev) => {
													prev[index] = undefined;
													return [...prev];
												});
												setChildrenReposProvider((prev) => {
													prev[index] = provider;
													return [...prev];
												});
											}}
										/>
									</Form.Item>
									<Form.Item
										label="Account"
										name={[item.name, "credential"]}
										rules={[
											{
												required: true,
											},
										]}
									>
										<CredentialSelect
											value={childrenReposCredential[index]}
											provider={childrenReposProvider[index]}
											onChange={(credential) =>
												setChildrenReposCredential((prev) => {
													prev[index] = credential;
													return [...prev];
												})
											}
										/>
									</Form.Item>
									<Form.Item name={[item.name, "credentialId"]} hidden>
										<InputNumber value={childrenReposCredential[index]?.id} />
									</Form.Item>
									<Form.Item
										label="Repository"
										name={[item.name, "gitRepo"]}
										rules={[
											{
												required: true,
											},
										]}
									>
										<RepositorySelect
											provider={childrenReposProvider[index]}
											credentialId={childrenReposCredential[index]?.id}
											onFetching={() => {
												setRepositorySelectFetching(true);
												messageApi.open({
													key: repositorySelectFetchingMsgKey,
													content: "Fetching Repositories...",
													type: "loading",
													duration: 0,
												});
											}}
											onFinishFetching={(err) => {
												if (err) {
													messageApi.open({
														key: repositorySelectFetchingMsgKey,
														content: "Failed to fetch repositories! Try again!",
														type: "error",
														duration: 3,
													});
												} else {
													messageApi.destroy(repositorySelectFetchingMsgKey);
												}
												setRepositorySelectFetching(false);
											}}
										/>
									</Form.Item>
								</Flex>
							))}
							<Form.Item>
								<Button
									size="middle"
									icon={<PlusOutlined />}
									onClick={() => add()}
								>
									Add Repository
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
				<Divider />
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Save
					</Button>
				</Form.Item>
			</Form>
		</MainLayout>
	);
}
