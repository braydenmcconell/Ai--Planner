
import React from 'react';
import { Calendar, CheckSquare, Settings, LayoutDashboard, BrainCircuit, Zap } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Calendar, label: 'Calendar', active: false },
    { icon: CheckSquare, label: 'Tasks', active: false },
    { icon: BrainCircuit, label: 'Insights', active: false },
    { icon: Zap, label: 'Workflows', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">Flux AI</h1>
      </div>
      
      <nav className="flex-1 px-4 py-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              item.active 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-br from-indigo-900/40 to-slate-800 rounded-xl p-4 border border-indigo-500/20">
          <p className="text-xs text-indigo-300 font-semibold mb-2 uppercase tracking-wider">Pro Tip</p>
          <p className="text-sm text-slate-300">Type "Schedule Deep Work" to auto-block focus time.</p>
        </div>
      </div>
    </aside>
  );
};
