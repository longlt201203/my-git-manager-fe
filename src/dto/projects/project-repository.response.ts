import CredentialResponse from "@/dto/credentials/credential.response";

export default interface ProjectRepositoryResponse {
	id: number;
	name: string;
	url: string;
	credential: CredentialResponse;
	type: string;
	localPath: string;
	htmlUrl?: string;
}
