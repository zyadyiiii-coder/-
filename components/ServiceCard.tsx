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

  // Combine main image + gallery
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
                    className="bg-brand-red text-white p-2 rounded-full shadow-lg hover:bg-red-700"
                >
                    <Edit2 size={16} />
                </button>
                 <button 
                    onClick={() => {
                        if(confirm('确定删除这个项目吗？(Delete this item?)')) {
                            deletePortfolioItem(categoryId, item.id);
                        }
                    }}
                    className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-black"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        )}

        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
            <img 
                src={images[currentImageIndex]} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500"
            />
            
            {/* Gallery Navigation */}
            {hasMultipleImages && (
                <>
                    <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1 rounded-full z-10">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-1 rounded-full z-10">
                        <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {images.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`w-1.5 h-1.5 rounded-full ${currentImageIndex === idx ? 'bg-white' : 'bg-white/50'}`} 
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Video Indicator */}
            {item.videoUrl && !hasMultipleImages && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 pointer-events-none">
                <PlayCircle size={48} className="text-white opacity-80" />
            </div>
            )}
            
            {/* Image Indicator */}
            {!item.videoUrl && !hasMultipleImages && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 p-1 rounded pointer-events-none">
                    <ImageIcon size={16} className="text-white" />
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
                {hasMultipleImages && (
                     <span className="text-xs font-semibold bg-gray-800 text-white px-2 py-0.5 rounded-full">
                        {images.length} 图 (Images)
                    </span>
                )}
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
                { key: 'gallery', label: '更多图片 (Gallery)', type: 'gallery', description: '添加多张图片以开启轮播展示' },
                { key: 'videoUrl', label: '视频链接 (Video URL)', type: 'text', description: '选填 (Optional)' },
                { key: 'tags', label: '标签 (Tags)', type: 'tags' },
            ]}
        />
    </>
  );
};