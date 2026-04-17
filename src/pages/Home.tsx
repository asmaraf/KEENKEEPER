import { motion } from 'motion/react';
import { Plus, Users, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Friend } from '../types';
import { cn } from '../lib/utils';

interface HomeProps {
  state: {
    friends: Friend[];
    loading: boolean;
    timeline: any[];
  };
}

export default function Home({ state }: HomeProps) {
  const { friends, loading, timeline } = state;

  const stats = [
    { label: 'Total Friends', value: friends.length, icon: Users, color: 'text-blue-600' },
    { label: 'On Track', value: friends.filter(f => f.status === 'on-track').length, icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Need Attention', value: friends.filter(f => f.status !== 'on-track').length, icon: AlertCircle, color: 'text-red-600' },
    { label: 'Interactions This Month', value: timeline.length, icon: MessageSquare, color: 'text-indigo-600' },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#1a3a32] border-t-transparent rounded-full"
        />
        <p className="mt-4 text-gray-500 font-medium">Loading your connections...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Banner */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-[#1a3a32] mb-4 bg-clip-text">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="bg-[#1a3a32] text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto hover:bg-[#1a3a32]/90 transition-all shadow-lg shadow-[#1a3a32]/20 active:scale-95">
          <Plus size={20} />
          Add a Friend
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-md transition-shadow"
          >
            <span className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</span>
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest leading-none">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Friends Grid */}
      <div>
        <h2 className="text-2xl font-bold text-[#1a3a32] mb-8">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {friends.map((friend, i) => (
            <FriendCard key={friend.id} friend={friend} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface FriendCardProps {
  friend: Friend;
  index: number;
}

function FriendCard({ friend, index }: FriendCardProps) {
  const statusColors = {
    'on-track': 'bg-green-100 text-green-700',
    'almost due': 'bg-orange-100 text-orange-700',
    'overdue': 'bg-red-100 text-red-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link 
        to={`/friend/${friend.id}`}
        className="block bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img 
              src={friend.picture} 
              alt={friend.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 group-hover:border-[#1a3a32]/10 transition-colors" 
            />
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-1">{friend.name}</h3>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            {friend.days_since_contact}d ago
          </p>
          
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {friend.tags.map(tag => (
              <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-gray-50 text-gray-500 rounded-lg">
                {tag}
              </span>
            ))}
          </div>
          
          <span className={cn(
            "text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full",
            statusColors[friend.status]
          )}>
            {friend.status}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
