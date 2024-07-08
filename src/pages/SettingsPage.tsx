import MainLayout from "@/layouts/MainLayout";
import { Button, Form, Input, Space, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;

export default function SettingsPage() {
	return (
		<MainLayout>
			<Title>Settings</Title>
			<Form size="large" layout="vertical">
				<Form.Item label="SSH Public Key">
					<TextArea autoSize={{ minRows: 5 }} disabled />
				</Form.Item>
				<Form.Item label="SSH Private Key">
					<Input disabled />
				</Form.Item>
				<Form.Item>
					<Space>
						{/* <Button size="middle" type="primary">
							Save
						</Button> */}
						<Button size="middle">Generate SSH Key Pair</Button>
					</Space>
				</Form.Item>
			</Form>
		</MainLayout>
	);
}
