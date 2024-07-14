import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Space, Typography } from "antd";
import ProjectRepositoryForm from "./ProjectRepositoryForm";

const { Title } = Typography;

interface ProjectRepositoryListFormProps {
	onSubmit?: () => void;
	form: ProjectRepositoryListFormForm;
}

export default function ProjectRepositoryListForm(
	props: ProjectRepositoryListFormProps,
) {
	props.form.submit = () => {
		props.onSubmit && props.onSubmit();
	};

	return (
		<Flex vertical>
			<Flex vertical>
				<Space>
					<Title level={4} style={{ marginBottom: 0 }}>
						Repository 1
					</Title>
					<Button
						icon={<DeleteOutlined style={{ color: "red" }} />}
						type="text"
					></Button>
				</Space>
				<ProjectRepositoryForm />
			</Flex>
			<Button icon={<PlusOutlined />}>Add Repository</Button>
		</Flex>
	);
}

interface ProjectRepositoryListFormForm {
	submit: () => void;
}

export const useProjectRepositoryListFormForm =
	(): ProjectRepositoryListFormForm => {
		return {
			submit: () => {},
		};
	};
