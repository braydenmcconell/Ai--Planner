
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { CalendarView } from './components/CalendarView';
import { AIInsights } from './components/AIInsights';
import { ChatInterface } from './components/ChatInterface';
import { INITIAL_SCHEDULE, INITIAL_TASKS } from './constants';
import { ScheduleItem, Task, AIActionPlan, AIReasoning } from './types';
import { gemini } from './services/geminiService';
import { Plus, Search, Filter } from 'lucide-react';

const App: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [tasks] = useState<Task[]>(INITIAL_TASKS);
  const [currentDate] = useState('Friday, Feb 13, 2026');
  
  const [loading, setLoading] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<AIReasoning | null>(null);
  const [aiActionPlan, setAiActionPlan] = useState<AIActionPlan | null>(null);

  const handleSendMessage = async (msg: string) => {
    setLoading(true);
    try {
      const response = await gemini.processRequest(msg);
      if (response.reasoning_process && response.action_plan) {
        setAiReasoning(response.reasoning_process);
        setAiActionPlan(response.action_plan);
      }
    } catch (error) {
      console.error("Failed to process message:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyOptimization = useCallback(() => {
    if (!aiActionPlan) return;

    const newItem: ScheduleItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: aiActionPlan.parameters.title,
      startTime: aiActionPlan.parameters.time,
      duration: aiActionPlan.parameters.duration,
      priority: aiActionPlan.parameters.priority,
      category: aiActionPlan.parameters.category || 'work',
      date: aiActionPlan.parameters.dueDate,
    };

    setSchedule(prev => {
      // Avoid duplicates if same title/time
      const exists = prev.find(i => i.title === newItem.title && i.startTime === newItem.startTime);
      if (exists) return prev;
      return [...prev, newItem].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    // Clear suggestion after applying
    setAiActionPlan(null);
    setAiReasoning(null);
  }, [aiActionPlan]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8 z-30">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-slate-800 border-none rounded-full py-1.5 pl-10 pr-4 text-sm w-64 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-indigo-600/20">
              <Plus className="w-4 h-4" />
              New Entry
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-12 gap-8 custom-scrollbar">
          {/* Calendar Section */}
          <section className="col-span-12 lg:col-span-7 h-[calc(100vh-160px)]">
            <CalendarView items={schedule} currentDate={currentDate} />
          </section>

          {/* AI Insights & Tasks Section */}
          <section className="col-span-12 lg:col-span-5 space-y-8">
            <AIInsights 
              reasoning={aiReasoning} 
              actionPlan={aiActionPlan} 
              onApplyAction={applyOptimization} 
            />

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Active Tasks</h3>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-md">{tasks.filter(t => !t.completed).length} Pending</span>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-800 rounded-xl hover:border-indigo-500/30 transition-all group">
                    <input 
                      type="checkbox" 
                      defaultChecked={task.completed}
                      className="w-5 h-5 rounded-md border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-600/20 transition-all"
                    />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          task.priority === 'high' ? 'text-rose-400 bg-rose-400/10' :
                          task.priority === 'medium' ? 'text-amber-400 bg-amber-400/10' :
                          'text-emerald-400 bg-emerald-400/10'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="text-[10px] text-slate-500 capitalize">{task.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Right AI Chat Sidebar */}
      <aside className="w-96 hidden xl:block sticky top-0">
        <ChatInterface onSendMessage={handleSendMessage} isLoading={loading} />
      </aside>
    </div>
  );
};

export default App;
