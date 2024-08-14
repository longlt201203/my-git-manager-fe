interface ProjectRepositoryPipeLineJobStep {
	name: string;
	runCommand?: string;
	usePlugin?: string;
	variables?: any;
}

interface ProjectRepositoryPipeLineJob {
	name: string;
	steps: ProjectRepositoryPipeLineJobStep[];
}

export default interface ProjectRepositoryPipeLine {
	name: string;
	globalVariables?: any;
	jobs: ProjectRepositoryPipeLineJob[];
}
