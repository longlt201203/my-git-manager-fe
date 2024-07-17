import SettingsDto from "@/dto/settings/settings.dto";
import SshKeyPairDto from "@/dto/settings/ssh-key-pair.dto";
import MainLayout from "@/layouts/MainLayout";
import SettingsService from "@/services/settings.service";
import { Button, Divider, Form, Input, message, Space, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";

const { Title } = Typography;

export default function SettingsPage() {
	const settingsService = SettingsService.getInstance();
	const [messageApi, contextHolder] = message.useMessage();
	const [sshForm] = Form.useForm();
	const [settingsForm] = Form.useForm();

	const fetchSettings = async () => {
		const settings = await settingsService.getSettings();
		sshForm.setFieldsValue(settings.sshKeyPair);
		settingsForm.setFieldsValue(settings);
	};

	const generateKeyPair = async () => {
		const data = await settingsService.generateSshKeyPair();
		sshForm.setFieldsValue(data);
	};

	const updateSettings = async (dto: SettingsDto) => {
		messageApi.open({
			key: "updating",
			type: "loading",
			content: "Updating settings...",
			duration: 0,
		});
		try {
			await settingsService.updateSettings(dto);
			messageApi.open({
				key: "updating",
				type: "success",
				content: "Updating successfully!",
				duration: 1.5,
			});
		} catch (err) {
			console.log(err);
			messageApi.open({
				key: "updating",
				type: "error",
				content: "Updating failed!",
				duration: 1.5,
			});
		}
		await fetchSettings();
	};

	useEffect(() => {
		fetchSettings();
	}, []);

	return (
		<MainLayout>
			{contextHolder}
			<Title>Settings</Title>
			<Form<SshKeyPairDto> size="large" layout="vertical" form={sshForm}>
				<Form.Item<SshKeyPairDto> label="SSH Public Key" name="publicKey">
					<TextArea
						autoSize={{ minRows: 5 }}
						readOnly
						onClick={(e) => e.currentTarget.select()}
					/>
				</Form.Item>
				<Form.Item<SshKeyPairDto> label="SSH Private Key" name="privateKey">
					<Input readOnly />
				</Form.Item>
				<Form.Item>
					<Space>
						<Button size="middle" onClick={generateKeyPair}>
							Generate SSH Key Pair
						</Button>
					</Space>
				</Form.Item>
			</Form>
			<Divider />
			<Form
				size="large"
				layout="vertical"
				form={settingsForm}
				onFinish={updateSettings}
			>
				<Form.Item<SettingsDto>
					name="localDataFolder"
					label="Local Data Folder"
					rules={[
						{
							required: true,
							message: "Please input Local Data Folder",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Space>
						<Button size="middle" type="primary" htmlType="submit">
							Save
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</MainLayout>
	);
}
