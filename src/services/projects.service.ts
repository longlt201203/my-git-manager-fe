import Service from "@/services/service";

export default class ProjectService extends Service {
	private static instance: ProjectService;
	static getInstance() {
		if (!this.instance) this.instance = new ProjectService();
		return this.instance;
	}

	constructor() {
		super("projects");
	}
}
