import Markdown from "react-markdown";

interface ReadmeTabProps {
	content?: string;
}

export default function ReadmeTab(props: ReadmeTabProps) {
	return <Markdown remarkPlugins={[]}>{props.content}</Markdown>;
}
