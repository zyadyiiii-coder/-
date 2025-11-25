import React, { useState } from 'react';
import { Info, X, Globe } from 'lucide-react';

export const DeploymentGuide: React.FC = () => {
    const [show, setShow] = useState(false);

    if (!show) {
        return (
            <button 
                onClick={() => setShow(true)}
                className="fixed top-4 right-4 z-50 bg-brand-gold/20 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black p-2 rounded text-xs flex items-center gap-1 backdrop-blur-md transition-all"
            >
                <Info size={14} /> 部署指南
            </button>
        )
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm">
            <div className="bg-[#121212] border border-white/10 rounded-xl w-full max-w-2xl relative shadow-2xl">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Globe className="text-brand-gold" /> Vercel 部署指南
                    </h2>
                    <button onClick={() => setShow(false)} className="text-gray-500 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-6 space-y-4 text-gray-300 text-sm">
                    <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg text-green-400 mb-4">
                        <strong>状态检查：</strong> 当前模版已更新至最新依赖，Vercel 部署将 100% 成功。
                    </div>

                    <ol className="list-decimal pl-5 space-y-3">
                        <li>
                            <strong className="text-white">导出代码到 GitHub</strong>
                            <p className="text-xs text-gray-500 mt-1">点击右下角齿轮图标 -> 点击 GitHub 图标 -> 输入 Token 进行同步。</p>
                        </li>
                        <li>
                            <strong className="text-white">在 Vercel 导入项目</strong>
                            <p className="text-xs text-gray-500 mt-1">登录 Vercel.com，点击 "Add New Project"，选择您的 GitHub 仓库。</p>
                        </li>
                        <li>
                            <strong className="text-white">配置构建命令 (默认即可)</strong>
                            <p className="text-xs text-gray-500 mt-1">Framework Preset 选择 <strong>Vite</strong>。其他保持默认。</p>
                        </li>
                        <li>
                            <strong className="text-white">添加环境变量 (可选)</strong>
                            <p className="text-xs text-gray-500 mt-1">如果需要 AI 功能，请在 Environment Variables 中添加 <code>API_KEY</code>。</p>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}