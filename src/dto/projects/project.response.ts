import ProjectInfoResponse from "@/dto/projects/project-info.response";
import ProjectRepositoryResponse from "@/dto/projects/project-repository.response";

export default interface ProjectResponse extends ProjectInfoResponse {
	mainRepo?: ProjectRepositoryResponse;
	childrenRepos: ProjectRepositoryResponse[];
}
