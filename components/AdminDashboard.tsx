
import React, { useState } from 'react';
import { 
  LayoutDashboard, User, Code2, Briefcase, GraduationCap, 
  Mail, Settings, LogOut, Plus, Trash2, Save, ExternalLink,
  ChevronRight, Eye, Image as ImageIcon, FileText, CheckCircle, Info,
  Star, EyeOff, MapPin, Phone, Link, Hash, Globe, Calendar, Type, FileUp, X
} from 'lucide-react';
import { PortfolioData, Project, Skill, Experience, Education, VisitorMessage } from '../types';

interface DashboardProps {
  data: PortfolioData;
  onUpdate: (newData: PortfolioData) => void;
  onLogout: () => void;
  onSave: () => void;
  hasChanges: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onUpdate, onLogout, onSave, hasChanges }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'projects' | 'skills' | 'experience' | 'education' | 'messages' | 'settings'>('overview');

  const updateSection = (key: keyof PortfolioData, value: any) => {
    onUpdate({ ...data, [key]: value });
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
      {id === 'messages' && data.messages.filter(m => !m.isRead).length > 0 && (
        <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {data.messages.filter(m => !m.isRead).length}
        </span>
      )}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col fixed h-full bg-slate-900/50 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white italic shadow-lg shadow-blue-500/20">A</div>
          <h1 className="text-xl font-bold tracking-tighter">ADMIN<span className="text-blue-500">.</span>CMS</h1>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
          <SidebarItem id="overview" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="profile" icon={User} label="Profile" />
          <SidebarItem id="skills" icon={Code2} label="Skills" />
          <SidebarItem id="projects" icon={Briefcase} label="Projects" />
          <SidebarItem id="experience" icon={Briefcase} label="Experience" />
          <SidebarItem id="education" icon={GraduationCap} label="Education" />
          <SidebarItem id="messages" icon={Mail} label="Messages" />
          <SidebarItem id="settings" icon={Settings} label="Settings" />
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-2">
          <button onClick={onSave} disabled={!hasChanges} className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${hasChanges ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
            <Save size={18} /> Save Changes
          </button>
          <button onClick={onLogout} className="w-full py-3 rounded-xl font-bold text-slate-400 hover:bg-red-900/10 hover:text-red-400 flex items-center justify-center gap-2 transition-all">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 bg-slate-950">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>
            <p className="text-slate-500 text-sm mt-1">Manage your professional identity</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-2 text-xs font-mono">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               {data.settings.adminUsername}
             </div>
             <button onClick={() => window.open('/', '_blank')} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 border border-slate-700" title="View Portfolio">
               <Eye size={20} />
             </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Projects', value: data.projects.length, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Skills', value: data.skills.length, icon: Code2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                { label: 'Messages', value: data.messages.length, icon: Mail, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                { label: 'Experience', value: data.experience.length, icon: LayoutDashboard, color: 'text-purple-500', bg: 'bg-purple-500/10' }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-slate-700 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                  <h4 className="text-4xl font-bold">{stat.value}</h4>
                  <p className="text-slate-500 text-sm mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
               <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Mail size={20} className="text-blue-500" /> Recent Messages</h3>
                  <div className="space-y-4">
                    {data.messages.slice(0, 3).map(msg => (
                      <div key={msg.id} className="p-4 bg-slate-800/30 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                        <div className="flex justify-between items-start mb-2">
                           <p className="font-bold text-sm">{msg.name}</p>
                           <p className="text-[10px] text-slate-500 font-mono">{msg.date}</p>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{msg.message}</p>
                      </div>
                    ))}
                    {data.messages.length === 0 && <p className="text-center text-slate-500 py-10 text-sm italic">No messages to display</p>}
                  </div>
                  {data.messages.length > 3 && (
                    <button onClick={() => setActiveTab('messages')} className="w-full mt-4 py-2 text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest">View All</button>
                  )}
               </div>
               
               <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Star size={20} className="text-amber-500" /> Quick Profile Overview</h3>
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden">
                        {data.bio.profileImage ? <img src={data.bio.profileImage} className="w-full h-full object-cover" /> : <ImageIcon className="w-full h-full p-4 text-slate-600" />}
                     </div>
                     <div>
                        <p className="font-bold text-lg">{data.bio.name}</p>
                        <p className="text-slate-400 text-sm">{data.bio.title}</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                        <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Theme</p>
                        <p className="text-sm capitalize">{data.settings.theme}</p>
                     </div>
                     <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                        <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Visibility</p>
                        <p className="text-sm">Public</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-xl">
               <div className="flex flex-col md:flex-row items-center gap-8 mb-4">
                 <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-500">
                      {data.bio.profileImage ? (
                        <img src={data.bio.profileImage} className="w-full h-full object-cover" alt="Profile" />
                      ) : (
                        <ImageIcon size={40} className="text-slate-600" />
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/40">
                       <ImageIcon size={16} />
                       <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => updateSection('bio', { ...data.bio, profileImage: reader.result as string });
                            reader.readAsDataURL(file);
                          }
                       }} />
                    </label>
                 </div>
                 <div className="flex-1 space-y-2">
                   <h3 className="text-xl font-bold">Identity & Branding</h3>
                   <p className="text-slate-500 text-sm">Update your public facing profile information and assets.</p>
                   <div className="flex gap-4 pt-2">
                      <label className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold cursor-pointer hover:bg-slate-700 transition-colors flex items-center gap-2">
                         <FileText size={14} /> {data.bio.resumeUrl ? 'Update Resume' : 'Upload Resume'}
                         <input type="file" className="hidden" accept=".pdf" onChange={(e) => {
                           const file = e.target.files?.[0];
                           if (file) {
                             const reader = new FileReader();
                             reader.onloadend = () => updateSection('bio', { ...data.bio, resumeUrl: reader.result as string });
                             reader.readAsDataURL(file);
                           }
                         }} />
                      </label>
                      {data.bio.resumeUrl && (
                        <button onClick={() => updateSection('bio', {...data.bio, resumeUrl: undefined})} className="text-xs text-red-500 font-bold hover:underline">Remove Resume</button>
                      )}
                   </div>
                 </div>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><User size={12}/> Full Name</label>
                   <input value={data.bio.name} onChange={(e) => updateSection('bio', {...data.bio, name: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><Briefcase size={12}/> Professional Title</label>
                   <input value={data.bio.title} onChange={(e) => updateSection('bio', {...data.bio, title: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
                 </div>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><Mail size={12}/> Email Address</label>
                   <input value={data.bio.email} onChange={(e) => updateSection('bio', {...data.bio, email: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><Phone size={12}/> Phone Number</label>
                   <input value={data.bio.phone} onChange={(e) => updateSection('bio', {...data.bio, phone: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><Info size={12}/> Who I Am (Hero Text)</label>
                 <textarea value={data.bio.whoIAm} onChange={(e) => updateSection('bio', {...data.bio, whoIAm: e.target.value})} rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-white" />
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><Type size={12}/> Short About</label>
                 <textarea value={data.bio.about} onChange={(e) => updateSection('bio', {...data.bio, about: e.target.value})} rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-white" />
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><FileText size={12}/> Detailed Bio (About Me Section)</label>
                 <textarea value={data.bio.fullBio} onChange={(e) => updateSection('bio', {...data.bio, fullBio: e.target.value})} rows={5} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-white" />
               </div>

               <div className="pt-4 space-y-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800 pb-2 flex items-center gap-2"><Globe size={14} /> Social Connections</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { key: 'github', label: 'GitHub URL', icon: Globe },
                      { key: 'linkedin', label: 'LinkedIn URL', icon: Link },
                      { key: 'twitter', label: 'Twitter URL', icon: Hash },
                      { key: 'instagram', label: 'Instagram URL', icon: ImageIcon }
                    ].map(social => (
                      <div key={social.key} className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{social.label}</label>
                        <div className="relative">
                           <social.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                           <input 
                             value={(data.bio.socials as any)[social.key] || ''} 
                             onChange={(e) => updateSection('bio', {...data.bio, socials: {...data.bio.socials, [social.key]: e.target.value}})} 
                             className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none" 
                           />
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
             </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
               <div>
                 <h3 className="font-bold text-xl">Projects Portfolio</h3>
                 <p className="text-slate-500 text-xs">Showcase your best work to the world.</p>
               </div>
               <button 
                 onClick={() => {
                   const newProj: Project = { 
                     id: Date.now().toString(), 
                     title: 'New Project', 
                     description: 'Project description...', 
                     tags: ['React'], 
                     image: 'https://picsum.photos/seed/new/800/450', 
                     link: '#', 
                     isFeatured: false, 
                     isVisible: true 
                   };
                   updateSection('projects', [newProj, ...data.projects]);
                 }}
                 className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
               >
                 <Plus size={18} /> Add Project
               </button>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.projects.map((proj, idx) => (
                  <div key={proj.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl group hover:border-blue-500/50 transition-all flex flex-col gap-6 shadow-xl shadow-black/20">
                    <div className="flex justify-between items-start">
                       <div className="relative w-24 h-24 rounded-2xl bg-slate-800 overflow-hidden border border-slate-700">
                          <img src={proj.image} className="w-full h-full object-cover" />
                          <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all">
                             <ImageIcon size={20} className="text-white" />
                             <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                               const file = e.target.files?.[0];
                               if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                     const updated = [...data.projects];
                                     updated[idx].image = reader.result as string;
                                     updateSection('projects', updated);
                                  };
                                  reader.readAsDataURL(file);
                               }
                             }} />
                          </label>
                       </div>
                       <div className="flex gap-2">
                          <button 
                            onClick={() => {
                               const updated = [...data.projects];
                               updated[idx].isVisible = !updated[idx].isVisible;
                               updateSection('projects', updated);
                            }}
                            className={`p-2 rounded-xl transition-all ${proj.isVisible ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-800 text-slate-500'}`}
                            title={proj.isVisible ? 'Hide Project' : 'Activate Project'}
                          >
                             {proj.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                          </button>
                          <button 
                            onClick={() => {
                               const updated = [...data.projects];
                               updated[idx].isFeatured = !updated[idx].isFeatured;
                               updateSection('projects', updated);
                            }}
                            className={`p-2 rounded-xl transition-all ${proj.isFeatured ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-800 text-slate-500'}`}
                            title="Toggle Featured"
                          >
                             <Star size={18} />
                          </button>
                          <button 
                            onClick={() => updateSection('projects', data.projects.filter(p => p.id !== proj.id))}
                            className="p-2 bg-red-900/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                          >
                             <Trash2 size={18} />
                          </button>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <input 
                         value={proj.title} 
                         onChange={(e) => {
                           const updated = [...data.projects];
                           updated[idx].title = e.target.value;
                           updateSection('projects', updated);
                         }}
                         className="w-full bg-transparent text-xl font-bold text-white border-b border-slate-800 focus:border-blue-500 outline-none pb-1"
                       />
                       <textarea 
                         value={proj.description}
                         onChange={(e) => {
                           const updated = [...data.projects];
                           updated[idx].description = e.target.value;
                           updateSection('projects', updated);
                         }}
                         rows={2}
                         className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-slate-300 resize-none outline-none focus:ring-1 focus:ring-blue-500"
                       />
                       <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                             <label className="text-[10px] font-bold text-slate-500 uppercase">Tags (comma separated)</label>
                             <input 
                               value={proj.tags.join(', ')}
                               onChange={(e) => {
                                  const updated = [...data.projects];
                                  updated[idx].tags = e.target.value.split(',').map(t => t.trim());
                                  updateSection('projects', updated);
                               }}
                               className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                             />
                          </div>
                          <div className="space-y-1">
                             <label className="text-[10px] font-bold text-slate-500 uppercase">GitHub Link</label>
                             <input 
                               value={proj.github || ''}
                               onChange={(e) => {
                                  const updated = [...data.projects];
                                  updated[idx].github = e.target.value;
                                  updateSection('projects', updated);
                               }}
                               className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                             />
                          </div>
                       </div>
                       
                       {/* PDF Management Section */}
                       <div className="pt-4 border-t border-slate-800">
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-2">Project Documentation (PDF)</label>
                          <div className="flex items-center gap-4">
                            {!proj.pdfData ? (
                              <label className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-slate-800 hover:bg-slate-700 border border-dashed border-slate-700 rounded-xl text-xs font-bold text-slate-400 cursor-pointer transition-colors">
                                <FileUp size={16} /> Upload PDF Document
                                <input 
                                  type="file" 
                                  accept=".pdf" 
                                  className="hidden" 
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        const updated = [...data.projects];
                                        updated[idx].pdfData = reader.result as string;
                                        updateSection('projects', updated);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }} 
                                />
                              </label>
                            ) : (
                              <div className="flex-1 flex items-center justify-between py-2 px-4 bg-blue-600/10 border border-blue-500/20 rounded-xl overflow-hidden">
                                <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                                  <FileText size={16} /> 
                                  <span className="truncate max-w-[150px]">project_doc.pdf</span>
                                </div>
                                <button 
                                  onClick={() => {
                                    if(confirm("Remove this document?")) {
                                      const updated = [...data.projects];
                                      updated[idx].pdfData = undefined;
                                      updateSection('projects', updated);
                                    }
                                  }}
                                  className="p-1 hover:bg-red-500/20 text-red-500 rounded-md transition-all"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            )}
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
               <div>
                 <h3 className="font-bold text-xl text-white">Work Experience</h3>
                 <p className="text-slate-500 text-xs">Detailed professional timeline management.</p>
               </div>
               <button 
                 onClick={() => {
                   const newExp: Experience = { 
                     id: Date.now().toString(), 
                     company: 'Company Name', 
                     role: 'Job Role', 
                     period: 'Start - End', 
                     location: 'Location', 
                     type: 'Full-time', 
                     description: ['Main achievement...'] 
                   };
                   updateSection('experience', [newExp, ...data.experience]);
                 }}
                 className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
               >
                 <Plus size={18} /> Add Experience
               </button>
             </div>

             <div className="space-y-6">
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative hover:border-emerald-500/50 transition-all shadow-xl">
                    <button 
                      onClick={() => updateSection('experience', data.experience.filter(e => e.id !== exp.id))}
                      className="absolute top-6 right-6 p-2 text-slate-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>

                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 uppercase">Role Name</label>
                             <input value={exp.role} onChange={(e) => {
                               const updated = [...data.experience];
                               updated[idx].role = e.target.value;
                               updateSection('experience', updated);
                             }} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-emerald-500 outline-none" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 uppercase">Company Name</label>
                             <input value={exp.company} onChange={(e) => {
                               const updated = [...data.experience];
                               updated[idx].company = e.target.value;
                               updateSection('experience', updated);
                             }} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-emerald-500 outline-none" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                               <label className="text-[10px] font-bold text-slate-500 uppercase">Period</label>
                               <input value={exp.period} onChange={(e) => {
                                 const updated = [...data.experience];
                                 updated[idx].period = e.target.value;
                                 updateSection('experience', updated);
                               }} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-emerald-500 outline-none" />
                             </div>
                             <div className="space-y-2">
                               <label className="text-[10px] font-bold text-slate-500 uppercase">Type</label>
                               <select value={exp.type} onChange={(e) => {
                                 const updated = [...data.experience];
                                 updated[idx].type = e.target.value as any;
                                 updateSection('experience', updated);
                               }} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-emerald-500 outline-none">
                                  <option>Full-time</option>
                                  <option>Contract</option>
                                  <option>Remote</option>
                               </select>
                             </div>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Job Description (One point per line)</label>
                          <textarea 
                            value={exp.description.join('\n')}
                            onChange={(e) => {
                               const updated = [...data.experience];
                               updated[idx].description = e.target.value.split('\n').filter(s => s.trim() !== '');
                               updateSection('experience', updated);
                            }}
                            rows={8}
                            className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-sm text-slate-300 resize-none outline-none focus:ring-1 focus:ring-emerald-500"
                            placeholder="Describe your role and achievements..."
                          />
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
               <div>
                 <h3 className="font-bold text-xl text-white">Education History</h3>
                 <p className="text-slate-500 text-xs">Academic background management.</p>
               </div>
               <button 
                 onClick={() => {
                   const newEdu: Education = { 
                     id: Date.now().toString(), 
                     institution: 'University Name', 
                     degree: 'Degree', 
                     field: 'Field of Study', 
                     period: 'Start - End', 
                     location: 'Location' 
                   };
                   updateSection('education', [newEdu, ...data.education]);
                 }}
                 className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
               >
                 <Plus size={18} /> Add Education
               </button>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.education.map((edu, idx) => (
                  <div key={edu.id} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative hover:border-purple-500/50 transition-all flex flex-col gap-6 shadow-xl">
                    <button 
                      onClick={() => updateSection('education', data.education.filter(e => e.id !== edu.id))}
                      className="absolute top-6 right-6 p-2 text-slate-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase">Institution</label>
                          <input value={edu.institution} onChange={(e) => {
                             const updated = [...data.education];
                             updated[idx].institution = e.target.value;
                             updateSection('education', updated);
                          }} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-1 focus:ring-purple-500 outline-none" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 uppercase">Degree</label>
                             <input value={edu.degree} onChange={(e) => {
                               const updated = [...data.education];
                               updated[idx].degree = e.target.value;
                               updateSection('education', updated);
                             }} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-purple-500" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 uppercase">Field of Study</label>
                             <input value={edu.field} onChange={(e) => {
                               const updated = [...data.education];
                               updated[idx].field = e.target.value;
                               updateSection('education', updated);
                             }} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-purple-500" />
                          </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 uppercase">Period</label>
                             <input value={edu.period} onChange={(e) => {
                               const updated = [...data.education];
                               updated[idx].period = e.target.value;
                               updateSection('education', updated);
                             }} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-purple-500" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-500 uppercase">Location</label>
                             <input value={edu.location} onChange={(e) => {
                               const updated = [...data.education];
                               updated[idx].location = e.target.value;
                               updateSection('education', updated);
                             }} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-purple-500" />
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div>
                <h3 className="font-bold text-xl text-white">Technical Skills</h3>
                <p className="text-slate-500 text-xs">Manage your toolkit and proficiency levels.</p>
              </div>
              <button 
                onClick={() => {
                  const newSkill: Skill = { id: Date.now().toString(), name: 'New Skill', level: 50, category: 'Frontend' };
                  updateSection('skills', [...data.skills, newSkill]);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
              >
                <Plus size={18} /> Add Skill
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.skills.map((skill, idx) => (
                <div key={skill.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col gap-6 hover:border-blue-500/50 transition-all shadow-xl">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 flex-1">
                      <input 
                        value={skill.name} 
                        onChange={(e) => {
                          const updated = [...data.skills];
                          updated[idx] = { ...skill, name: e.target.value };
                          updateSection('skills', updated);
                        }}
                        className="bg-transparent text-lg font-bold w-full border-b border-slate-800 focus:border-blue-500 focus:outline-none pb-1 text-white"
                        placeholder="Skill Name"
                      />
                      <div className="space-y-4">
                        <select 
                          value={skill.category}
                          onChange={(e) => {
                            const updated = [...data.skills];
                            updated[idx] = { ...skill, category: e.target.value as any };
                            updateSection('skills', updated);
                          }}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                        >
                          <option>Frontend</option>
                          <option>Backend</option>
                          <option>Tools</option>
                          <option>Soft Skills</option>
                        </select>
                        <div className="space-y-1">
                           <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-bold text-slate-500 uppercase">Proficiency</span>
                              <span className="text-xs font-mono text-blue-500 font-bold">{skill.level}%</span>
                           </div>
                           <input 
                             type="range" min="0" max="100" value={skill.level}
                             onChange={(e) => {
                               const updated = [...data.skills];
                               updated[idx] = { ...skill, level: parseInt(e.target.value) };
                               updateSection('skills', updated);
                             }}
                             className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                           />
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => updateSection('skills', data.skills.filter(s => s.id !== skill.id))}
                      className="ml-4 p-2 text-slate-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-bold text-xl text-white">Communication Inbox</h3>
            {data.messages.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-20 text-center text-slate-500 shadow-xl">
                <Mail size={64} className="mx-auto mb-6 opacity-20 text-blue-500" />
                <p className="text-lg">Your inbox is empty.</p>
                <p className="text-sm mt-2">New visitor messages will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.messages.map((msg) => (
                  <div key={msg.id} className={`bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col gap-6 relative transition-all shadow-xl ${!msg.isRead ? 'border-l-4 border-l-blue-600 bg-slate-900' : 'opacity-80 bg-slate-900/50'}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl ${!msg.isRead ? 'bg-blue-600' : 'bg-slate-800'}`}>
                           {msg.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-white text-lg">{msg.name}</h4>
                            {!msg.isRead && <span className="bg-blue-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded-lg shadow-lg shadow-blue-500/20">New</span>}
                          </div>
                          <p className="text-xs text-slate-500 flex items-center gap-4">
                             <span className="flex items-center gap-1"><Mail size={12} /> {msg.email}</span>
                             <span className="flex items-center gap-1"><Calendar size={12} /> {msg.date}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            const updated = data.messages.map(m => m.id === msg.id ? { ...m, isRead: !m.isRead } : m);
                            updateSection('messages', updated);
                          }}
                          className={`p-3 rounded-2xl transition-all border ${msg.isRead ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'}`}
                          title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            if(confirm("Permanently delete this message?")) {
                               updateSection('messages', data.messages.filter(m => m.id !== msg.id));
                            }
                          }}
                          className="p-3 bg-slate-800 hover:bg-red-600 border border-slate-700 hover:border-red-500 rounded-2xl text-slate-500 hover:text-white transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-4">
                       <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-800">
                          <p className="text-sm font-bold text-white mb-2 underline decoration-blue-500 underline-offset-4">Subject: {msg.subject}</p>
                          <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-10 shadow-xl">
              <section className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3 text-white">
                  <Globe size={20} className="text-blue-500" /> SEO & Discovery
                </h3>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Public Page Title</label>
                    <input 
                      value={data.settings.seoTitle} 
                      onChange={(e) => updateSection('settings', {...data.settings, seoTitle: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Search Meta Description</label>
                    <textarea 
                      value={data.settings.seoDescription} 
                      onChange={(e) => updateSection('settings', {...data.settings, seoDescription: e.target.value})}
                      rows={3}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 resize-none text-white outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </section>

              <div className="h-px bg-slate-800"></div>

              <section className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3 text-white">
                   <ShieldCheck size={20} className="text-emerald-500" /> Security & Identity
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Admin Username</label>
                      <input 
                        value={data.settings.adminUsername} 
                        onChange={(e) => updateSection('settings', {...data.settings, adminUsername: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500">New Password</label>
                      <input 
                        type="password"
                        placeholder="••••••••"
                        value={data.settings.adminPassword || ''} 
                        onChange={(e) => updateSection('settings', {...data.settings, adminPassword: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                   </div>
                </div>
              </section>

              <div className="h-px bg-slate-800"></div>

              <section className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3 text-white">
                   <Settings size={20} className="text-purple-500" /> Interface Customization
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
                        <div className="space-y-1">
                          <p className="text-sm font-bold">Interactive Elements</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Floating Balls Display</p>
                        </div>
                        <button 
                          onClick={() => updateSection('settings', {...data.settings, showInteractiveElements: !data.settings.showInteractiveElements})}
                          className={`w-12 h-6 rounded-full transition-all relative ${data.settings.showInteractiveElements ? 'bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-slate-700'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${data.settings.showInteractiveElements ? 'left-7' : 'left-1'}`}></div>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
                        <div className="space-y-1">
                          <p className="text-sm font-bold">Public Theme</p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Base Interface Style</p>
                        </div>
                        <select 
                          value={data.settings.theme}
                          onChange={(e) => updateSection('settings', {...data.settings, theme: e.target.value as any})}
                          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1 text-xs text-white outline-none"
                        >
                           <option value="dark">Dark (Black)</option>
                           <option value="light">Light (White)</option>
                        </select>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Footer Text</label>
                        <input 
                          value={data.settings.footerText} 
                          onChange={(e) => updateSection('settings', {...data.settings, footerText: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Copyright Text</label>
                        <input 
                          value={data.settings.copyrightText} 
                          onChange={(e) => updateSection('settings', {...data.settings, copyrightText: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Design Credit Text</label>
                        <input 
                          value={data.settings.designCreditText} 
                          onChange={(e) => updateSection('settings', {...data.settings, designCreditText: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white outline-none"
                        />
                      </div>
                   </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
};

const ShieldCheck = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

export default Dashboard;
