import GithubCredentialResponse from "@/dto/credentials/github-credential.response";
import Service from "./service";
import DeleteGithubCredentialRequest from "@/dto/credentials/delete-github-credential.request";
import GithubAuthorizeRequest from "@/dto/credentials/github-authorize.request";
import { GitProviderEnum } from "@/etc/enums";

export default class CredentialsService extends Service {
	private static instance: CredentialsService;
	static getInstance() {
		if (!this.instance) {
			this.instance = new CredentialsService();
		}
		return this.instance;
	}

	constructor() {
		super("credentials");
	}

	getAll(provider: GitProviderEnum) {
		const apiUri = this.getApiUri("/");
		return this.get<GithubCredentialResponse[]>(apiUri.toString());
	}

	deleteCredential(dto: DeleteGithubCredentialRequest) {
		const apiUri = this.getApiUri("/delete");
		return this.post(apiUri.toString(), dto);
	}

	authorize(dto: GithubAuthorizeRequest) {
		const apiUri = this.getApiUri("/authorize");
		return this.post(apiUri.toString(), dto);
	}

	reAuthorize(id: number, dto: GithubAuthorizeRequest) {
		const apiUri = this.getApiUri("/re-authorize/" + id);
		return this.post(apiUri.toString(), dto);
	}
}
