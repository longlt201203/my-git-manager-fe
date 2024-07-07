import GithubAuthorizeRequest from "@/dto/github-authorize.request";
import GithubCredentialResponse from "@/dto/github-credential.response";
import { CollapseItem, TableColumnItem } from "@/etc/types";
import BitBucketIcon from "@/icons/bitbucket";
import GithubIcon from "@/icons/github";
import GitLabIcon from "@/icons/gitlab";
import MainLayout from "@/layouts/MainLayout";
import GithubCredentialsService from "@/services/github-credentials.service";
import { DeleteOutlined, RetweetOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Collapse,
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

const { Title, Text } = Typography;

function GithubCollapse({ data }: { data: GithubCredentialResponse[] }) {
  const [messageApi, contextHolder] = message.useMessage();
  const githubCredentialsService = GithubCredentialsService.getInstance();
  const [credentials, setCredentials] =
    useState<GithubCredentialResponse[]>(data);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [reAuthorizeForm] = Form.useForm();
  const [isReAuthorizeModalOpen, setIsReAuthorizeModalOpen] = useState(false);
  const [reAuthorizeId, setReAuthorizeId] = useState(0);

  useEffect(() => {
    setCredentials(data);
  }, [data]);

  const handleAuthorizeSubmit = async (data: GithubAuthorizeRequest) => {
    setIsLoading(true);
    messageApi.open({
      key: "authorizingMsg",
      type: "loading",
      content: "Authorizing with Github...",
      duration: 0,
    });
    try {
      await githubCredentialsService.authorize(data);
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

  const fetchCredentials = async () => {
    const data = await githubCredentialsService.getAll();
    setCredentials(data);
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
      await githubCredentialsService.deleteCredential({
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
      await githubCredentialsService.reAuthorize(reAuthorizeId, data);
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

  const accountTableColumns: TableColumnItem<GithubCredentialResponse>[] = [
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
        <Table<GithubCredentialResponse>
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

export default function CredentialsPage() {
  const githubCredentialsService = GithubCredentialsService.getInstance();
  const [githubCredentials, setGithubCredentials] = useState<
    GithubCredentialResponse[]
  >([]);

  const collapseItems: CollapseItem[] = [
    {
      key: "github",
      label: (
        <Text className="text-xl">
          <GithubIcon /> Github
        </Text>
      ),
      children: <GithubCollapse data={githubCredentials} />,
    },
    {
      key: "gitlab",
      label: (
        <Text className="text-xl">
          <GitLabIcon /> GitLab
        </Text>
      ),
      children: <></>,
    },
    {
      key: "bitbucket",
      label: (
        <Text className="text-xl">
          <BitBucketIcon /> BitBucket
        </Text>
      ),
      children: <></>,
    },
  ];

  const onCollapseChange = (key: string | string[]) => {
    if (Array.isArray(key)) {
      if (key.includes("github")) {
        githubCredentialsService.getAll().then((data) => {
          setGithubCredentials(data);
        });
      }
      if (key.includes("gitlab")) {
      }
      if (key.includes("bitbucket")) {
      }
    }
  };

  return (
    <MainLayout>
      <Title>Credentials</Title>
      <Collapse
        size="large"
        items={collapseItems}
        onChange={onCollapseChange}
      />
    </MainLayout>
  );
}
