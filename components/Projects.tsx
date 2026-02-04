
import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, Github, FileText, X, Download, Maximize2, Minimize2, ZoomIn, ZoomOut, Printer } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
  theme: 'dark' | 'light';
}

const PDFViewerModal: React.FC<{ 
  pdfData: string; 
  title: string; 
  onClose: () => void; 
  isDark: boolean 
}> = ({ pdfData, title, onClose, isDark }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/90 animate-in fade-in duration-300 overflow-hidden">
      {/* Google Drive Header Style */}
      <div className={`flex items-center justify-between px-6 py-3 border-b transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-slate-50/90 border-slate-200 text-slate-900'
      } backdrop-blur-md`}>
        <div className="flex items-center gap-4">
          <div className="p-2 bg-red-600 rounded-lg text-white shadow-lg">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight truncate max-w-[200px] md:max-w-md">{title} - Documentation.pdf</h3>
            <p className="text-[10px] opacity-50 uppercase tracking-widest font-bold">Secure PDF Document</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-lg p-1">
             <button className="p-2 hover:bg-white/10 rounded-md transition-colors" title="Zoom In"><ZoomIn size={18} /></button>
             <button className="p-2 hover:bg-white/10 rounded-md transition-colors" title="Zoom Out"><ZoomOut size={18} /></button>
          </div>
          <div className="h-6 w-px bg-slate-800 hidden md:block"></div>
          <button className="p-2 hover:bg-white/10 rounded-md transition-colors" title="Print"><Printer size={18} /></button>
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = pdfData;
              link.download = `${title.replace(/\s+/g, '_')}_Documentation.pdf`;
              link.click();
            }}
            className="p-2 hover:bg-white/10 rounded-md transition-colors" 
            title="Download"
          >
            <Download size={18} />
          </button>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-red-600/20 text-red-500 rounded-md transition-all ml-2" 
            title="Close Viewer"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-10 flex justify-center bg-slate-800/30 overflow-hidden">
        <div className="w-full max-w-5xl h-full rounded-lg shadow-2xl shadow-black/50 overflow-hidden bg-white border border-white/10 relative">
          <iframe 
            src={`${pdfData}#toolbar=0&navpanes=0&scrollbar=0`} 
            className="w-full h-full border-none"
            title={title}
          />
          {/* Subtle overlay to prevent right clicks if needed, though native browser handles it */}
          <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20 flex flex-col items-end">
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Powered by Alex Rivera CMS</p>
            <div className="w-20 h-0.5 bg-blue-500 mt-1"></div>
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className={`px-6 py-2 border-t text-[10px] font-medium transition-colors text-center ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-500' : 'bg-slate-50/90 border-slate-200 text-slate-400'
      }`}>
        Press <span className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-white">ESC</span> to close documentation viewer
      </div>
    </div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ projects, theme }) => {
  const isDark = theme === 'dark';
  const [selectedPdf, setSelectedPdf] = useState<{data: string, title: string} | null>(null);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-4">Selected Works</h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-6"></div>
            <p className={`max-w-xl transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              A showcase of my recent projects, focusing on high-performance web applications and interactive UI systems.
            </p>
          </div>
          <a href="#" className="text-blue-500 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
            See all projects <ExternalLink size={18} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className={`group flex flex-col h-full rounded-3xl border overflow-hidden transition-all duration-500 ${
              isDark 
                ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700 shadow-2xl shadow-black/20' 
                : 'bg-white border-slate-200 hover:border-blue-200 shadow-xl shadow-slate-200/50'
            }`}>
              <div className="relative overflow-hidden aspect-[16/10]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-sm">
                  {project.github && (
                    <a href={project.github} className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white transition-all transform hover:-translate-y-1">
                      <Github size={22} />
                    </a>
                  )}
                  <a href={project.link} className="p-3 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-500/40">
                    <ExternalLink size={22} />
                  </a>
                  {project.pdfData && (
                    <button 
                      onClick={() => setSelectedPdf({ data: project.pdfData!, title: project.title })}
                      className="p-3 bg-red-600 hover:bg-red-500 rounded-2xl text-white transition-all transform hover:-translate-y-1 shadow-xl shadow-red-500/40"
                    >
                      <FileText size={22} />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors ${
                      isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className={`text-2xl font-bold mb-3 transition-colors group-hover:text-blue-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3>
                <p className={`text-sm line-clamp-2 leading-relaxed mb-8 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.description}
                </p>
                <div className={`mt-auto pt-6 border-t flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <a href={project.link} className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors hover:text-blue-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Live Preview <ArrowRight size={14} />
                  </a>
                  {project.pdfData && (
                    <button 
                      onClick={() => setSelectedPdf({ data: project.pdfData!, title: project.title })}
                      className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors flex items-center gap-1 uppercase tracking-widest"
                    >
                      <FileText size={14} /> PDF
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <PDFViewerModal 
          pdfData={selectedPdf.data} 
          title={selectedPdf.title} 
          onClose={() => setSelectedPdf(null)} 
          isDark={isDark} 
        />
      )}
    </section>
  );
};

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default Projects;
