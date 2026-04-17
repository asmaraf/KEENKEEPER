import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, Video, Filter, ChevronDown } from 'lucide-react';
import { TimelineEntry } from '../types';
import { cn, formatDate } from '../lib/utils';

interface TimelineProps {
  state: {
    timeline: TimelineEntry[];
  };
}

export default function Timeline({ state }: TimelineProps) {
  const { timeline } = state;
  const [filter, setFilter] = useState<TimelineEntry['type'] | 'All'>('All');

  const filteredTimeline = timeline.filter(entry => 
    filter === 'All' ? true : entry.type === filter
  );

  const interactionIcons = {
    'Call': Phone,
    'Text': MessageSquare,
    'Video': Video,
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h1 className="text-4xl font-bold text-[#1a3a32]">Timeline</h1>
        
        <div className="relative group">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="appearance-none bg-white border border-gray-200 px-6 py-3 pr-10 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#1a3a32]/20 cursor-pointer shadow-sm min-w-[180px]"
          >
            <option value="All">All interactions</option>
            <option value="Call">Calls only</option>
            <option value="Text">Texts only</option>
            <option value="Video">Video calls only</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <Filter size={16} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredTimeline.length > 0 ? (
            filteredTimeline.map((entry, i) => {
              const Icon = interactionIcons[entry.type];
              return (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-md transition-all sm:pr-12"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center text-[#1a3a32] shrink-0 border border-gray-100 group-hover:bg-[#1a3a32] group-hover:text-white transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {entry.type} <span className="text-gray-400 font-medium">with</span> {entry.friendName}
                    </h3>
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mt-1">
                      {formatDate(entry.date)}
                    </p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">No interactions found for this filter.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
