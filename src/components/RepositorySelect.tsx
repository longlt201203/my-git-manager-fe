import GitRepoDto from "@/dto/projects/git-repo.dto";
import ProjectsService from "@/services/projects.service";
import { Select } from "antd";
import { useEffect, useState } from "react";

export interface RepositorySelectProps {
	value?: GitRepoDto | null;
	onChange?: (value: GitRepoDto) => void;
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
		setData([]);
		fetchGitRepos();
	}, [provider, credentialId]);

	const [index, setIndex] = useState<number | null>(
		value ? data.findIndex((item) => item.id === value.id) : null,
	);

	const handleChange = (value: number) => {
		setIndex(value);
		onChange && onChange(data[value]);
	};

	useEffect(() => {
		setIndex(null);
	}, [data]);

	return (
		<Select
			placeholder="Select Repository"
			options={data.map((item, index) => ({
				label: item.name,
				value: index,
			}))}
			value={index}
			onChange={handleChange}
			showSearch
			filterOption={(input, option) =>
				(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
			}
		/>
	);
}
