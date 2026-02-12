
import React from 'react';
import { ScheduleItem } from '../types';
import { Clock, Tag } from 'lucide-react';

interface CalendarViewProps {
  items: ScheduleItem[];
  currentDate: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ items, currentDate }) => {
  const hours = Array.from({ length: 15 }, (_, i) => i + 8); // 8 AM to 10 PM

  const getPositionForTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    const totalMinutesSince8 = (h - 8) * 60 + m;
    return (totalMinutesSince8 / 60) * 80; // 80px per hour
  };

  const getHeightForDuration = (duration: number) => {
    return (duration / 60) * 80;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-500/20 border-rose-500/50 text-rose-300';
      case 'medium': return 'bg-amber-500/20 border-amber-500/50 text-amber-300';
      case 'low': return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
      default: return 'bg-slate-500/20 border-slate-500/50 text-slate-300';
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-semibold">Daily Timeline</h2>
        </div>
        <span className="text-sm text-slate-400">{currentDate}</span>
      </div>

      <div className="flex-1 overflow-y-auto relative p-4 scroll-smooth">
        {/* Timeline background lines */}
        <div className="absolute inset-0 pt-4 pointer-events-none">
          {hours.map(hour => (
            <div 
              key={hour} 
              className="border-t border-slate-800/50 w-full flex items-start" 
              style={{ height: '80px' }}
            >
              <span className="text-[10px] text-slate-600 -mt-2 ml-2 font-mono">
                {hour > 12 ? `${hour - 12} PM` : `${hour} ${hour === 12 ? 'PM' : 'AM'}`}
              </span>
            </div>
          ))}
        </div>

        {/* Schedule Items */}
        <div className="relative z-10 ml-16 mr-4 h-[1200px]">
          {items.map((item) => (
            <div
              key={item.id}
              className={`absolute left-0 right-0 p-3 rounded-xl border backdrop-blur-sm transition-all hover:scale-[1.01] hover:shadow-lg hover:shadow-black/20 cursor-pointer ${getPriorityColor(item.priority)}`}
              style={{
                top: `${getPositionForTime(item.startTime)}px`,
                height: `${getHeightForDuration(item.duration)}px`,
              }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-1">
                  <span className="font-bold text-sm truncate">{item.title}</span>
                  <span className="text-[10px] opacity-80 font-mono uppercase tracking-widest">{item.startTime}</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-70 mt-auto">
                  <Tag className="w-3 h-3" />
                  <span className="text-[10px] capitalize">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
