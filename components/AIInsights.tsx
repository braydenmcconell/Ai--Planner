
import React from 'react';
import { AIActionPlan, AIReasoning } from '../types';
import { Brain, Sparkles, AlertCircle, CheckCircle2, ListTodo } from 'lucide-react';

interface AIInsightsProps {
  reasoning: AIReasoning | null;
  actionPlan: AIActionPlan | null;
  onApplyAction: () => void;
}

export const AIInsights: React.FC<AIInsightsProps> = ({ reasoning, actionPlan, onApplyAction }) => {
  if (!reasoning || !actionPlan) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center opacity-50">
        <Sparkles className="w-12 h-12 text-indigo-500 mb-4 animate-pulse" />
        <p className="text-slate-400">Flux is waiting for your next request to provide reasoning and scheduling insights.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 bg-indigo-600/10 border-b border-indigo-500/20 flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-400" />
          <h2 className="font-semibold text-indigo-300">AI Reasoning Engine</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-3 rounded-xl">
              <span className="text-xs text-slate-500 uppercase block mb-1">Detected Intent</span>
              <p className="text-sm font-medium text-slate-300">{reasoning.intent_analysis}</p>
            </div>
            <div className="bg-slate-800/50 p-3 rounded-xl">
              <span className="text-xs text-slate-500 uppercase block mb-1">Priority Analysis</span>
              <p className="text-sm font-medium text-rose-400">{reasoning.extracted_information.priority} Priority</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-slate-400 leading-relaxed">
                <span className="text-slate-200 font-medium">Constraints:</span> {reasoning.scheduling_considerations}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/30 rounded-2xl overflow-hidden">
        <div className="p-4 bg-indigo-600/20 border-b border-indigo-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="font-semibold text-white">Suggested Action</h2>
          </div>
          <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">Recommended</span>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{actionPlan.parameters.title}</h3>
              <p className="text-indigo-300/80 text-sm">{actionPlan.reasoning}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 py-4 border-y border-slate-700/50 my-4">
            <div className="text-center px-4">
              <span className="text-[10px] text-slate-500 uppercase block">Start Time</span>
              <span className="text-lg font-mono text-white">{actionPlan.parameters.time}</span>
            </div>
            <div className="w-px h-8 bg-slate-700/50" />
            <div className="text-center px-4">
              <span className="text-[10px] text-slate-500 uppercase block">Duration</span>
              <span className="text-lg font-mono text-white">{actionPlan.parameters.duration}m</span>
            </div>
            <div className="w-px h-8 bg-slate-700/50" />
            <div className="text-center px-4">
              <span className="text-[10px] text-slate-500 uppercase block">Date</span>
              <span className="text-lg font-mono text-white">{actionPlan.parameters.dueDate}</span>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <p className="text-xs text-slate-500 uppercase mb-2 flex items-center gap-2">
              <ListTodo className="w-3 h-3" /> Enhancements
            </p>
            {actionPlan.additional_suggestions.map((suggestion, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={onApplyAction}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            Apply Optimization
          </button>
        </div>
      </div>
    </div>
  );
};
