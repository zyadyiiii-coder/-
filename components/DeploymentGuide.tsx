import React, { useState } from 'react';
import { Info, X, Server, Cloud, Globe } from 'lucide-react';

export const DeploymentGuide: React.FC = () => {
    const [show, setShow] = useState(false);
    const [activeTab, setActiveTab] = useState<'vercel' | 'nginx' | 'aliyun'>('aliyun');

    if (!show) {
        return (
            <button 
                onClick={() => setShow(true)}
                className="fixed top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 text-xs flex items-center gap-1 backdrop-blur-sm animate-pulse"
            >
                <Info size={14} /> 部署上线教程
            </button>
        )
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Cloud className="text-brand-red" /> 网站部署上线指南
                    </h2>
                    <button onClick={() => setShow(false)} className="text-gray-500 hover:text-black">
                        <X size={24} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b">
                    <button 
                        onClick={() => setActiveTab('aliyun')}
                        className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'aliyun' ? 'text-brand-red border-b-2 border-brand-red bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Server size={16} /> 阿里云/腾讯云 (推荐)
                    </button>
                    <button 
                        onClick={() => setActiveTab('nginx')}
                        className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'nginx' ? 'text-brand-red border-b-2 border-brand-red bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Server size={16} /> 专业服务器 (Nginx)
                    </button>
                    <button 
                        onClick={() => setActiveTab('vercel')}
                        className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 ${activeTab === 'vercel' ? 'text-brand-red border-b-2 border-brand-red bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Globe size={16} /> 海外免费 (Vercel)
                    </button>
                </div>

                <div className="p-6 space-y-6 text-sm text-gray-700 leading-relaxed overflow-y-auto">
                    
                    {/* Common Step: Build */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2">第0步：准备文件 (通用)</h3>
                        <p className="mb-2">无论使用哪种方式，首先需要在您的电脑上生成网站文件：</p>
                        <code className="block bg-black text-white p-2 rounded mb-2">npm run build</code>
                        <p>执行完毕后，您项目目录下的 <strong className="text-red-600">dist</strong> 文件夹就是我们要上传的所有内容。</p>
                    </div>

                    {/* Tab: Aliyun (Baota) */}
                    {activeTab === 'aliyun' && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="bg-yellow-50 p-3 rounded text-yellow-800 text-xs">
                                <strong>新手推荐：</strong> 此方法适合不懂代码的用户，使用“宝塔面板”可视化管理阿里云服务器。
                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-gray-900">1. 获取阿里云服务器 (免费试用)</h3>
                                <ul className="list-disc pl-5 space-y-1 mt-1">
                                    <li>访问 <a href="https://free.aliyun.com/" target="_blank" className="text-blue-600 underline">阿里云免费试用中心</a>。</li>
                                    <li>领取 <strong>“轻量应用服务器”</strong> (建议选择 CentOS 系统)。</li>
                                    <li>如果不想备案，请购买 <strong>“中国香港”</strong> 地区的服务器；如果做正规公司官网，建议购买 <strong>“大陆地区”</strong> 并完成备案。</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-gray-900">2. 安装宝塔面板</h3>
                                <ul className="list-disc pl-5 space-y-1 mt-1">
                                    <li>登录阿里云控制台，进入服务器详情页。</li>
                                    <li>点击“远程连接” (Workbench)。</li>
                                    <li>输入以下命令安装宝塔 (CentOS)：</li>
                                    <code className="block bg-gray-100 p-2 rounded mt-1 select-all">yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec</code>
                                    <li>安装完成后，它会显示面板地址、账号和密码。保存好这些信息。</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-gray-900">3. 上传网站</h3>
                                <ul className="list-disc pl-5 space-y-1 mt-1">
                                    <li>登录宝塔面板。</li>
                                    <li>在左侧菜单点击 <strong>“网站”</strong> -> <strong>“添加站点”</strong>。</li>
                                    <li>域名填您的域名 (如果没有，填服务器IP地址)。</li>
                                    <li>创建成功后，点击根目录路径 (例如 <code>/www/wwwroot/您的IP</code>)。</li>
                                    <li>点击 <strong>“上传”</strong>，把第0步生成的 <code className="bg-gray-100 px-1">dist</code> 文件夹里的<strong>所有文件</strong> (index.html, assets等) 上传进去。</li>
                                    <li>访问您的域名/IP，网站应该已经可以打开了！</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Tab: Nginx (Manual) */}
                    {activeTab === 'nginx' && (
                        <div className="space-y-4 animate-fade-in">
                             <div>
                                <h3 className="font-bold text-lg text-gray-900">1. 服务器环境准备</h3>
                                <p>SSH 登录您的服务器，安装 Nginx：</p>
                                <code className="block bg-gray-800 text-green-400 p-3 rounded mt-2">
                                    # CentOS<br/>
                                    yum install nginx -y<br/><br/>
                                    # Ubuntu<br/>
                                    apt install nginx -y
                                </code>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-gray-900">2. 上传文件</h3>
                                <p>使用 SCP 或 FileZilla 将 <code>dist</code> 文件夹内的内容上传到 <code>/usr/share/nginx/html</code> (默认目录)。</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-gray-900">3. 配置 Nginx (解决刷新 404 问题)</h3>
                                <p>编辑配置文件 <code>/etc/nginx/nginx.conf</code> 或 <code>/etc/nginx/conf.d/default.conf</code>：</p>
                                <pre className="block bg-gray-800 text-gray-300 p-3 rounded mt-2 text-xs overflow-x-auto">
{`server {
    listen       80;
    server_name  localhost; # 修改为您的域名

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html; # 关键：支持 React 路由
    }

    # 可选：开启 Gzip 压缩加速
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 6;
    gzip_types text/plain application/javascript text/css application/xml;
}`}
                                </pre>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">4. 重启服务</h3>
                                <code className="block bg-black text-white p-2 rounded">nginx -s reload</code>
                            </div>
                        </div>
                    )}

                    {/* Tab: Vercel */}
                    {activeTab === 'vercel' && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="bg-green-50 p-3 rounded text-green-800 text-xs">
                                <strong>最简单：</strong> 永久免费，自动部署，自带 HTTPS。但国内访问速度稍慢。
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">步骤：</h3>
                                <ol className="list-decimal pl-5 space-y-2 mt-1">
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
                    )}

                </div>
            </div>
        </div>
    )
}