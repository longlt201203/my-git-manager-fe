import GitRepoDto from "@/dto/projects/git-repo.dto";
import ProjectInfoResponse from "@/dto/projects/project-info.response";
import ProjectQuery from "@/dto/projects/project.query";
import ProjectRequest from "@/dto/projects/project.request";
import ProjectResponse from "@/dto/projects/project.response";
import Service from "@/services/service";

export default class ProjectsService extends Service {
	private static instance: ProjectsService;
	static getInstance() {
		if (!this.instance) this.instance = new ProjectsService();
		return this.instance;
	}

	constructor() {
		super("projects");
	}

	getGitRepos(provider: string, credentialId: number) {
		const apiUri = this.getApiUri(`/${provider}/repos`, { credentialId });
		return this.get<GitRepoDto[]>(apiUri.toString());
	}

	create(dto: ProjectRequest) {
		const apiUri = this.getApiUri("/");
		return this.post(apiUri.toString(), dto);
	}

	getMany(query: ProjectQuery) {
		const apiUri = this.getApiUri("/", query);
		return this.getWithPagination<ProjectInfoResponse[]>(apiUri.toString());
	}

	getOne(id: number) {
		const apiUri = this.getApiUri("/" + id);
		return this.get<ProjectResponse>(apiUri.toString());
	}
}
