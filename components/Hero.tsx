import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Edit2 } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { EditModal } from './EditModal';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const { companyInfo, isAdmin, updateCompanyInfo } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cinematic Gold Embers Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const particleCount = 80;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height + height;
        this.size = Math.random() * 2;
        this.speedY = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random() * 0.5;
        // Cinematic Gold Palette
        const colors = ['#D4AF37', '#FFD700', '#DAA520', '#CD853F'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.y * 0.003) * 0.2; // Gentle sway

        if (this.y < -50) {
          this.y = height + Math.random() * 50;
          this.x = Math.random() * width;
        }

        // Twinkle
        if (Math.random() > 0.95) {
            this.opacity = Math.random() * 0.8;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('main-content');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-white bg-black">
        
        {/* Background Image Layer */}
        {companyInfo.heroBackgroundImage ? (
             <motion.div 
             initial={{ scale: 1.1 }}
             animate={{ scale: 1 }}
             transition={{ duration: 10, ease: "easeOut" }}
             className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
             style={{ backgroundImage: `url(${companyInfo.heroBackgroundImage})` }}
           />
        ) : (
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/20 via-black to-black" />
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

        {/* Admin Edit Button */}
        {isAdmin && (
            <button 
                onClick={() => setIsEditing(true)}
                className="absolute top-24 right-6 bg-brand-gold text-black p-3 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)] z-50 hover:bg-white transition-all"
            >
                <Edit2 size={20} />
            </button>
        )}

        {/* Main Content */}
        <div className="z-20 text-center px-4 relative max-w-4xl mx-auto">
            
            {/* Logo Section */}
            {companyInfo.logoUrl && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-8 flex justify-center"
                >
                    <img 
                        src={companyInfo.logoUrl} 
                        alt="Company Logo" 
                        className="h-24 md:h-32 w-auto object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                    />
                </motion.div>
            )}

            {/* Cinematic Name */}
            <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="text-5xl md:text-8xl font-bold mb-4 tracking-tighter font-serif"
            >
                <span className="text-gold-gradient drop-shadow-2xl">
                    {companyInfo.name}
                </span>
            </motion.h1>

            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 1, delay: 1 }}
                className="h-[2px] bg-brand-gold mx-auto mb-8 shadow-[0_0_10px_#D4AF37]"
            />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="space-y-4"
            >
                <p className="text-xl md:text-3xl font-light tracking-[0.3em] uppercase text-gray-300 font-cinzel">
                    {companyInfo.slogan.split('，')[0]}
                </p>
                <p className="text-lg md:text-2xl font-light tracking-[0.2em] text-brand-goldLight">
                    {companyInfo.slogan.split('，')[1] || ''}
                </p>
            </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            onClick={scrollToContent}
            className="absolute bottom-12 z-20 text-brand-gold/70 hover:text-brand-gold transition-colors"
        >
            <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] tracking-widest uppercase font-cinzel">Scroll</span>
                <ChevronDown size={32} />
            </div>
        </motion.button>

        <EditModal 
            isOpen={isEditing}
            onClose={() => setIsEditing(false)}
            onSave={updateCompanyInfo}
            initialData={companyInfo}
            title="编辑首页信息 (Edit Hero)"
            fields={[
                { key: 'name', label: '公司名称', type: 'text' },
                { key: 'slogan', label: '口号 (为热爱而生,为您而来)', type: 'text' },
                { key: 'description', label: '公司简介', type: 'textarea' },
                { key: 'logoUrl', label: '公司 Logo (PNG)', type: 'image' },
                { key: 'heroBackgroundImage', label: '背景大图', type: 'image' },
            ]}
        />
    </div>
  );
};