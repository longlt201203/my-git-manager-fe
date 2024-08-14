import { ProjectRepositoryAnalysis } from "@/dto/projects/project-repository-analysis";
import MainLayout from "@/layouts/MainLayout";
import ReadmeTab from "@/pages/RepositoryDetailPage/ReadmeTab";
import ProjectRepositoryService from "@/services/project-repositoriy.service";
import { Tabs, TabsProps, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const { Title } = Typography;

export default function RepositoryDetailPage() {
	const { repoId } = useParams();
	const [repo, setRepo] = useState<ProjectRepositoryAnalysis>();
	const projectRepositoryService = ProjectRepositoryService.getInstance();
	const [tabs, setTabs] = useState<TabsProps["items"]>([]);

	const fetchRepo = async () => {
		try {
			if (repoId && parseInt(repoId)) {
				const data = await projectRepositoryService.viewRepo(parseInt(repoId));
				setRepo(data);
			} else {
				// 404
			}
		} catch (err) {
			// 404
		}
	};

	useEffect(() => {
		fetchRepo();
	}, [repoId]);

	useEffect(() => {
		if (repo) {
			setTabs([
				{
					key: "readme",
					label: "README",
					children: <ReadmeTab content="# HIT!@EUIDHSAUIHUD" />,
				},
				{
					key: "folder",
					label: "Folder Structure",
					children: <>Folder Structure</>,
				},
				{
					key: "docker",
					label: "Docker",
					children: <>Docker</>,
				},
				{
					key: "pipelines",
					label: "Pipelines",
					children: <>Pipelines</>,
				},
			]);
		}
	}, [repo]);

	return (
		<MainLayout>
			<Title>{repo?.info.name}</Title>
			<Tabs items={tabs}></Tabs>
		</MainLayout>
	);
}
