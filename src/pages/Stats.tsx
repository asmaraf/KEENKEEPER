import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TimelineEntry } from '../types';

interface StatsProps {
  state: {
    timeline: TimelineEntry[];
  };
}

export default function Stats({ state }: StatsProps) {
  const { timeline } = state;

  const data = [
    { name: 'Call', value: timeline.filter(t => t.type === 'Call').length },
    { name: 'Text', value: timeline.filter(t => t.type === 'Text').length },
    { name: 'Video', value: timeline.filter(t => t.type === 'Video').length },
  ].filter(d => d.value > 0);

  const COLORS = ['#1a3a32', '#9333ea', '#22c55e'];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#1a3a32] mb-12">Friendship Analytics</h1>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-12 shadow-sm border border-gray-50 min-h-[500px] flex flex-col"
      >
        <h3 className="text-lg font-bold text-[#1a3a32]/60 uppercase tracking-widest mb-12">
          By Interaction Type
        </h3>
        
        <div className="flex-grow flex items-center justify-center">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={160}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => <span className="text-sm font-bold text-gray-600 px-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 font-medium">Log some interactions to see your analytics!</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
