import { ProjectRepositoryAnalysis } from "@/dto/projects/project-repository-analysis";
import Service from "./service";

export default class ProjectRepositoryService extends Service {
	private static instance: ProjectRepositoryService;
	static getInstance() {
		if (!this.instance) {
			this.instance = new ProjectRepositoryService();
		}
		return this.instance;
	}

	constructor() {
		super("project-repository");
	}

	viewRepo(id: number) {
		const apiUri = this.getApiUri("/" + id);
		return this.get<ProjectRepositoryAnalysis>(apiUri);
	}
}
