import { Flex, List, Typography } from "antd";

const { Title } = Typography;

export default function RepositoryView() {
	return (
		<Flex>
			<Flex vertical className="w-1/2">
				<Title level={3}>Environments</Title>
				<List />
				<Title level={3}>Docker</Title>
				<List />
				<Title level={3}>LICENSE</Title>
			</Flex>
			<div className="w-1/2"></div>
		</Flex>
	);
}
