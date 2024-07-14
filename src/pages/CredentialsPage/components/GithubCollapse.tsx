import CredentialResponse from "@/dto/credentials/credential.response";
import GithubAuthorizeRequest from "@/dto/credentials/github-authorize.request";
import { GitProviderEnum } from "@/etc/enums";
import { TableColumnItem } from "@/etc/types";
import CredentialsService from "@/services/credentials.service";
import { DeleteOutlined, RetweetOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Divider,
	Flex,
	Form,
	Input,
	message,
	Modal,
	Space,
	Table,
	Tooltip,
	Typography,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { Text } = Typography;

export default function GithubCollapse() {
	const [messageApi, contextHolder] = message.useMessage();
	const credentialsService = CredentialsService.getInstance();
	const [credentials, setCredentials] = useState<CredentialResponse[]>([]);
	const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
		useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [deleteId, setDeleteId] = useState(0);
	const [reAuthorizeForm] = Form.useForm();
	const [isReAuthorizeModalOpen, setIsReAuthorizeModalOpen] = useState(false);
	const [reAuthorizeId, setReAuthorizeId] = useState(0);

	const fetchCredentials = async () => {
		const data = await credentialsService.getAll(GitProviderEnum.GITHUB);
		setCredentials(data);
	};

	useEffect(() => {
		fetchCredentials();
	}, []);

	const handleAuthorizeSubmit = async (data: GithubAuthorizeRequest) => {
		setIsLoading(true);
		messageApi.open({
			key: "authorizingMsg",
			type: "loading",
			content: "Authorizing with Github...",
			duration: 0,
		});
		try {
			await credentialsService.authorizeGithub(data);
			messageApi.open({
				key: "authorizingMsg",
				type: "success",
				content: "Successfully authorized using PAT!",
				duration: 1.5,
				onClick: () => {
					messageApi.destroy("authorizingMsg");
				},
			});
		} catch (err) {
			console.log(err);
			messageApi.open({
				key: "authorizingMsg",
				type: "error",
				content: "Error while authorizing Github using this token!",
				duration: 1.5,
				onClick: () => {
					messageApi.destroy("authorizingMsg");
				},
			});
		}
		setIsLoading(false);
		fetchCredentials();
	};

	const openConfirmDeleteModal = (id: number) => {
		setDeleteId(id);
		setIsConfirmDeleteModalOpen(true);
	};

	const closeDeleteConfirmModal = () => {
		setDeleteId(0);
		setIsConfirmDeleteModalOpen(false);
	};

	const handleDelete = async () => {
		setIsLoading(true);
		try {
			await credentialsService.deleteCredential({
				ids: [deleteId],
			});
		} catch (err) {
			console.log(err);
		}
		setIsLoading(false);
		closeDeleteConfirmModal();
		fetchCredentials();
	};

	const openReAuthorizeModal = (id: number) => {
		setReAuthorizeId(id);
		setIsReAuthorizeModalOpen(true);
	};

	const closeReAuthorizeModal = () => {
		setReAuthorizeId(0);
		setIsReAuthorizeModalOpen(false);
	};

	const handleReAuthorizeSubmit = async (data: GithubAuthorizeRequest) => {
		setIsLoading(true);
		messageApi.open({
			key: "reAuthorizingMsg",
			type: "loading",
			content: "Re-authorizing with Github...",
			duration: 0,
		});
		try {
			await credentialsService.reAuthorizeGithub(reAuthorizeId, data);
			messageApi.open({
				key: "reAuthorizingMsg",
				type: "success",
				content: "Successfully re-authorized using PAT!",
				duration: 1.5,
				onClick: () => {
					messageApi.destroy("reAuthorizingMsg");
				},
			});
			closeReAuthorizeModal();
			fetchCredentials();
		} catch (err) {
			console.log(err);
			messageApi.open({
				key: "reAuthorizingMsg",
				type: "error",
				content: "Error while re-authorizing Github using this token!",
				duration: 1.5,
			});
		}
		setIsLoading(false);
	};

	const accountTableColumns: TableColumnItem<CredentialResponse>[] = [
		{
			title: "",
			dataIndex: "avatar",
			key: "avatar",
			render: (url) => <Avatar src={url} />,
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Username",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "Last Update",
			dataIndex: "createdAt",
			key: "lastUpdate",
			render: (_, record) => (
				<Text>
					{record.updatedAt
						? dayjs(record.updatedAt).format("DD/MM/YYYY HH:mm:ss")
						: dayjs(record.createdAt).format("DD/MM/YYYY HH:mm:ss")}
				</Text>
			),
		},
		{
			title: "",
			key: "actions",
			render: (_, record) => {
				return (
					<Space>
						<Tooltip title="Re-authorize">
							<Button
								icon={<RetweetOutlined />}
								onClick={() => openReAuthorizeModal(record.id)}
							></Button>
						</Tooltip>
						<Tooltip title="Delete">
							<Button
								icon={<DeleteOutlined />}
								onClick={() => openConfirmDeleteModal(record.id)}
							></Button>
						</Tooltip>
					</Space>
				);
			},
		},
	];

	return (
		<>
			{contextHolder}
			<Flex vertical>
				<Form<GithubAuthorizeRequest>
					layout="vertical"
					disabled={isLoading}
					onFinish={handleAuthorizeSubmit}
				>
					<Form.Item<GithubAuthorizeRequest>
						name="pat"
						label="Personal Access Token"
						rules={[{ required: true, message: "Please input your PAT!" }]}
					>
						<Input.Password placeholder="Personal Access Token" size="large" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Authorize
						</Button>
					</Form.Item>
				</Form>
				<Divider />
				<Table<CredentialResponse>
					columns={accountTableColumns}
					dataSource={credentials}
					pagination={{ disabled: true }}
				/>
			</Flex>
			{/* Confirm Delete Modal */}
			<Modal
				title="Confirm"
				maskClosable={!isLoading}
				open={isConfirmDeleteModalOpen}
				confirmLoading={isLoading}
				cancelButtonProps={{ disabled: isLoading }}
				closable={!isLoading}
				onCancel={closeDeleteConfirmModal}
				onClose={closeDeleteConfirmModal}
				onOk={handleDelete}
			>
				<Text>Are you sure you want to delete this credential?</Text>
			</Modal>
			{/* Re-authorize Modal */}
			<Modal
				title="Re-authorize"
				maskClosable={!isLoading}
				destroyOnClose
				open={isReAuthorizeModalOpen}
				confirmLoading={isLoading}
				cancelButtonProps={{ disabled: isLoading }}
				closable={!isLoading}
				onCancel={closeReAuthorizeModal}
				onClose={closeReAuthorizeModal}
				onOk={() => reAuthorizeForm.submit()}
			>
				<Form<GithubAuthorizeRequest>
					form={reAuthorizeForm}
					layout="vertical"
					onFinish={handleReAuthorizeSubmit}
					disabled={isLoading}
				>
					<Form.Item<GithubAuthorizeRequest>
						name="pat"
						label="Personal Access Token"
						rules={[{ required: true, message: "Please input your PAT!" }]}
					>
						<Input.Password placeholder="Personal Access Token" size="large" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}
