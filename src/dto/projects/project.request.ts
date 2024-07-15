import MainProjectRepositoryRequest from "./main-project-repository.request";
import ProjectRepositoryRequest from "./project-repository.request";

export default interface ProjectRequest {
	name: string;
	description: string;
	mainRepo?: MainProjectRepositoryRequest;
	childrenRepos: ProjectRepositoryRequest[];
}
