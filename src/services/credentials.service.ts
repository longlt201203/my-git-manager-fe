import Service from "./service";
import GithubAuthorizeRequest from "@/dto/credentials/github-authorize.request";
import DeleteCredentialRequest from "@/dto/credentials/delete-credential.request";
import CredentialResponse from "@/dto/credentials/credential.response";

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

	getAll(provider: string) {
		const apiUri = this.getApiUri("/" + provider);
		return this.get<CredentialResponse[]>(apiUri.toString());
	}

	deleteCredential(dto: DeleteCredentialRequest) {
		const apiUri = this.getApiUri("/delete");
		return this.post(apiUri.toString(), dto);
	}

	authorizeGithub(dto: GithubAuthorizeRequest) {
		const apiUri = this.getApiUri("/github/authorize");
		return this.post(apiUri.toString(), dto);
	}

	reAuthorizeGithub(id: number, dto: GithubAuthorizeRequest) {
		const apiUri = this.getApiUri("/github/re-authorize/" + id);
		return this.post(apiUri.toString(), dto);
	}
}
