import MainLayout from "@/layouts/MainLayout";
import { Button, Divider, Flex, Space, Typography } from "antd";
import ProjectInfoForm from "./components/ProjectInfoForm";
import ProjectRepositoryListForm, {
	useProjectRepositoryListFormForm,
} from "./components/ProjectRepositoryListForm";

const { Title } = Typography;

export default function CreateProjectPage() {
	const projectRepositoryListForm = useProjectRepositoryListFormForm();

	return (
		<MainLayout>
			<Title>Create Project</Title>
			<Flex vertical>
				<Title level={3}>Project Info</Title>
				<ProjectInfoForm />
				<Divider />
				<Title level={3}>Project Repositories</Title>
				<ProjectRepositoryListForm form={projectRepositoryListForm} />
				<Divider />
				<Space>
					<Button size="large" type="primary">
						Save
					</Button>
				</Space>
			</Flex>
		</MainLayout>
	);
}
