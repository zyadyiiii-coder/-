import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { ServiceCard } from './components/ServiceCard';
import { AIChat } from './components/AIChat';
import { DeploymentGuide } from './components/DeploymentGuide';
import { TeamSection } from './components/TeamSection';
import { AdminControls } from './components/AdminControls';
import { ContentProvider, useContent } from './contexts/ContentContext';
import { Phone, MapPin, Palette, Video, Music, Tent, Printer, Plus } from 'lucide-react';
import { ServiceType } from './types';
import { EditModal } from './components/EditModal';

// Icon mapping
const IconMap = {
  [ServiceType.BRANDING]: Palette,
  [ServiceType.VIDEO]: Video,
  [ServiceType.MUSIC]: Music,
  [ServiceType.EVENT]: Tent,
  [ServiceType.PRINTING]: Printer,
};

function MainContent() {
    const { portfolioData, companyInfo, isAdmin, addPortfolioItem } = useContent();
    const [activeTab, setActiveTab] = useState<ServiceType>(portfolioData[0].id);
    const [addingCategory, setAddingCategory] = useState<string | null>(null);

    const handleAddItem = (data: any) => {
        if (addingCategory) {
            addPortfolioItem(addingCategory, {
                id: Date.now().toString(),
                ...data,
                imageUrl: data.imageUrl || 'https://picsum.photos/800/600', // Default placeholder
                tags: data.tags || []
            });
            setAddingCategory(null);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-20">
        <DeploymentGuide />
        <AdminControls />
        
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Main Content Area */}
        <div id="portfolio-content" className="max-w-md mx-auto md:max-w-2xl lg:max-w-4xl pt-10 px-4">
            
            {/* Intro Text */}
            <div className="mb-10 text-center animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">关于我们</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base px-2 mb-6 whitespace-pre-line">
                    {companyInfo.description}
                </p>
            </div>

            {/* Team Section */}
            <TeamSection />

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-30 bg-gray-50 pt-2 pb-4 border-t border-gray-100 mt-8">
                <div className="flex overflow-x-auto no-scrollbar space-x-4 py-2 px-2">
                    {portfolioData.map((cat) => {
                        const Icon = IconMap[cat.id];
                        const isActive = activeTab === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`flex flex-col items-center min-w-[4.5rem] transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-60 scale-95'}`}
                            >
                                <div className={`p-3 rounded-2xl mb-2 shadow-sm ${isActive ? 'bg-brand-red text-white shadow-brand-red/40' : 'bg-white text-gray-500'}`}>
                                    <Icon size={24} />
                                </div>
                                <span className={`text-xs font-bold ${isActive ? 'text-brand-red' : 'text-gray-500'}`}>
                                    {cat.name}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Content Grid */}
            <div className="min-h-[500px]">
                {portfolioData.map((cat) => (
                    <div key={cat.id} className={`${activeTab === cat.id ? 'block' : 'hidden'} animate-fade-in`}>
                        <div className="flex items-center justify-between mb-6 mt-2 px-1">
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-1 bg-brand-red rounded-full"></div>
                                <h2 className="text-xl font-bold text-gray-800">{cat.name}案例展示</h2>
                            </div>
                            {isAdmin && (
                                <span className="text-xs text-brand-red animate-pulse">
                                    编辑模式: 可添加或删除案例
                                </span>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Add New Item Card (Visible only in Admin Mode) */}
                            {isAdmin && (
                                <button 
                                    onClick={() => setAddingCategory(cat.id)}
                                    className="bg-gray-50 rounded-xl shadow-sm border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-100 hover:border-brand-red transition-colors group h-64 md:h-80"
                                >
                                    <div className="bg-white p-4 rounded-full shadow-sm group-hover:scale-110 transition-transform mb-3">
                                        <Plus size={32} className="text-brand-red" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-500 group-hover:text-brand-red">添加新案例 (Add Case)</span>
                                </button>
                            )}

                            {/* Existing Items */}
                            {cat.items.map(item => (
                                <ServiceCard key={item.id} item={item} categoryId={cat.id} />
                            ))}
                        </div>

                        {cat.items.length === 0 && !isAdmin && (
                            <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                                暂无案例展示 (No items yet)
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* 3. Footer / Contact */}
        <footer className="bg-brand-dark text-white mt-20 py-10 px-6">
            <div className="max-w-md mx-auto text-center">
                <h2 className="text-2xl font-bold mb-6">联系我们</h2>
                
                <div className="space-y-4 mb-8">
                    {companyInfo.phones.map(phone => (
                        <a href={`tel:${phone}`} key={phone} className="flex items-center justify-center gap-3 bg-white/10 p-4 rounded-lg hover:bg-brand-red transition-colors">
                            <Phone size={20} />
                            <span className="text-lg font-mono">{phone}</span>
                        </a>
                    ))}
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-8">
                    <MapPin size={16} />
                    <span>{companyInfo.locations[0]}</span>
                </div>

                <div className="border-t border-white/10 pt-6">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} {companyInfo.name} 版权所有
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                        {companyInfo.slogan}
                    </p>
                </div>
            </div>
        </footer>

        {/* AI Assistant */}
        <AIChat />

        {/* Add Item Modal */}
        <EditModal 
            isOpen={!!addingCategory}
            onClose={() => setAddingCategory(null)}
            onSave={handleAddItem}
            initialData={{ tags: [] }}
            title="添加新案例 (Add New Project)"
            fields={[
                { key: 'title', label: '标题 (Title)', type: 'text' },
                { key: 'description', label: '描述 (Description)', type: 'textarea' },
                { key: 'imageUrl', label: '封面图片 (Image)', type: 'image' },
                { key: 'videoUrl', label: '视频链接 (Video URL)', type: 'text', description: '选填 (Optional)' },
                { key: 'tags', label: '标签 (Tags)', type: 'tags' },
            ]}
        />
        </div>
    );
}

function App() {
  return (
    <ContentProvider>
      <MainContent />
    </ContentProvider>
  );
}

export default App;