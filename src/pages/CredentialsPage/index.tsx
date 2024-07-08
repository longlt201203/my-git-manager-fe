import { CollapseItem } from "@/etc/types";
import BitBucketIcon from "@/icons/bitbucket";
import GithubIcon from "@/icons/github";
import GitLabIcon from "@/icons/gitlab";
import MainLayout from "@/layouts/MainLayout";
import GithubCollapse from "./GithubCollapse";
import { Collapse, Typography } from "antd";
const { Title, Text } = Typography;

export default function CredentialsPage() {
	const collapseItems: CollapseItem[] = [
		{
			key: "github",
			label: (
				<Text className="text-xl">
					<GithubIcon /> Github
				</Text>
			),
			children: <GithubCollapse />,
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

	return (
		<MainLayout>
			<Title>Credentials</Title>
			<Collapse size="large" items={collapseItems} destroyInactivePanel />
		</MainLayout>
	);
}
