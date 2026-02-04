
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import ResumeView from './components/ResumeView';
import { PortfolioData } from './types';
import { loadPortfolioData, savePortfolioData } from './constants';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(loadPortfolioData());
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Update document title and theme-based body background
  useEffect(() => {
    document.title = data.settings.seoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.settings.seoDescription);
    
    // Set the body color to match the theme to prevent flashing on scroll
    document.body.style.backgroundColor = data.settings.theme === 'dark' ? '#0f172a' : '#f8fafc';
  }, [data.settings.seoTitle, data.settings.seoDescription, data.settings.theme]);

  const handleSave = () => {
    savePortfolioData(data);
    setHasChanges(false);
  };

  const handleLogin = async (username: string, password: string) => {
    if (username === data.settings.adminUsername && password === data.settings.adminPassword) {
      setIsAdmin(true);
      setShowDashboard(true);
      return true;
    }
    return false;
  };

  const onUpdateData = (newData: PortfolioData) => {
    setData(newData);
    setHasChanges(true);
  };

  const toggleTheme = () => {
    onUpdateData({
      ...data,
      settings: {
        ...data.settings,
        theme: data.settings.theme === 'dark' ? 'light' : 'dark'
      }
    });
  };

  if (showDashboard && isAdmin) {
    return (
      <AdminDashboard 
        data={data} 
        onUpdate={onUpdateData}
        onSave={handleSave}
        onLogout={() => {
          setIsAdmin(false);
          setShowDashboard(false);
        }}
        hasChanges={hasChanges}
      />
    );
  }

  const isDark = data.settings.theme === 'dark';

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-950 text-slate-50' : 'bg-slate-50 text-slate-950'} selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden`}>
      {/* Interactive Background Elements */}
      {data.settings.showInteractiveElements && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className={`absolute top-1/4 -left-20 w-72 h-72 rounded-full blur-[120px] transition-opacity duration-1000 ${isDark ? 'bg-blue-600/10 opacity-100' : 'bg-blue-600/5 opacity-50'}`}></div>
          <div className={`absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-[120px] transition-opacity duration-1000 ${isDark ? 'bg-purple-600/5 opacity-100' : 'bg-purple-600/5 opacity-30'}`}></div>
        </div>
      )}

      <Navbar 
        data={data} 
        isAdmin={isAdmin} 
        onLoginClick={() => {
          if (isAdmin) setShowDashboard(true);
          else setIsLoginOpen(true);
        }} 
        onThemeToggle={toggleTheme}
        onResumeOpen={() => setShowResume(true)}
      />
      
      <main className="relative z-10">
        <Hero 
          data={data} 
          isAdmin={isAdmin} 
          onEdit={(bio) => onUpdateData({...data, bio: {...data.bio, ...bio}})} 
          onResumeOpen={() => setShowResume(true)}
        />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className={`h-px w-full bg-gradient-to-r from-transparent ${isDark ? 'via-slate-800/50' : 'via-slate-200'} to-transparent`}></div>
        </div>
        
        <Projects projects={data.projects.filter(p => p.isVisible)} theme={data.settings.theme} />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className={`h-px w-full bg-gradient-to-r from-transparent ${isDark ? 'via-slate-800/50' : 'via-slate-200'} to-transparent`}></div>
        </div>
        
        <Skills skills={data.skills} theme={data.settings.theme} />
        
        <Experience 
          data={data} 
          isAdmin={isAdmin} 
          onEdit={(exp) => onUpdateData({...data, experience: exp})} 
          theme={data.settings.theme}
        />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className={`h-px w-full bg-gradient-to-r from-transparent ${isDark ? 'via-slate-800/50' : 'via-slate-200'} to-transparent`}></div>
        </div>
        
        <Contact theme={data.settings.theme} />
      </main>
      
      <Footer theme={data.settings.theme} />
      
      <AIChat data={data} theme={data.settings.theme} />
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin} 
      />

      {/* Professional Resume View Portal */}
      {showResume && (
        <ResumeView 
          data={data} 
          onClose={() => setShowResume(false)} 
          isDark={isDark} 
        />
      )}
    </div>
  );
};

export default App;
