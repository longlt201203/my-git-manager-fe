import ProjectRepositoryRequest from "./project-repository.request";

export default interface ProjectRequest {
	name: string;
	description: string;
	mainRepo?: ProjectRepositoryRequest;
	childrenRepos: ProjectRepositoryRequest[];
}
