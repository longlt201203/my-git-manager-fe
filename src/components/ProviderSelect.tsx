import BitBucketIcon from "@/icons/bitbucket";
import GithubIcon from "@/icons/github";
import GitlabIcon from "@/icons/gitlab";
import { Select, Space } from "antd";

export interface ProviderSelectProps {
	value?: string | null;
	onChange?: (value: string) => void;
	disabled?: boolean;
}

export default function ProviderSelect({
	value,
	onChange,
	disabled,
}: ProviderSelectProps) {
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
		<Select
			value={value}
			onChange={onChange}
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
			disabled={disabled}
		/>
	);
}
