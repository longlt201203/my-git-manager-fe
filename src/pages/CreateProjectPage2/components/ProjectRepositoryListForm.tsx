import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Space, Typography } from "antd";
import ProjectRepositoryForm, {
	ProjectRepositoryFormInstance,
	useProjectRepositoryForm,
} from "./ProjectRepositoryForm";
import ProjectRepositoryRequest from "@/dto/projects/project-repository.request";
import { useState } from "react";

const { Title } = Typography;

interface ProjectRepositoryListFormProps {
	form?: ProjectRepositoryListFormInstance;
}

export default function ProjectRepositoryListForm(
	props: ProjectRepositoryListFormProps,
) {
	const [repos, setRepos] = useState<
		{
			key: number;
			form: ProjectRepositoryFormInstance;
		}[]
	>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const handleAddRepo = () => {
		const instance = useProjectRepositoryForm();
		setRepos([...repos, { key: currentIndex, form: instance }]);
		setCurrentIndex((prev) => prev + 1);
	};

	const handleRemoveRepo = (key: number) => {
		const index = repos.findIndex((item) => (item.key = key));
		repos.splice(index, 1);
		setRepos([...repos]);
	};

	if (props.form)
		props.form.submit = (cb) => {
			const returnData: ProjectRepositoryRequest[] = [];
			for (const item of repos) {
				item.form.submit((data) => {
					returnData.push(data);
				});
			}
			cb(returnData);
		};

	return (
		<Flex vertical>
			{repos.map((item, index) => (
				<Flex key={item.key} vertical>
					<Space>
						<Title level={4} style={{ marginBottom: 0 }}>
							Repository {index + 1}
						</Title>
						<Button
							icon={<DeleteOutlined style={{ color: "red" }} />}
							type="text"
							onClick={() => handleRemoveRepo(item.key)}
						></Button>
					</Space>
					<ProjectRepositoryForm form={item.form} />
				</Flex>
			))}
			<Button icon={<PlusOutlined />} onClick={handleAddRepo}>
				Add Repository
			</Button>
		</Flex>
	);
}

interface ProjectRepositoryListFormInstance {
	submit: (cb: (data: ProjectRepositoryRequest[]) => void) => void;
}

export const useProjectRepositoryListForm =
	(): ProjectRepositoryListFormInstance => {
		return {
			submit: () => {},
		};
	};
