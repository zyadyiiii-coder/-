import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { AIChat } from './components/AIChat';
import { DeploymentGuide } from './components/DeploymentGuide';
import { Team } from './components/Team'; // New component
import { AdminControls } from './components/AdminControls';
import { ContentProvider, useContent } from './contexts/ContentContext';
import { Palette, Video, Music, Tent, Printer } from 'lucide-react';
import { ServiceType } from './types';

// Icon mapping
const IconMap = {
  [ServiceType.BRANDING]: Palette,
  [ServiceType.VIDEO]: Video,
  [ServiceType.MUSIC]: Music,
  [ServiceType.EVENT]: Tent,
  [ServiceType.PRINTING]: Printer,
};

function MainContent() {
    const { portfolioData, companyInfo } = useContent();
    const [activeTab, setActiveTab] = useState<ServiceType>(portfolioData[0].id);

    return (
        <div className="min-h-screen bg-[#050505] font-sans text-gray-200 selection:bg-brand-gold selection:text-black">
            <DeploymentGuide />
            <AdminControls />
            
            <Hero />

            <div id="main-content" className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative">
                
                {/* About Section */}
                <div className="mb-24 text-center max-w-3xl mx-auto">
                    <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">About Us</span>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8">公司简介</h3>
                    <div className="h-1 w-20 bg-brand-gold mx-auto mb-8"></div>
                    <p className="text-lg text-gray-400 leading-loose font-light">
                        {companyInfo.description}
                    </p>
                </div>

                {/* Team Section */}
                <Team />

                {/* Portfolio Navigation */}
                <div className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 mb-12 py-4">
                    <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-4 md:gap-8 px-2">
                        {portfolioData.map((cat) => {
                            const Icon = IconMap[cat.id];
                            const isActive = activeTab === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`group flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 whitespace-nowrap
                                        ${isActive 
                                            ? 'bg-brand-gold text-black border-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                                            : 'bg-transparent text-gray-500 border-white/10 hover:border-brand-gold/50 hover:text-brand-gold'
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span className="font-bold text-sm tracking-wider uppercase">{cat.name}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Portfolio Content */}
                {portfolioData.map((cat) => (
                    <div key={cat.id} className={activeTab === cat.id ? 'block' : 'hidden'}>
                        <Portfolio 
                            categoryId={cat.id} 
                            items={cat.items} 
                            title={cat.name}
                        />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] border-t border-white/5 py-20 px-6 mt-20">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div>
                         <h2 className="text-3xl font-serif text-white mb-2">{companyInfo.name}</h2>
                         <p className="text-brand-gold text-sm tracking-[0.2em] uppercase">{companyInfo.slogan}</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-gray-400">
                        {companyInfo.phones.map(phone => (
                            <a href={`tel:${phone}`} key={phone} className="hover:text-white transition-colors border-b border-transparent hover:border-brand-gold pb-1">
                                TEL: <span className="font-mono text-lg text-white">{phone}</span>
                            </a>
                        ))}
                    </div>

                    <div className="text-xs text-gray-600 pt-8 border-t border-white/5">
                         &copy; {new Date().getFullYear()} YIDAOJIAHUA CULTURE. All Rights Reserved.
                    </div>
                </div>
            </footer>

            <AIChat />
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