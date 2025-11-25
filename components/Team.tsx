import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { Edit2, Plus, Trash2, User } from 'lucide-react';
import { EditModal } from './EditModal';
import { TeamMember } from '../types';

export const Team: React.FC = () => {
  const { teamMembers, isAdmin, updateTeamMember, addTeamMember, deleteTeamMember } = useContent();
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <section className="mb-24 animate-fade-in relative">
        <div className="flex items-end justify-between mb-8 px-2">
            <div>
                 <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-2 block">Our Team</span>
                 <h2 className="text-3xl font-serif font-bold text-white">核心团队</h2>
            </div>
            {isAdmin && (
                <button onClick={() => setIsAdding(true)} className="text-xs bg-brand-gold text-black px-3 py-1 rounded font-bold hover:bg-white">
                    <Plus size={14} className="inline mr-1"/> 添加成员
                </button>
            )}
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto no-scrollbar gap-6 pb-10 px-2 snap-x">
            {teamMembers.map((member) => (
                <div 
                    key={member.id} 
                    className="snap-center flex-none w-64 bg-[#121212] rounded-none border border-white/5 relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] hover:border-brand-gold/30"
                >
                    {/* Image */}
                    <div className="h-80 w-full overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-500">
                        {member.imageUrl ? (
                             <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                             <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-700"><User size={48}/></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-80"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex flex-wrap gap-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                            {member.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[10px] text-brand-gold border border-brand-gold/30 px-1.5 py-0.5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">{member.role}</p>
                    </div>

                    {/* Admin Overlay */}
                    {isAdmin && (
                        <div className="absolute top-2 right-2 flex gap-2">
                             <button onClick={() => setEditingMember(member)} className="bg-black/80 text-white p-2 hover:text-brand-gold"><Edit2 size={14}/></button>
                             <button onClick={() => {if(confirm('Delete?')) deleteTeamMember(member.id)}} className="bg-black/80 text-white p-2 hover:text-red-500"><Trash2 size={14}/></button>
                        </div>
                    )}
                </div>
            ))}
        </div>

        {/* Modals */}
        <EditModal 
            isOpen={!!editingMember || isAdding}
            onClose={() => { setEditingMember(null); setIsAdding(false); }}
            onSave={(data) => {
                if (isAdding) {
                    addTeamMember({ ...data, id: `t-${Date.now()}`, tags: data.tags || [] });
                } else if (editingMember) {
                    updateTeamMember(editingMember.id, data);
                }
                setEditingMember(null);
                setIsAdding(false);
            }}
            initialData={editingMember || { tags: [] }}
            title={isAdding ? "添加新成员" : "编辑成员"}
            fields={[
                { key: 'name', label: '姓名', type: 'text' },
                { key: 'role', label: '职位', type: 'text' },
                { key: 'imageUrl', label: '照片 (建议竖图)', type: 'image' },
                { key: 'tags', label: '标签', type: 'tags' },
            ]}
        />
    </section>
  );
};