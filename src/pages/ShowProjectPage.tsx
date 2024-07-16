import ProjectResponse from "@/dto/projects/project.response";
import VSCodeIcon from "@/icons/vscode";
import MainLayout from "@/layouts/MainLayout";
import ProjectsService from "@/services/projects.service";
import { LinkOutlined, ReadOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Form,
	Input,
	List,
	Space,
	Tooltip,
	Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

export default function ShowProjectPage() {
	const { id } = useParams();
	const [project, setProject] = useState<ProjectResponse>();
	const projectsService = ProjectsService.getInstance();

	const fetchProject = async () => {
		if (id && parseInt(id)) {
			const data = await projectsService.getOne(parseInt(id));
			setProject(data);
		} else {
		}
	};

	useEffect(() => {
		fetchProject();
	}, []);

	return (
		<MainLayout>
			<Title>{project?.name}</Title>
			<Space direction="vertical">
				<Text>{project?.description}</Text>
			</Space>
			<Title level={2}>Repositories</Title>
			<List
				grid={{ gutter: 8, xxl: 5, xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }}
				dataSource={project?.childrenRepos}
				renderItem={(item) => (
					<List.Item key={item.id}>
						<Card
							title={item.name}
							actions={[
								<Tooltip title="Open README.md">
									<Button icon={<ReadOutlined />}></Button>
								</Tooltip>,
								<Tooltip title="Open Git Repository">
									<Button icon={<LinkOutlined />}></Button>
								</Tooltip>,
								<Tooltip title="Open with VSCode">
									<Button icon={<VSCodeIcon />}></Button>
								</Tooltip>,
							]}
						>
							<Form variant="borderless" size="small">
								<Form.Item label="Git URL">
									<Input
										value={item.url}
										readOnly
										onClick={(e) => e.currentTarget.select()}
									/>
								</Form.Item>
								<Form.Item label="Credential">
									<Input
										value={`${item.credential.name} (${item.credential.username})`}
										readOnly
									/>
								</Form.Item>
							</Form>
						</Card>
					</List.Item>
				)}
			/>
		</MainLayout>
	);
}
