import { GitProviderEnum } from "@/etc/enums";

export default interface ProjectRequest {
	name: string;
	description: string;
	gitName: string;
	url: string;
	credentialId: number;
	provider: GitProviderEnum;
}
