import React, { useState, useEffect } from 'react';
import { X, Github, Save, Loader2 } from 'lucide-react';
import { updateGitHubFile } from '../services/githubService';
import { useContent } from '../contexts/ContentContext';

interface GitHubSyncModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({ isOpen, onClose }) => {
    const { generateConfigFile } = useContent();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });
    
    // Form state
    const [token, setToken] = useState('');
    const [owner, setOwner] = useState('');
    const [repo, setRepo] = useState('');
    const [path, setPath] = useState('src/content.ts'); // Default based on project structure

    // Load saved config on open
    useEffect(() => {
        if (isOpen) {
            setToken(localStorage.getItem('gh_token') || '');
            setOwner(localStorage.getItem('gh_owner') || '');
            setRepo(localStorage.getItem('gh_repo') || '');
            setPath(localStorage.getItem('gh_path') || 'content.ts');
        }
    }, [isOpen]);

    const handleSync = async () => {
        if (!token || !owner || !repo || !path) {
            setStatus({ type: 'error', msg: '请填写所有字段' });
            return;
        }

        setLoading(true);
        setStatus({ type: null, msg: '' });

        // Save config for next time
        localStorage.setItem('gh_token', token);
        localStorage.setItem('gh_owner', owner);
        localStorage.setItem('gh_repo', repo);
        localStorage.setItem('gh_path', path);

        const content = generateConfigFile();
        const result = await updateGitHubFile({ token, owner, repo, path }, content);

        setLoading(false);
        if (result.success) {
            setStatus({ type: 'success', msg: result.message });
            setTimeout(onClose, 2000);
        } else {
            setStatus({ type: 'error', msg: result.message });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 animate-fade-in">
            <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 font-bold">
                        <Github size={20} />
                        同步到 GitHub
                    </div>
                    <button onClick={onClose}><X size={20} /></button>
                </div>

                <div className="p-6 space-y-4">
                    <p className="text-sm text-gray-500 bg-gray-100 p-3 rounded">
                        此功能将直接把当前的修改推送到您的 GitHub 仓库文件 (content.ts)，从而触发 Vercel 自动部署。
                    </p>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">GitHub Token (需勾选 repo 权限)</label>
                        <input 
                            type="password" 
                            value={token}
                            onChange={e => setToken(e.target.value)}
                            placeholder="ghp_xxxxxxxxxxxx"
                            className="w-full border rounded p-2 text-sm"
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-700 mb-1">用户名 (Owner)</label>
                            <input 
                                type="text" 
                                value={owner}
                                onChange={e => setOwner(e.target.value)}
                                placeholder="username"
                                className="w-full border rounded p-2 text-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-700 mb-1">仓库名 (Repo)</label>
                            <input 
                                type="text" 
                                value={repo}
                                onChange={e => setRepo(e.target.value)}
                                placeholder="repo-name"
                                className="w-full border rounded p-2 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">文件路径 (Path in repo)</label>
                        <input 
                            type="text" 
                            value={path}
                            onChange={e => setPath(e.target.value)}
                            placeholder="content.ts"
                            className="w-full border rounded p-2 text-sm"
                        />
                    </div>

                    {status.msg && (
                        <div className={`p-3 rounded text-sm ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {status.msg}
                        </div>
                    )}

                    <button 
                        onClick={handleSync}
                        disabled={loading}
                        className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-black transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {loading ? '同步中...' : '立即同步 (Sync Now)'}
                    </button>
                </div>
            </div>
        </div>
    );
};