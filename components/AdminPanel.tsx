
import React from 'react';
import { Save, LogOut, Settings, Eye, Edit3 } from 'lucide-react';

interface AdminPanelProps {
  onLogout: () => void;
  onSave: () => void;
  hasChanges: boolean;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout, onSave, hasChanges }) => {
  return (
    <div className="fixed top-24 right-6 z-[45] flex flex-col gap-2 animate-in slide-in-from-right duration-500">
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-2xl p-2 shadow-2xl flex flex-col gap-1">
        <div className="px-3 py-2 border-b border-slate-800 mb-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin Mode</p>
        </div>
        
        <button 
          onClick={onSave}
          disabled={!hasChanges}
          className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            hasChanges 
              ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Save size={16} /> Save Changes
        </button>

        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 transition-all"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {hasChanges && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-4 py-2 rounded-xl text-[10px] font-bold uppercase text-center">
          Unsaved Changes
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
