import GitRepoDto from "@/dto/projects/git-repo.dto";
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
}
