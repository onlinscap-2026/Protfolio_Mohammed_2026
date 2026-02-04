
import React from 'react';
import { Skill } from '../types';
import { Layers, Terminal, Globe, Palette } from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
  theme: 'dark' | 'light';
}

const Skills: React.FC<SkillsProps> = ({ skills, theme }) => {
  const isDark = theme === 'dark';
  const categories = [
    { name: 'Frontend', icon: <Globe size={20} className="text-blue-400" /> },
    { name: 'Backend', icon: <Terminal size={20} className="text-emerald-400" /> },
    { name: 'Tools', icon: <Layers size={20} className="text-purple-400" /> },
    { name: 'Soft Skills', icon: <Palette size={20} className="text-amber-400" /> },
  ];

  return (
    <section id="skills" className={`py-24 transition-colors duration-500 ${isDark ? 'bg-slate-900/50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Technical Proficiency</h2>
          <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const catSkills = skills.filter(s => s.category === cat.name);
            if (catSkills.length === 0) return null;

            return (
              <div key={cat.name} className={`p-8 rounded-2xl border transition-all duration-300 ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
                  : 'bg-slate-50 border-slate-200 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50'
              }`}>
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
                    {cat.icon}
                  </div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{cat.name}</h3>
                </div>

                <div className="space-y-6">
                  {catSkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{skill.name}</span>
                        <span className="text-xs font-mono text-slate-500">{skill.level}%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
