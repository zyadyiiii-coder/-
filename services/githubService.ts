// Service to handle GitHub API interactions

export interface GitHubConfig {
    token: string;
    owner: string;
    repo: string;
    path: string;
}

export const updateGitHubFile = async (config: GitHubConfig, content: string): Promise<{ success: boolean; message: string }> => {
    try {
        const apiUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}`;
        
        // 1. Get current file info (we need the SHA to update)
        const getResponse = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json',
            }
        });

        if (!getResponse.ok) {
            if (getResponse.status === 404) {
                 // File might not exist, but let's assume update flow first.
                 // If creating new file, sha is not needed. But we are updating content.ts usually.
                 return { success: false, message: '无法找到 GitHub 上的文件，请检查路径。' };
            }
            return { success: false, message: `GitHub API Error: ${getResponse.statusText}` };
        }

        const fileData = await getResponse.json();
        const sha = fileData.sha;

        // 2. Encode content to Base64 (handling UTF-8 strings)
        // Standard btoa fails on unicode, so we use this trick
        const utf8Bytes = new TextEncoder().encode(content);
        const base64Content = btoa(String.fromCharCode(...utf8Bytes));

        // 3. Put new content
        const putResponse = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Update ${config.path} via Yidao CMS`,
                content: base64Content,
                sha: sha
            })
        });

        if (putResponse.ok) {
            return { success: true, message: '成功同步到 GitHub！Vercel 将在几分钟内自动更新网站。' };
        } else {
            const errorData = await putResponse.json();
            return { success: false, message: `同步失败: ${errorData.message}` };
        }

    } catch (error: any) {
        console.error('GitHub Sync Error:', error);
        return { success: false, message: `网络错误: ${error.message}` };
    }
};