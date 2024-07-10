import MainLayout from "@/layouts/MainLayout";
import { useEffect } from "react";
import { List, Typography } from "antd";

const { Title } = Typography;

export default function ProjectsPage() {
	useEffect(() => {}, []);

	return (
		<MainLayout>
			<Title>Projects</Title>
			{/* <List renderItem={(item, index) => (
				<List.Item>
					<List.Item.Meta title={} />
				</List.Item>
			)} /> */}
		</MainLayout>
	);
}
