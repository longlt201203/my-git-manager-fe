import ApiResponseDto from "@/dto/api-response.dto";
import PaginationDto from "@/dto/pagination.dto";
import axios, { AxiosRequestConfig } from "axios";

export default class Service {
	constructor(protected readonly basePath: string) {}

	getApiUri(path: string, query?: any) {
		const url = "/api/" + this.basePath + path;
		const searchParams = new URLSearchParams();
		if (query) {
			for (const key in query) {
				if (Array.isArray(query[key])) {
					for (const item of query[key]) {
						searchParams.append(key, item);
					}
				} else {
					searchParams.set(key, query[key]);
				}
			}
		}
		return `${url}?${searchParams.toString()}`;
	}

	async get<T>(uri: string, config?: AxiosRequestConfig) {
		const accessToken = localStorage.getItem("accessToken");
		if (!config) config = {};
		if (accessToken)
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${accessToken}`,
			};
		const response = await axios.get<ApiResponseDto<T>>(uri, config);
		return response.data.data;
	}

	async getWithPagination<T>(
		uri: string,
		config?: AxiosRequestConfig,
	): Promise<[T, PaginationDto]> {
		const accessToken = localStorage.getItem("accessToken");
		if (!config) config = {};
		if (accessToken)
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${accessToken}`,
			};
		const response = await axios.get<ApiResponseDto<T>>(uri, config);

		return [
			response.data.data,
			response.data.pagination || {
				page: 1,
				take: 10,
				totalPage: 1,
				totalRecord: 0,
			},
		];
	}

	async delete<T>(uri: string, config?: AxiosRequestConfig) {
		const accessToken = localStorage.getItem("accessToken");
		if (!config) config = {};
		if (accessToken)
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${accessToken}`,
			};
		const response = await axios.delete<ApiResponseDto<T>>(uri, config);
		return response.data.data;
	}

	async post<T>(uri: string, data: any, config?: AxiosRequestConfig) {
		const accessToken = localStorage.getItem("accessToken");
		if (!config) config = {};
		if (accessToken)
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${accessToken}`,
			};
		const response = await axios.post<ApiResponseDto<T>>(uri, data, config);
		return response.data.data;
	}

	async put<T>(uri: string, data: any, config?: AxiosRequestConfig) {
		const accessToken = localStorage.getItem("accessToken");
		if (!config) config = {};
		if (accessToken)
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${accessToken}`,
			};
		const response = await axios.put<ApiResponseDto<T>>(uri, data, config);
		return response.data.data;
	}
}
