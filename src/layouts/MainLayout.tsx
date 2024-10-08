import { MenuItem } from "@/etc/types";
import {
	DashboardOutlined,
	LockOutlined,
	ProjectOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme, Typography } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider, Header, Content, Footer } = Layout;
const { Text } = Typography;

const navItems: MenuItem[] = [
	{
		label: "Dashboard",
		key: "dashboard",
		icon: <DashboardOutlined />,
	},
	{
		label: "Projects",
		key: "projects",
		icon: <ProjectOutlined />,
	},
	{
		label: "Credentials",
		key: "credentials",
		icon: <LockOutlined />,
	},
	{
		label: "Settings",
		key: "settings",
		icon: <SettingOutlined />,
	},
];

export default function MainLayout({ children }: PropsWithChildren) {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const location = useLocation();
	const [currentKeys, setCurrentKeys] = useState<MenuProps["selectedKeys"]>();
	const navigate = useNavigate();

	useEffect(() => {
		const keys = location.pathname.split("/");
		keys.shift();
		setCurrentKeys(keys);
	}, [location]);

	const onClick: MenuProps["onClick"] = (e) => {
		navigate("/" + e.key);
	};

	return (
		<Layout className="min-h-screen">
			<Sider>
				<Menu
					items={navItems}
					theme="dark"
					selectedKeys={currentKeys}
					onClick={onClick}
				/>
			</Sider>
			<Layout>
				<Header style={{ backgroundColor: colorBgContainer }}></Header>
				<Content className="my-8">
					<div
						style={{
							backgroundColor: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
						className="min-h-full mx-8 p-4"
					>
						{children}
					</div>
				</Content>
				<Footer>
					<Layout>
						<Text className="text-center">&copy; 2024 - Le Thanh Long</Text>
					</Layout>
				</Footer>
			</Layout>
		</Layout>
	);
}
