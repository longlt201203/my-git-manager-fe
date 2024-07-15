import MainLayout from "@/layouts/MainLayout";
import { Button, Divider, Flex, Space, Typography } from "antd";
import ProjectInfoForm from "./components/ProjectInfoForm";
import ProjectRepositoryListForm, {
	useProjectRepositoryListForm,
} from "./components/ProjectRepositoryListForm";

const { Title } = Typography;

export default function CreateProjectPage() {
	const projectRepositoryListForm = useProjectRepositoryListForm();

	const handleSave = () => {
		projectRepositoryListForm.submit((data) => {
			console.log(data);
		});
	};

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
					<Button size="large" type="primary" onClick={handleSave}>
						Save
					</Button>
				</Space>
			</Flex>
		</MainLayout>
	);
}
