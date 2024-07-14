import MainLayout from "@/layouts/MainLayout";
import { useEffect } from "react";
import { Button, List, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function ProjectsPage() {
	useEffect(() => {}, []);

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
			{/* <List renderItem={(item, index) => (
				<List.Item>
					<List.Item.Meta title={} />
				</List.Item>
			)} /> */}
		</MainLayout>
	);
}
