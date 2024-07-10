import SshKeyPairDto from "@/dto/settings/ssh-key-pair.dto";
import MainLayout from "@/layouts/MainLayout";
import SettingsService from "@/services/settings.service";
import { Button, Form, Input, Space, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

const { Title } = Typography;

export default function SettingsPage() {
	const settingsService = SettingsService.getInstance();
	const [sshForm] = Form.useForm();

	const fetchSettings = async () => {
		const settings = await settingsService.getSettings();
		sshForm.setFieldsValue(settings?.sshKeyPair);
	};

	const generateKeyPair = async () => {
		const data = await settingsService.generateSshKeyPair();
		sshForm.setFieldsValue(data);
	};

	useEffect(() => {
		fetchSettings();
	}, []);

	return (
		<MainLayout>
			<Title>Settings</Title>
			<Form<SshKeyPairDto> size="large" layout="vertical" form={sshForm}>
				<Form.Item<SshKeyPairDto> label="SSH Public Key" name="publicKey">
					<TextArea autoSize={{ minRows: 5 }} disabled />
				</Form.Item>
				<Form.Item<SshKeyPairDto> label="SSH Private Key" name="privateKey">
					<Input disabled />
				</Form.Item>
				<Form.Item>
					<Space>
						<Button size="middle" onClick={generateKeyPair}>
							Generate SSH Key Pair
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</MainLayout>
	);
}
