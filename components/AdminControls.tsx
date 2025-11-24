import React, { useState } from 'react';
import { Settings, Download, RotateCcw, X, Copy, Check, Github } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { GitHubSyncModal } from './GitHubSyncModal';

export const AdminControls: React.FC = () => {
  const { isAdmin, toggleAdmin, generateConfigFile, resetToDefault } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showGitHubSync, setShowGitHubSync] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExport = () => {
    setShowExport(true);
    setIsOpen(false);
  };

  const handleGitHubSync = () => {
      setShowGitHubSync(true);
      setIsOpen(false);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateConfigFile());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Gear Button */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
        {isOpen && (
            <div className="flex flex-col gap-2 mb-2 animate-fade-in-up">
                 <button 
                    onClick={resetToDefault}
                    className="bg-gray-800 text-white p-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold hover:bg-gray-900"
                    title="重置"
                >
                    <RotateCcw size={18} />
                </button>
                <button 
                    onClick={handleGitHubSync}
                    className="bg-gray-900 text-white p-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold hover:bg-black"
                    title="同步到 GitHub"
                >
                    <Github size={18} />
                </button>
                <button 
                    onClick={handleExport}
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold hover:bg-blue-700"
                    title="导出配置"
                >
                    <Download size={18} />
                </button>
                 <button 
                    onClick={toggleAdmin}
                    className={`${isAdmin ? 'bg-green-600' : 'bg-gray-600'} text-white p-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold`}
                    title={isAdmin ? "关闭编辑" : "开启编辑"}
                >
                    <span className="whitespace-nowrap">{isAdmin ? "完成" : "编辑"}</span>
                </button>
            </div>
        )}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-4 rounded-full shadow-xl transition-all ${isOpen ? 'bg-gray-200 text-gray-800 rotate-45' : 'bg-white text-gray-800'}`}
        >
             {isOpen ? <X size={24} /> : <Settings size={24} />}
        </button>
      </div>

      {/* GitHub Sync Modal */}
      <GitHubSyncModal isOpen={showGitHubSync} onClose={() => setShowGitHubSync(false)} />

      {/* Export Modal */}
      {showExport && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold text-lg">导出配置代码 (Export Config)</h3>
                    <button onClick={() => setShowExport(false)}><X size={24} /></button>
                </div>
                <div className="p-4 bg-yellow-50 text-yellow-800 text-sm border-b border-yellow-100">
                    <strong>如何保存修改？</strong>
                    <br />
                    1. 点击下方的“复制”按钮。
                    <br />
                    2. 打开项目中的 <code>content.ts</code> 文件。
                    <br />
                    3. 全选并粘贴覆盖原有内容。
                </div>
                <div className="flex-1 overflow-auto p-4 bg-gray-900 text-gray-100 font-mono text-xs">
                    <pre>{generateConfigFile()}</pre>
                </div>
                <div className="p-4 border-t flex justify-end">
                    <button 
                        onClick={handleCopy}
                        className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors ${copied ? 'bg-green-500 text-white' : 'bg-brand-red text-white'}`}
                    >
                        {copied ? <><Check size={18}/> 已复制</> : <><Copy size={18}/> 复制代码</>}
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};