import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Edit2 } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { EditModal } from './EditModal';

export const Hero: React.FC = () => {
  const { companyInfo, isAdmin, updateCompanyInfo } = useContent();
  const [loaded, setLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cinematic Particle System (Embers)
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
    const particleCount = 60; // Adjust for density

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height + height; // Start below or scattered
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        // Cinematic Gold/Red ember colors
        const colors = ['255, 215, 0', '255, 69, 0', '218, 165, 32']; 
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speedY;
        // Slight horizontal drift
        this.x += Math.sin(this.y * 0.005) * 0.3;

        // Reset if off screen or fully transparent
        if (this.y < -50 || this.opacity <= 0) {
          this.y = height + Math.random() * 50;
          this.x = Math.random() * width;
          this.opacity = Math.random() * 0.5 + 0.2;
        }

        // Flicker effect
        this.opacity -= Math.random() > 0.9 ? this.fadeSpeed * 5 : 0;
        if(Math.random() > 0.98) this.opacity = Math.min(1, this.opacity + 0.2);
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.5)`;
        ctx.fill();
      }
    }

    // Init
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

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('portfolio-content');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
        <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center text-white">
        
        {/* 1. Dynamic Background Layer */}
        {companyInfo.heroBackgroundImage ? (
             <div 
             className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[20s] ease-linear transform scale-100 hover:scale-110"
             style={{ backgroundImage: `url(${companyInfo.heroBackgroundImage})` }}
           />
        ) : (
            // Default Fallback Gradient if no image
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#2b0505] via-black to-[#1a0b0b]" />
        )}

        {/* 2. Cinematic Vignette & Overlay */}
        <div className="absolute inset-0 z-0 bg-black/60 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>

        {/* 3. Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

        {/* Admin Edit Button */}
        {isAdmin && (
            <button 
                onClick={() => setIsEditing(true)}
                className="absolute top-20 right-6 bg-brand-red/80 text-white p-2 rounded-full shadow-lg z-50 hover:bg-red-600 transition-transform backdrop-blur-sm"
            >
                <Edit2 size={20} />
            </button>
        )}

        {/* 4. Content Content */}
        <div className={`z-20 text-center px-6 transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Logo Section */}
            {companyInfo.logoUrl && (
                <div className="mb-8 relative inline-block animate-float">
                    <img 
                        src={companyInfo.logoUrl} 
                        alt="Company Logo" 
                        className="h-20 md:h-24 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                    />
                </div>
            )}

            {/* Cinematic English Name */}
            <h1 className="text-6xl md:text-8xl font-bold mb-2 tracking-tighter" 
                style={{ 
                    fontFamily: '"Times New Roman", serif',
                    background: 'linear-gradient(to bottom, #cfc7f8 0%, #ffffff 50%, #6c6c6c 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))'
                }}>
                YiDao
            </h1>

            {/* Cinematic Chinese Name with Gold Effect */}
            <h2 className="text-4xl md:text-5xl font-bold mb-10 tracking-[0.2em] relative inline-block">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] drop-shadow-md">
                    {companyInfo.name}
                </span>
                {/* Subtle glow behind text */}
                <div className="absolute inset-0 bg-brand-red/20 blur-xl -z-10 rounded-full"></div>
            </h2>
            
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#BF953F] to-transparent mx-auto mb-10"></div>

            <div className="space-y-2">
                <p className="text-lg md:text-2xl font-light tracking-widest uppercase text-gray-300">
                    {companyInfo.slogan.split('，')[0]}
                </p>
                <p className="text-xl md:text-3xl font-bold tracking-widest text-white drop-shadow-lg">
                    {companyInfo.slogan.split('，')[1] || ''}
                </p>
            </div>
        </div>

        {/* Scroll Indicator */}
        <button 
            onClick={scrollToContent}
            className="absolute bottom-12 animate-bounce p-2 z-20 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Scroll down"
        >
            <ChevronDown size={32} className="text-[#BF953F]" />
        </button>
        </div>

        <EditModal 
            isOpen={isEditing}
            onClose={() => setIsEditing(false)}
            onSave={updateCompanyInfo}
            initialData={companyInfo}
            title="编辑首页信息 (Edit Hero Section)"
            fields={[
                { key: 'name', label: '公司名称 (Company Name)', type: 'text' },
                { key: 'slogan', label: '口号 (Slogan)', type: 'text', description: '建议使用逗号分隔两段文字' },
                { key: 'description', label: '公司简介 (Description)', type: 'textarea' },
                { key: 'logoUrl', label: '公司 Logo (Logo)', type: 'image', description: '建议使用透明背景 PNG (Transparent PNG recommended)' },
                { key: 'heroBackgroundImage', label: '背景图片 (Background Image)', type: 'image', description: '建议使用暗色调的高清图片 (Dark HD image recommended)' },
            ]}
        />
    </>
  );
};