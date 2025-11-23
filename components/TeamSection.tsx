import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { EditModal } from './EditModal';
import { TeamMember } from '../types';

export const TeamSection: React.FC = () => {
  const { teamMembers, isAdmin, updateTeamMember, addTeamMember, deleteTeamMember } = useContent();
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddMember = (data: any) => {
    addTeamMember({
        id: `t-${Date.now()}`,
        name: data.name,
        role: data.role,
        imageUrl: data.imageUrl || 'https://picsum.photos/400/500',
        tags: data.tags || []
    });
    setIsAdding(false);
  };

  return (
    <>
        <div className="mb-10 animate-fade-in">
        <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
                <div className="h-6 w-1 bg-brand-red rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">核心人员简介</h2>
            </div>
            {isAdmin && (
                <span className="text-xs text-brand-red animate-pulse">
                    编辑模式: 可添加或删除成员
                </span>
            )}
        </div>

        <div className="flex overflow-x-auto no-scrollbar space-x-4 pb-4 px-2">
            {teamMembers.map((member) => (
            <div 
                key={member.id} 
                className="flex-none w-40 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 flex flex-col relative group"
            >
                {isAdmin && (
                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                        <button 
                            onClick={() => setEditingMember(member)}
                            className="bg-brand-red text-white p-1.5 rounded-full shadow hover:scale-110"
                        >
                            <Edit2 size={12} />
                        </button>
                        <button 
                            onClick={() => {
                                if(confirm(`确定要删除成员 "${member.name}" 吗？`)) {
                                    deleteTeamMember(member.id);
                                }
                            }}
                            className="bg-gray-800 text-white p-1.5 rounded-full shadow hover:scale-110"
                        >
                            <Trash2 size={12} />
                        </button>
                    </div>
                )}
                
                <div className="h-48 w-full overflow-hidden bg-gray-200">
                    <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm mb-1">{member.name}</h3>
                        <p className="text-xs text-brand-red font-medium mb-2">{member.role}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {member.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            ))}

            {/* Add New Member Card */}
            {isAdmin && (
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex-none w-40 bg-gray-50 rounded-xl shadow-sm border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-100 hover:border-brand-red transition-colors group min-h-[250px]"
                >
                    <div className="bg-white p-4 rounded-full shadow-sm group-hover:scale-110 transition-transform mb-3">
                        <Plus size={24} className="text-brand-red" />
                    </div>
                    <span className="text-sm font-bold text-gray-500 group-hover:text-brand-red">添加成员</span>
                </button>
            )}
        </div>
        </div>

        {/* Edit Existing Member Modal */}
        {editingMember && (
            <EditModal 
                isOpen={!!editingMember}
                onClose={() => setEditingMember(null)}
                onSave={(data) => {
                    updateTeamMember(editingMember.id, data);
                    setEditingMember(null);
                }}
                initialData={editingMember}
                title="编辑成员 (Edit Member)"
                fields={[
                    { key: 'name', label: '姓名 (Name)', type: 'text' },
                    { key: 'role', label: '职位 (Role)', type: 'text' },
                    { key: 'imageUrl', label: '照片 (Photo)', type: 'image' },
                    { key: 'tags', label: '标签 (Tags)', type: 'tags' },
                ]}
            />
        )}

        {/* Add New Member Modal */}
        <EditModal 
            isOpen={isAdding}
            onClose={() => setIsAdding(false)}
            onSave={handleAddMember}
            initialData={{ tags: [] }}
            title="添加新成员 (Add New Member)"
            fields={[
                { key: 'name', label: '姓名 (Name)', type: 'text' },
                { key: 'role', label: '职位 (Role)', type: 'text' },
                { key: 'imageUrl', label: '照片 (Photo)', type: 'image' },
                { key: 'tags', label: '标签 (Tags)', type: 'tags' },
            ]}
        />
    </>
  );
};