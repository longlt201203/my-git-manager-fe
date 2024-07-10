export default interface ProjectResponse {
	id: number;
	name: string;
	description: string;
	gitName: string;
	url: string;
	credentialId: number;
	provider: string;
	createdAt: Date;
	updatedAt: Date;
}
