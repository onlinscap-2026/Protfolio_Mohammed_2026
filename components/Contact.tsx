
import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { loadPortfolioData, savePortfolioData } from '../constants';
import { VisitorMessage } from '../types';

interface ContactProps {
  theme: 'dark' | 'light';
}

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = loadPortfolioData();
    const newMessage: VisitorMessage = {
      id: Date.now().toString(),
      ...form,
      date: new Date().toLocaleDateString(),
      isRead: false
    };
    
    const updatedData = { ...data, messages: [newMessage, ...data.messages] };
    savePortfolioData(updatedData);

    setIsSubmitted(true);
    setForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className={`text-4xl font-bold mb-6 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Let's work together</h2>
            <p className={`text-lg mb-10 max-w-md leading-relaxed transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Have a project in mind? Want to chat about a potential partnership? I'm always open to discussing new ideas.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Email me</p>
                  <p className={`transition-colors ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>onlinscap@gamil.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Location</p>
                  <p className={`transition-colors ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Sana'a Yemen</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`backdrop-blur-sm border p-8 rounded-3xl relative overflow-hidden transition-all duration-300 ${
            isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
          }`}>
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 py-10">
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Message Sent!</h3>
                <p className="text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-blue-500 font-bold hover:text-blue-400"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Your Name</label>
                    <input 
                      required
                      type="text" 
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      placeholder="Mohammed Rashid"
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        isDark ? 'bg-slate-800/50 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      placeholder="onlinscap@gamil.com"
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        isDark ? 'bg-slate-800/50 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Subject</label>
                  <select 
                    value={form.subject}
                    onChange={(e) => setForm({...form, subject: e.target.value})}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none ${
                      isDark ? 'bg-slate-800/50 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <option>General Inquiry</option>
                    <option>Project Request</option>
                    <option>Collaboration</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Your Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    placeholder="Tell me about your project..."
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                      isDark ? 'bg-slate-800/50 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
                >
                  Send Message <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
