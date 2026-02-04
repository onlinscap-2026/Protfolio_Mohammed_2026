
import React from 'react';
import { loadPortfolioData } from '../constants';

interface FooterProps {
  theme: 'dark' | 'light';
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const data = loadPortfolioData();
  const isDark = theme === 'dark';
  
  return (
    <footer className={`py-12 border-t transition-colors duration-500 ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className={`text-sm transition-colors ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} {data.bio.name}. {data.settings.copyrightText || 'All Rights Reserved.'}
          </p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
            {data.settings.designCreditText || 'Built with React & Gemini AI'}
          </p>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="#" className={`text-xs font-bold uppercase transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>Privacy</a>
          <a href="#" className={`text-xs font-bold uppercase transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>Terms</a>
          <span className={isDark ? 'text-slate-800' : 'text-slate-200'}>|</span>
          <p className={`text-xs font-mono transition-colors ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Sign in to manage your portfolio content</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
