import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

export const DeploymentGuide: React.FC = () => {
    const [show, setShow] = useState(false);

    if (!show) {
        return (
            <button 
                onClick={() => setShow(true)}
                className="fixed top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 text-xs flex items-center gap-1 backdrop-blur-sm"
            >
                <Info size={14} /> 部署教程
            </button>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
                <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-gray-500">
                    <X size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4 text-brand-red">如何免费部署此网站</h2>
                <div className="space-y-4 text-sm text-gray-700">
                    <div>
                        <h3 className="font-bold text-gray-900">第一步：修改内容</h3>
                        <p>打开 <code>content.ts</code> 文件，替换 <code>COMPANY_INFO</code> 和 <code>PORTFOLIO_DATA</code> 中的文字和图片链接为您自己的内容。</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">第二步：导出代码</h3>
                        <p>将这些文件下载到您的电脑。</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">第三步：使用 Vercel 或 Netlify (推荐)</h3>
                        <ol className="list-decimal pl-5 space-y-1 mt-1">
                            <li>将代码上传到 <strong>GitHub</strong> 仓库。</li>
                            <li>注册/登录 <a href="https://vercel.com" target="_blank" className="text-blue-600 underline">Vercel.com</a>。</li>
                            <li>点击 "Add New Project"，导入您的 GitHub 仓库。</li>
                            <li>Vercel 会自动识别 React 项目。点击 "Deploy"。</li>
                            <li>等待几秒，您就获得了一个免费的 https 域名！</li>
                        </ol>
                    </div>
                     <div>
                        <h3 className="font-bold text-gray-900">关于 Gemini API</h3>
                        <p>为了让智能助手在部署后工作，您需要在 Vercel 的项目设置中添加环境变量 <code>API_KEY</code>，填入您的 Google Gemini API Key。</p>
                    </div>
                </div>
            </div>
        </div>
    )
}