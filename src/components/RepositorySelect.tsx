import GitRepoDto from "@/dto/projects/git-repo.dto";
import { Select } from "antd";
import { useEffect, useState } from "react";

export interface RepositorySelectProps {
	value?: GitRepoDto | null;
	onChange?: (value: GitRepoDto) => void;
	data: GitRepoDto[];
}

export default function RepositorySelect({
	data,
	value,
	onChange,
}: RepositorySelectProps) {
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
