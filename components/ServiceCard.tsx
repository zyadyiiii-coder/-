import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { PlayCircle, Image as ImageIcon, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { EditModal } from './EditModal';

interface ServiceCardProps {
  item: PortfolioItem;
  categoryId: string; // Needed for update
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ item, categoryId }) => {
  const { isAdmin, updatePortfolioItem, deletePortfolioItem } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine main image + gallery for the slideshow
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
    <>
        <div className={`bg-white rounded-xl shadow-md overflow-hidden mb-6 transform transition-all ${isAdmin ? '' : 'hover:scale-[1.02]'} relative group`}>
        
        {isAdmin && (
            <div className="absolute top-2 left-2 z-20 flex gap-2">
                <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-brand-red text-white p-2 rounded-full shadow-lg hover:bg-red-700 backdrop-blur-sm"
                    title="编辑"
                >
                    <Edit2 size={16} />
                </button>
                 <button 
                    onClick={() => {
                        if(confirm('确定删除这个项目吗？(Delete this item?)')) {
                            deletePortfolioItem(categoryId, item.id);
                        }
                    }}
                    className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-black backdrop-blur-sm"
                    title="删除"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        )}

        <div className="relative h-48 w-full overflow-hidden bg-gray-100 group">
            <img 
                src={images[currentImageIndex]} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500"
            />
            
            {/* Gallery Navigation */}
            {hasMultipleImages && (
                <>
                    <button 
                        onClick={prevImage} 
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1.5 rounded-full z-10 transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={nextImage} 
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1.5 rounded-full z-10 transition-colors opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 p-1 bg-black/20 rounded-full backdrop-blur-[2px]">
                        {images.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`w-1.5 h-1.5 rounded-full transition-all ${currentImageIndex === idx ? 'bg-white scale-125' : 'bg-white/50'}`} 
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Video Indicator (Only if not a gallery slideshow) */}
            {item.videoUrl && !hasMultipleImages && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 pointer-events-none">
                <PlayCircle size={48} className="text-white opacity-80" />
            </div>
            )}
            
            {/* Multi-image Indicator */}
            {hasMultipleImages && (
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold pointer-events-none flex items-center gap-1">
                    <ImageIcon size={12} />
                    {currentImageIndex + 1}/{images.length}
                </div>
            )}
        </div>
        
        <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-2">
                {item.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold bg-brand-red text-white px-2 py-0.5 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
            
            {item.videoUrl && (
                <a 
                    href={item.videoUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-3 block text-center w-full py-2 border border-brand-red text-brand-red rounded hover:bg-brand-red hover:text-white transition-colors text-sm font-medium"
                >
                    观看视频
                </a>
            )}
        </div>
        </div>

        <EditModal 
            isOpen={isEditing}
            onClose={() => setIsEditing(false)}
            onSave={(data) => updatePortfolioItem(categoryId, item.id, data)}
            initialData={item}
            title="编辑案例 (Edit Project)"
            fields={[
                { key: 'title', label: '标题 (Title)', type: 'text' },
                { key: 'description', label: '描述 (Description)', type: 'textarea' },
                { key: 'imageUrl', label: '封面图片 (Cover Image)', type: 'image' },
                { key: 'gallery', label: '画廊/轮播图 (Gallery)', type: 'gallery', description: '上传多张图片，卡片将自动变为轮播模式' },
                { key: 'videoUrl', label: '视频链接 (Video URL)', type: 'text', description: '选填 (Optional)' },
                { key: 'tags', label: '标签 (Tags)', type: 'tags' },
            ]}
        />
    </>
  );
};