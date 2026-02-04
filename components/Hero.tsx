
import React from 'react';
import { ArrowRight, FileText, Code2, Edit2 } from 'lucide-react';
import { PortfolioData } from '../types';

interface HeroProps {
  data: PortfolioData;
  isAdmin: boolean;
  onEdit: (updatedBio: Partial<PortfolioData['bio']>) => void;
  onResumeOpen: () => void;
}

const Hero: React.FC<HeroProps> = ({ data, isAdmin, onEdit, onResumeOpen }) => {
  const isDark = data.settings.theme === 'dark';

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background Blobs adjusted for theme */}
      <div className={`absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-[120px] transition-all duration-1000 ${isDark ? 'bg-blue-600/20' : 'bg-blue-400/10'}`}></div>
      <div className={`absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-[120px] transition-all duration-1000 ${isDark ? 'bg-purple-600/10' : 'bg-purple-400/5'}`}></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest transition-colors ${
            isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for new opportunities
          </div>
          
          <div className="relative group">
            {isAdmin && (
              <button 
                onClick={() => {
                  const newName = prompt("Enter new name", data.bio.name);
                  if (newName) onEdit({ name: newName });
                }}
                className={`absolute -top-6 -left-6 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-800 shadow-md border border-slate-200'}`}
              >
                <Edit2 size={14} />
              </button>
            )}
            <h1 className={`text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
              I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">digital experiences</span> that matter.
            </h1>
          </div>
          
          <div className="relative group">
            {isAdmin && (
              <button 
                onClick={() => {
                  const newAbout = prompt("Enter new about text", data.bio.about);
                  if (newAbout) onEdit({ about: newAbout });
                }}
                className={`absolute -top-6 -left-6 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-800 shadow-md border border-slate-200'}`}
              >
                <Edit2 size={14} />
              </button>
            )}
            <p className={`text-lg transition-colors max-w-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Hi, I'm <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-950'}`}>{data.bio.name}</span>. {data.bio.about}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25">
              View Work <ArrowRight size={20} />
            </a>
            <button 
              onClick={onResumeOpen}
              className={`px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all border ${
                isDark ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
              }`}
            >
              Resume <FileText size={20} />
            </button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div>
              <p className={`text-2xl font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-950'}`}>8+</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Years Experience</p>
            </div>
            <div className={`h-8 w-[1px] ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
            <div>
              <p className={`text-2xl font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-950'}`}>{data.projects.length}+</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Live Projects</p>
            </div>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className={`relative z-10 rounded-2xl overflow-hidden border p-2 group transition-all duration-500 ${
            isDark ? 'border-slate-800 bg-slate-900/50 hover:border-blue-500/50' : 'border-slate-200 bg-white hover:border-blue-300'
          }`}>
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <img 
               src="https://697fee16c4feaabd2d12db0d.imgix.net/me-.jpg" 
               alt="Profile" 
               className={`rounded-xl w-full object-cover aspect-[4/5] transition-all duration-700 ${isDark ? 'grayscale hover:grayscale-0' : 'hover:scale-[1.02]'}`}
             />
             <div className={`absolute bottom-6 left-6 right-6 p-4 rounded-xl border shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ${
               isDark ? 'bg-slate-900/90 border-slate-700/50 backdrop-blur-md' : 'bg-white/90 border-slate-200 backdrop-blur-md'
             }`}>
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-600 rounded-lg text-white">
                   <Code2 size={24} />
                 </div>
                 <div>
                   <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>Currently Building</p>
                   <p className="text-xs text-slate-500">Next-gen AI Architectures</p>
                 </div>
               </div>
             </div>
          </div>
          
          <div className={`absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 rounded-tr-3xl transition-colors ${isDark ? 'border-slate-800' : 'border-slate-200'}`}></div>
          <div className={`absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 rounded-bl-3xl transition-colors ${isDark ? 'border-slate-800' : 'border-slate-200'}`}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
