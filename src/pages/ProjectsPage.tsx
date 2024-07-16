import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import { Button, List, Space, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProjectInfoResponse from "@/dto/projects/project-info.response";
import ProjectsService from "@/services/projects.service";
import PaginationDto from "@/dto/pagination.dto";
import ProjectQuery from "@/dto/projects/project.query";
import dayjs from "dayjs";

const { Title, Link, Text } = Typography;

export default function ProjectsPage() {
	const projectsService = ProjectsService.getInstance();
	const [projects, setProjects] = useState<ProjectInfoResponse[]>([]);
	const [listPagination, setListPagination] = useState<PaginationDto>({
		page: 1,
		take: 10,
		totalPage: 0,
		totalRecord: 0,
	});

	const fetchProjects = async (query: ProjectQuery) => {
		const [projects, pagination] = await projectsService.getMany(query);
		setListPagination(pagination);
		setProjects(projects);
	};

	const handleChangePagination = (page: number, pageSize: number) => {
		fetchProjects({ page: page, take: pageSize });
	};

	useEffect(() => {
		fetchProjects({ page: 1, take: 10 });
	}, []);

	const navigate = useNavigate();

	return (
		<MainLayout>
			<Title>Projects</Title>
			<Button
				icon={<PlusCircleOutlined />}
				type="primary"
				onClick={() => navigate("create")}
			>
				Create Project
			</Button>
			<List
				dataSource={projects}
				renderItem={(item) => (
					<List.Item key={item.id}>
						<List.Item.Meta
							title={
								<Link
									className="text-lg font-bold"
									href={`/projects/${item.id}`}
								>
									{item.name}
								</Link>
							}
							description={
								<Space direction="vertical">
									<Text>{item.description}</Text>
									<Text>
										Created At:{" "}
										{dayjs(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}
									</Text>
									<Text>
										Updated At:{" "}
										{dayjs(item.updatedAt).format("DD/MM/YYYY HH:mm:ss")}
									</Text>
								</Space>
							}
						/>
					</List.Item>
				)}
				pagination={{
					pageSize: listPagination.take,
					total: listPagination.totalRecord,
					onChange: handleChangePagination,
				}}
			/>
		</MainLayout>
	);
}
