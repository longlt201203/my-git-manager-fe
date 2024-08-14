import ProjectRepositoryPipeLine from "@/dto/projects/project-repository-pipe-line";
import ProjectRepositoryResponse from "@/dto/projects/project-repository.response";

export interface ProjectRepositoryAnalysis {
	info: ProjectRepositoryResponse;
	pipeLines: ProjectRepositoryPipeLine[];
	readme?: string;
}
