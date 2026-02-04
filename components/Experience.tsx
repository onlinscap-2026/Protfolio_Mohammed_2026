
import React from 'react';
import { PortfolioData, Experience as ExperienceType } from '../types';
import { Briefcase, Download, Plus, Trash2 } from 'lucide-react';

interface ExperienceProps {
  data: PortfolioData;
  isAdmin: boolean;
  onEdit: (updatedExp: PortfolioData['experience']) => void;
  theme: 'dark' | 'light';
}

const Experience: React.FC<ExperienceProps> = ({ data, isAdmin, onEdit, theme }) => {
  const isDark = theme === 'dark';
  
  const addExperience = () => {
    const newExp: ExperienceType = {
      id: Date.now().toString(),
      company: 'New Company',
      role: 'Role Name',
      period: 'Start - End',
      location: 'Remote',
      type: 'Full-time',
      description: ['New achievement description...']
    };
    onEdit([newExp, ...data.experience]);
  };

  const removeExperience = (index: number) => {
    if (confirm('Delete this experience?')) {
      const updated = data.experience.filter((_, i) => i !== index);
      onEdit(updated);
    }
  };

  return (
    <section id="experience" className={`py-24 transition-colors duration-500 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16 text-center relative group">
          <h2 className={`text-3xl font-bold mb-4 transition-colors ${isDark ? 'text-white' : 'text-slate-950'}`}>Professional Journey</h2>
          <div className="w-20 h-1.5 bg-blue-600 rounded-full mx-auto"></div>
          
          {isAdmin && (
            <button 
              onClick={addExperience}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold transition-all hover:bg-blue-500"
            >
              <Plus size={18} /> Add Experience
            </button>
          )}
        </div>

        <div className="space-y-12">
          {data.experience.map((exp, idx) => (
            <div key={idx} className={`relative pl-12 before:absolute before:left-4 before:top-2 before:bottom-[-48px] before:w-[2px] last:before:hidden ${isDark ? 'before:bg-slate-800' : 'before:bg-slate-200'}`}>
              <div className={`absolute left-0 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                isDark ? 'bg-slate-900 border-blue-600 text-blue-500' : 'bg-white border-blue-500 text-blue-600 shadow-sm'
              }`}>
                <Briefcase size={14} />
              </div>

              <div className={`p-8 rounded-2xl border transition-all shadow-xl group relative ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-black/20' 
                  : 'bg-white border-slate-200 hover:border-blue-200 shadow-slate-200/50'
              }`}>
                {isAdmin && (
                  <button 
                    onClick={() => removeExperience(idx)}
                    className="absolute top-4 right-4 p-2 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                  <div>
                    <h3 className={`text-xl font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h3>
                    <p className="text-blue-500 font-medium">{exp.company}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full font-mono ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className={`flex gap-3 text-sm leading-relaxed transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <span className="text-blue-500 mt-1.5 shrink-0">
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                          <circle cx="3" cy="3" r="3" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button 
            onClick={() => window.print()}
            className={`inline-flex items-center gap-2 px-6 py-3 border rounded-xl transition-all ${
              isDark 
                ? 'border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white' 
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-950 shadow-sm'
            }`}
          >
            <Download size={18} /> Download Detailed CV
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;
