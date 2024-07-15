import GitRepoDto from "@/dto/projects/git-repo.dto";
import ProjectsService from "@/services/projects.service";
import { Select } from "antd";
import { useEffect, useState } from "react";

export interface RepositorySelectProps {
	value?: number | null;
	onChange?: (value: GitRepoDto | undefined) => void;
	onFetching?: () => void;
	onFinishFetching?: (err?: any) => void;
	provider?: string | null;
	credentialId?: number | null;
}

export default function RepositorySelect({
	value,
	provider,
	credentialId,
	onChange,
	onFetching,
	onFinishFetching,
}: RepositorySelectProps) {
	const [internalValue, setInternalValue] = useState(value);

	const [data, setData] = useState<GitRepoDto[]>([]);
	const projectsSerivce = ProjectsService.getInstance();

	const fetchGitRepos = async () => {
		if (provider && credentialId) {
			let error = undefined;
			onFetching && onFetching();
			try {
				const gitRepos = await projectsSerivce.getGitRepos(
					provider,
					credentialId,
				);
				setData(gitRepos);
			} catch (err) {
				error = err;
			}
			onFinishFetching && onFinishFetching(error);
		}
	};

	useEffect(() => {
		handleChange(undefined);
		setData([]);
		fetchGitRepos();
	}, [provider, credentialId]);

	const handleChange = (value: number | undefined) => {
		setInternalValue(value);
		const item = data.find((item) => item.id == value);
		onChange && onChange(item);
	};

	return (
		<Select
			placeholder="Select Repository"
			options={data.map((item) => ({
				label: item.name,
				value: item.id,
			}))}
			value={internalValue}
			onChange={handleChange}
			showSearch
			filterOption={(input, option) =>
				(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
			}
		/>
	);
}
