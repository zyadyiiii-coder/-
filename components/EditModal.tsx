import React, { useState, useEffect } from 'react';
import { X, Upload, Save, Plus, Trash2 } from 'lucide-react';

interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'tags' | 'gallery';
  description?: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: any;
  fields: FieldConfig[];
  title: string;
}

export const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, initialData, fields, title }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Warning: This creates a Base64 string. 
        // For production, you'd upload to a server and get a URL.
        // For this static demo, Base64 works but increases file size.
        handleChange(key, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gallery Helpers
  const addGalleryImage = (key: string) => {
      const currentGallery = formData[key] || [];
      handleChange(key, [...currentGallery, '']);
  }

  const updateGalleryImage = (key: string, index: number, value: string) => {
      const currentGallery = [...(formData[key] || [])];
      currentGallery[index] = value;
      handleChange(key, currentGallery);
  }

  const uploadGalleryImage = (key: string, index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          updateGalleryImage(key, index, reader.result as string);
        };
        reader.readAsDataURL(file);
      }
  }

  const removeGalleryImage = (key: string, index: number) => {
      const currentGallery = [...(formData[key] || [])];
      currentGallery.splice(index, 1);
      handleChange(key, currentGallery);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-brand-red text-white p-4 flex justify-between items-center z-10">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onClose}><X size={24} /></button>
        </div>

        <div className="p-6 space-y-6">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {field.label}
              </label>
              
              {field.type === 'text' && (
                <input
                  type="text"
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  value={formData[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
                />
              )}

              {field.type === 'tags' && (
                 <input
                 type="text"
                 placeholder="用逗号分隔 (e.g. 标签1, 标签2)"
                 value={Array.isArray(formData[field.key]) ? formData[field.key].join(', ') : (formData[field.key] || '')}
                 onChange={(e) => handleChange(field.key, e.target.value.split(',').map((s: string) => s.trim()))}
                 className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
               />
              )}

              {field.type === 'image' && (
                <div className="space-y-2">
                  <div className={`relative h-40 w-full bg-gray-100 rounded-lg overflow-hidden border border-dashed border-gray-400 flex items-center justify-center group ${field.key === 'logoUrl' ? 'bg-gray-800' : ''}`}>
                     {formData[field.key] ? (
                        <img 
                            src={formData[field.key]} 
                            alt="Preview" 
                            // Use contain for logos so they don't get cropped, cover for backgrounds
                            className={`w-full h-full ${field.key === 'logoUrl' ? 'object-contain p-2' : 'object-cover'}`} 
                        />
                     ) : (
                        <span className="text-gray-400 text-sm">暂无图片</span>
                     )}
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs">点击更换</span>
                     </div>
                     <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleImageUpload(field.key, e)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     />
                  </div>
                  <input
                    type="text"
                    placeholder="或输入图片 URL (Or image URL)"
                    value={formData[field.key]?.startsWith('data:') ? '(已选择本地图片 Local Image Selected)' : formData[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs text-gray-500"
                    disabled={formData[field.key]?.startsWith('data:')}
                  />
                </div>
              )}

              {field.type === 'gallery' && (
                  <div className="space-y-3">
                      {(formData[field.key] || []).map((imgUrl: string, index: number) => (
                          <div key={index} className="flex gap-2 items-start">
                              <div className="relative h-20 w-20 flex-none bg-gray-100 rounded border overflow-hidden group">
                                  {imgUrl ? (
                                      <img src={imgUrl} className="w-full h-full object-cover" />
                                  ) : (
                                      <div className="flex items-center justify-center h-full text-xs text-gray-400">Empty</div>
                                  )}
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => uploadGalleryImage(field.key, index, e)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                              </div>
                              <div className="flex-1 space-y-1">
                                <input 
                                    type="text"
                                    placeholder="Image URL"
                                    value={imgUrl?.startsWith('data:') ? '(Local Image)' : imgUrl}
                                    onChange={(e) => updateGalleryImage(field.key, index, e.target.value)}
                                    className="w-full border p-1 text-sm rounded"
                                    disabled={imgUrl?.startsWith('data:')}
                                />
                              </div>
                              <button 
                                onClick={() => removeGalleryImage(field.key, index)}
                                className="text-red-500 p-2 hover:bg-red-50 rounded"
                              >
                                  <Trash2 size={16} />
                              </button>
                          </div>
                      ))}
                      <button 
                        onClick={() => addGalleryImage(field.key)}
                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded text-gray-500 hover:border-brand-red hover:text-brand-red flex items-center justify-center gap-2"
                      >
                          <Plus size={16} /> 添加更多图片 (Add Image)
                      </button>
                  </div>
              )}
              
              {field.description && (
                <p className="text-xs text-gray-500 mt-1">{field.description}</p>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 sticky bottom-0">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg"
          >
            取消
          </button>
          <button 
            onClick={() => { onSave(formData); onClose(); }}
            className="px-6 py-2 bg-brand-red text-white font-bold rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <Save size={18} /> 保存修改
          </button>
        </div>
      </div>
    </div>
  );
};