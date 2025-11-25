import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { PlayCircle, Image as ImageIcon, Edit2, Trash2, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { EditModal } from './EditModal';
import { motion, AnimatePresence } from 'framer-motion';

interface MasonryCardProps {
    item: PortfolioItem;
    categoryId: string;
}

// Individual Card Component
const MasonryCard: React.FC<MasonryCardProps> = ({ item, categoryId }) => {
    const { isAdmin, updatePortfolioItem, deletePortfolioItem } = useContent();
    const [isEditing, setIsEditing] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [item.imageUrl, ...(item.gallery || [])].filter(Boolean);
    const hasMultipleImages = images.length > 1;

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="break-inside-avoid mb-6 relative group"
        >
            <div className="bg-brand-gray rounded-xl overflow-hidden shadow-2xl border border-white/5 hover:border-brand-gold/50 transition-all duration-300">
                {/* Image Area */}
                <div className="relative w-full overflow-hidden group/image">
                     {/* Aspect Ratio Hack or just let it flow naturally for masonry */}
                    <img 
                        src={images[currentImageIndex]} 
                        alt={item.title} 
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover/image:scale-105 filter brightness-90 group-hover/image:brightness-100" 
                    />

                    {/* Controls Overlay */}
                    {hasMultipleImages && (
                        <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/image:opacity-100 transition-opacity">
                            <button onClick={prevImage} className="bg-black/50 text-white p-1 rounded-full backdrop-blur-md hover:bg-brand-gold"><ChevronLeft size={16}/></button>
                            <button onClick={nextImage} className="bg-black/50 text-white p-1 rounded-full backdrop-blur-md hover:bg-brand-gold"><ChevronRight size={16}/></button>
                        </div>
                    )}
                    
                    {/* Tags Overlay */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                            <span key={tag} className="text-[10px] uppercase font-bold bg-black/70 text-brand-gold px-2 py-1 rounded backdrop-blur-md border border-brand-gold/20">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Multi-image Indicator */}
                    {hasMultipleImages && (
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-[10px] font-bold flex items-center gap-1">
                            <ImageIcon size={10} /> {currentImageIndex + 1}/{images.length}
                        </div>
                    )}
                </div>

                {/* Content Area */}
                <div className="p-5 relative">
                    <h3 className="text-lg font-serif font-bold text-gray-100 mb-2 leading-tight group-hover:text-brand-gold transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-3 mb-4">{item.description}</p>
                    
                    {item.videoUrl && (
                        <a 
                            href={item.videoUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold text-brand-gold hover:text-white transition-colors uppercase tracking-widest border-b border-brand-gold/30 pb-1"
                        >
                            <PlayCircle size={14} /> Watch Video
                        </a>
                    )}

                    {/* Admin Actions */}
                    {isAdmin && (
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => setIsEditing(true)} className="p-2 bg-brand-gold text-black rounded-full shadow-lg hover:bg-white"><Edit2 size={14}/></button>
                             <button onClick={() => { if(confirm('Delete?')) deletePortfolioItem(categoryId, item.id) }} className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-500"><Trash2 size={14}/></button>
                        </div>
                    )}
                </div>
            </div>

            <EditModal 
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                onSave={(data) => updatePortfolioItem(categoryId, item.id, data)}
                initialData={item}
                title="编辑作品"
                fields={[
                    { key: 'title', label: '标题', type: 'text' },
                    { key: 'description', label: '描述', type: 'textarea' },
                    { key: 'imageUrl', label: '封面图', type: 'image' },
                    { key: 'gallery', label: '画廊', type: 'gallery' },
                    { key: 'videoUrl', label: '视频链接', type: 'text' },
                    { key: 'tags', label: '标签', type: 'tags' },
                ]}
            />
        </motion.div>
    );
}

// Main Portfolio Container
export const Portfolio = ({ categoryId, items, title }: { categoryId: string, items: PortfolioItem[], title: string }) => {
    const { isAdmin, addPortfolioItem } = useContent();
    const [isAdding, setIsAdding] = useState(false);

    return (
        <section className="py-12 animate-fade-in">
             <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-white relative inline-block">
                        {title}
                        <span className="absolute -top-2 -right-2 w-2 h-2 bg-brand-gold rounded-full animate-pulse"></span>
                    </h2>
                </div>
                {isAdmin && (
                    <button 
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 bg-white/5 hover:bg-brand-gold hover:text-black text-gray-300 px-4 py-2 rounded-lg transition-all text-sm font-bold border border-white/10"
                    >
                        <Plus size={16} /> 添加作品
                    </button>
                )}
            </div>

            {/* Masonry Layout: Using Tailwind Columns */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                <AnimatePresence>
                    {items.map(item => (
                        <MasonryCard key={item.id} item={item} categoryId={categoryId} />
                    ))}
                </AnimatePresence>
            </div>
            
            {items.length === 0 && (
                <div className="text-center py-20 bg-white/5 rounded-xl border border-dashed border-white/10">
                    <p className="text-gray-500">暂无作品展示</p>
                </div>
            )}

            <EditModal 
                isOpen={isAdding}
                onClose={() => setIsAdding(false)}
                onSave={(data) => {
                    addPortfolioItem(categoryId, {
                        id: Date.now().toString(),
                        ...data,
                        imageUrl: data.imageUrl || 'https://picsum.photos/800/600',
                        tags: data.tags || []
                    });
                    setIsAdding(false);
                }}
                initialData={{ tags: [] }}
                title="新增作品"
                fields={[
                    { key: 'title', label: '标题', type: 'text' },
                    { key: 'description', label: '描述', type: 'textarea' },
                    { key: 'imageUrl', label: '封面图', type: 'image' },
                    { key: 'gallery', label: '画廊', type: 'gallery' },
                    { key: 'videoUrl', label: '视频链接', type: 'text' },
                    { key: 'tags', label: '标签', type: 'tags' },
                ]}
            />
        </section>
    );
};