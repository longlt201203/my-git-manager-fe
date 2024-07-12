import BitBucketIcon from "@/icons/bitbucket";
import GithubIcon from "@/icons/github";
import GitlabIcon from "@/icons/gitlab";
import MainLayout from "@/layouts/MainLayout";
import { Form, Select, Space, Typography } from "antd";

const { Title } = Typography;

export default function CreateProjectPage() {
	const getIcon = (value: string) => {
		let icon = null;
		switch (value) {
			case "github":
				icon = <GithubIcon />;
				break;
			case "gitlab":
				icon = <GitlabIcon />;
				break;
			case "bitbucket":
				icon = <BitBucketIcon />;
				break;
		}
		return icon;
	};

	return (
		<MainLayout>
			<Title>Create Project</Title>
			<Form layout="vertical" size="large">
				<Form.Item label="Provider">
					<Select
						placeholder="Select Provider"
						options={[
							{
								label: "Github",
								value: "github",
							},
							{
								label: "GitLab",
								value: "gitlab",
							},
							{
								label: "BitBucket",
								value: "bitbucket",
							},
						]}
						labelRender={(props) => (
							<Space>
								{getIcon(props.value.toString())}
								{props.label}
							</Space>
						)}
						optionRender={(props) => (
							<Space>
								{props.value && getIcon(props.value.toString())}
								{props.label}
							</Space>
						)}
					/>
				</Form.Item>
				<Form.Item label="Account">
					<Select placeholder="Select Account" />
				</Form.Item>
				<Form.Item label="Project">
					<Select placeholder="Select Project" />
				</Form.Item>
			</Form>
		</MainLayout>
	);
}
