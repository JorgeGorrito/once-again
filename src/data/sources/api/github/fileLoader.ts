import { GitHubDirectoryLoaderOptions, GitHubFile } from "@/src/data/sources/api/github/types";
import { ILoader } from "@/src/domain/repositories/ILoader";
import axios, { AxiosInstance } from "axios";

export class FileLoader implements ILoader<string> {
    private axiosInstance: AxiosInstance;
    private options: Required<GitHubDirectoryLoaderOptions>;
    private file : GitHubFile;

    constructor(options: GitHubDirectoryLoaderOptions, file: GitHubFile) {
        this.file = file;
        this.options = {
            path: "",
            branch: "main",
            token: "",
            recursive: false,
            fileExtensions: [],
            ...options,
        };

        this.axiosInstance = axios.create({
            baseURL: "https://api.github.com",
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: this.options.token
                    ? `token ${this.options.token}`
                    : undefined,
            },
        });

        this.axiosInstance.interceptors.request.use((config) => {
            console.log(
                `GitHub API Request: ${config.method?.toUpperCase()} ${
                    config.url
                }`
            );
            return config;
        });

        this.axiosInstance.interceptors.response.use((response) => {
            console.log(
                `GitHub API Response: ${response.status} ${response.config.url}`
            );
            console.log("Response data:", response.data);
            return response;
        });
    }

    public async load(): Promise<string>{
        try {
            const content : string = await this.getFileContent(this.file);
            
            return content;
        } catch (error) {
            console.error("Error loading GitHub directory:", error);
            throw error;
        }
    }

    private async getFileContent(file: GitHubFile): Promise<string> {
        if (file.type !== "file") {
            throw new Error("Cannot get content of non-file item");
        }

        try {
            if (file.download_url) {
                const response = await this.axiosInstance.get(file.download_url, {
                    responseType: "text",
                    headers: {
                        Accept: "application/octet-stream",
                    },
                });
                return response.data;
            }

            const response = await this.axiosInstance.get(file.url, {
                headers: {
                    Accept: "application/vnd.github.raw+json",
                },
            });

            return response.data;
        } catch (error) {
            console.error(`Error fetching content for ${file.path}:`, error);
            throw new Error(`Failed to get content for ${file.path}`);
        }
    }
}
