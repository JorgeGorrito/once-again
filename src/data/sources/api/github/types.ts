export interface GitHubFile {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string | null;
    type: "file" | "dir" | "symlink" | "submodule";
    content?: string;
    encoding?: string;
}

export interface GitHubResponse {
    data: GitHubFile[] | GitHubFile;
}

export interface GitHubDirectoryLoaderOptions {
    owner: string;
    repo: string;
    path?: string;
    branch?: string;
    token?: string;
    recursive?: boolean;
    fileExtensions?: string[];
}