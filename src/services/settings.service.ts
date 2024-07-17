import SettingsDto from "@/dto/settings/settings.dto";
import Service from "./service";
import SshKeyPairDto from "@/dto/settings/ssh-key-pair.dto";

export default class SettingsService extends Service {
	private static instance: SettingsService;
	static getInstance() {
		if (!this.instance) {
			this.instance = new SettingsService();
		}
		return this.instance;
	}

	constructor() {
		super("settings");
	}

	getSettings() {
		const apiUri = this.getApiUri("/");
		return this.get<SettingsDto>(apiUri);
	}

	generateSshKeyPair() {
		const apiUri = this.getApiUri("/generate-ssh-key-pair");
		return this.get<SshKeyPairDto>(apiUri);
	}

	updateSettings(dto: SettingsDto) {
		const apiUri = this.getApiUri("/");
		return this.put(apiUri, dto);
	}
}
