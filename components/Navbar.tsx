
import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, UserCog, Sun, Moon, FileText } from 'lucide-react';
import { PortfolioData } from '../types';

interface NavbarProps {
  data: PortfolioData;
  isAdmin: boolean;
  onLoginClick: () => void;
  onThemeToggle: () => void;
  onResumeOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ data, isAdmin, onLoginClick, onThemeToggle, onResumeOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = data.settings.theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      isScrolled 
        ? (isDark ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm') 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className={`text-2xl font-bold tracking-tighter transition-colors ${isDark ? 'text-white' : 'text-slate-950'}`}>
          {data.bio.name.split(' ')[0].toUpperCase()}<span className="text-blue-500">.</span>{data.bio.name.split(' ')[1]?.toUpperCase() || 'DEV'}
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className={`h-4 w-[1px] ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onResumeOpen}
              className={`p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-blue-400 hover:bg-slate-800' : 'text-blue-600 hover:bg-slate-100'}`}
            >
              <FileText size={18} /> CV
            </button>

            <button 
              onClick={onThemeToggle}
              className={`p-2 rounded-lg transition-all ${isDark ? 'text-amber-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'}`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {!isAdmin && (
              <button 
                onClick={onLoginClick}
                className={`p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100'}`}
              >
                <UserCog size={18} /> Admin
              </button>
            )}
            
            <div className="flex items-center gap-3">
              <a href={data.bio.socials.github} target="_blank" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-950'}`}><Github size={18} /></a>
              <a href={data.bio.socials.linkedin} target="_blank" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-950'}`}><Linkedin size={18} /></a>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={onResumeOpen}
            className={`p-2 rounded-lg ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
          >
            <FileText size={24} />
          </button>
          <button 
            onClick={onThemeToggle}
            className={`p-2 rounded-lg ${isDark ? 'text-amber-400' : 'text-slate-600'}`}
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button className={isDark ? 'text-slate-200' : 'text-slate-800'} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full p-6 space-y-4 animate-in slide-in-from-top duration-300 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg font-medium ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}
            >
              {link.name}
            </a>
          ))}
          <div className={`pt-4 border-t flex gap-4 items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <div className="flex gap-4">
              <a href={data.bio.socials.github} className={isDark ? 'text-slate-400' : 'text-slate-500'}><Github size={24} /></a>
              <a href={data.bio.socials.linkedin} className={isDark ? 'text-slate-400' : 'text-slate-500'}><Linkedin size={24} /></a>
            </div>
            {!isAdmin && (
              <button onClick={onLoginClick} className={`text-xs font-bold uppercase flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <UserCog size={16} /> Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
