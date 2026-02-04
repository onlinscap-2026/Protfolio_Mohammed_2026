
import React from 'react';
import { X, Mail, Phone, MapPin, Globe, Download, Printer, Briefcase, GraduationCap, Code2, ExternalLink } from 'lucide-react';
import { PortfolioData } from '../types';

interface ResumeViewProps {
  data: PortfolioData;
  onClose: () => void;
  isDark: boolean;
}

const ResumeView: React.FC<ResumeViewProps> = ({ data, onClose, isDark }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-300">
      {/* Control Bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-4 bg-slate-900 border border-slate-700 px-6 py-3 rounded-2xl shadow-2xl text-white">
        <button onClick={handlePrint} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
          <Printer size={18} /> <span className="text-xs font-bold uppercase tracking-wider">Print / PDF</span>
        </button>
        <div className="w-px h-6 bg-slate-700"></div>
        <button onClick={onClose} className="flex items-center gap-2 hover:text-red-400 transition-colors">
          <X size={20} /> <span className="text-xs font-bold uppercase tracking-wider">Close</span>
        </button>
      </div>

      {/* Resume Document Content */}
      <div className="w-full max-w-4xl h-full bg-white text-slate-900 rounded-lg shadow-2xl overflow-y-auto custom-scrollbar p-10 md:p-16 print:p-0 print:shadow-none print:m-0 print:w-full">
        {/* Header */}
        <header className="border-b-4 border-slate-900 pb-10 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">{data.bio.name}</h1>
            <p className="text-xl font-bold text-blue-600 uppercase tracking-widest">{data.bio.title}</p>
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-2"><Mail size={14} /> {data.bio.email}</div>
            <div className="flex items-center gap-2"><Phone size={14} /> {data.bio.phone}</div>
            <div className="flex items-center gap-2"><MapPin size={14} /> {data.bio.location}</div>
            <div className="flex items-center gap-2"><Globe size={14} /> {data.bio.socials.linkedin.replace('https://', '')}</div>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column (Main Info) */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b border-slate-200 pb-2 mb-6 flex items-center gap-3">
                <Briefcase size={16} className="text-blue-600" /> Professional Experience
              </h2>
              <div className="space-y-10">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black text-lg uppercase">{exp.role}</h3>
                      <span className="text-sm font-bold text-slate-400 font-mono">{exp.period}</span>
                    </div>
                    <p className="text-sm font-bold text-blue-600 mb-4">{exp.company}</p>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm text-slate-600 leading-relaxed flex gap-3">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b border-slate-200 pb-2 mb-6 flex items-center gap-3">
                <GraduationCap size={18} className="text-blue-600" /> Education
              </h2>
              <div className="space-y-8">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg">{edu.institution}</h3>
                      <span className="text-sm font-bold text-slate-400 font-mono">{edu.period}</span>
                    </div>
                    <p className="text-sm text-slate-600">{edu.degree} in {edu.field} • {edu.location}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-12">
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b border-slate-200 pb-2 mb-6">
                Profile Summary
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed italic">
                {data.bio.fullBio}
              </p>
            </section>

            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b border-slate-200 pb-2 mb-6">
                Technical Mastery
              </h2>
              <div className="space-y-6">
                {data.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                      <span>{skill.name}</span>
                      <span className="text-blue-600">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-100 rounded-full">
                      <div className="h-full bg-slate-900" style={{ width: `${skill.level}%` }}></div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 leading-tight">{skill.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b border-slate-200 pb-2 mb-6">
                Top Projects
              </h2>
              <div className="space-y-4">
                {data.projects.filter(p => p.isFeatured).slice(0, 3).map(proj => (
                  <div key={proj.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <h4 className="font-bold text-sm mb-1">{proj.title}</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-2 mb-2">{proj.description}</p>
                    <div className="flex gap-1 flex-wrap">
                      {proj.tags.slice(0, 3).map(t => (
                        <span key={t} className="text-[8px] bg-white border border-slate-200 px-1 rounded text-slate-400">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer Signature */}
        <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
            Generated by {data.bio.name} • {new Date().getFullYear()}
          </p>
        </footer>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 20px; }
        @media print {
          .absolute, .fixed { display: none !important; }
          body { background: white !important; }
          .custom-scrollbar { overflow: visible !important; }
        }
      `}</style>
    </div>
  );
};

export default ResumeView;
