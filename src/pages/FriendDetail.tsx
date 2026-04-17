import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Video, Clock, Target, Calendar, Edit2, Archive, Trash2, BellOff } from 'lucide-react';
import { toast } from 'sonner';
import { Friend } from '../types';
import { cn, formatDate } from '../lib/utils';

interface FriendDetailProps {
  state: {
    friends: Friend[];
    addInteraction: (friend: Friend, type: any) => void;
  };
}

export default function FriendDetail({ state }: FriendDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { friends, addInteraction } = state;
  
  const friend = friends.find(f => f.id === Number(id));

  if (!friend) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Friend not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="text-[#1a3a32] font-semibold hover:underline"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleCheckIn = (type: 'Call' | 'Text' | 'Video') => {
    addInteraction(friend, type);
    toast.success(`${type} with ${friend.name} logged successfully!`, {
      description: `Interaction added to your timeline on ${new Date().toLocaleDateString()}.`
    });
  };

  const statusColors = {
    'on-track': 'bg-green-100 text-green-700',
    'almost due': 'bg-orange-100 text-orange-700',
    'overdue': 'bg-red-100 text-red-700',
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Info Card */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center"
          >
            <img 
              src={friend.picture} 
              alt={friend.name}
              referrerPolicy="no-referrer"
              className="w-32 h-32 rounded-full mx-auto object-cover mb-6 border-4 border-gray-50" 
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{friend.name}</h1>
            
            <div className="flex justify-center gap-2 mb-4">
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full",
                statusColors[friend.status]
              )}>
                {friend.status}
              </span>
              {friend.tags.map(tag => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 bg-gray-50 text-gray-400 rounded-full border border-gray-100">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-500 italic text-sm mb-4 leading-relaxed">
              "{friend.bio}"
            </p>
            
            <p className="text-sm font-medium text-gray-400 mb-8 select-all">
              Preferred: {friend.email}
            </p>

            <div className="space-y-3 pt-6 border-t border-gray-50">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                <BellOff size={18} /> Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                <Archive size={18} /> Archive
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-100 text-red-600 font-semibold hover:bg-red-50 transition-colors">
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Days Since Contact', value: friend.days_since_contact, icon: Clock },
              { label: 'Goal (Days)', value: friend.goal, icon: Target },
              { label: 'Next Due', value: formatDate(friend.next_due_date), icon: Calendar },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center"
              >
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Relationship Goal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold text-[#1a3a32] mb-1">Relationship Goal</h3>
              <p className="text-gray-500 text-sm">
                Connect every <span className="font-bold text-gray-900">{friend.goal} days</span>
              </p>
            </div>
            <button className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-[#1a3a32] hover:bg-gray-100 transition-all">
              <Edit2 size={18} />
            </button>
          </motion.div>

          {/* Quick Check-In */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50"
          >
            <h3 className="text-lg font-bold text-[#1a3a32] mb-6">Quick Check-In</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                onClick={() => handleCheckIn('Call')}
                className="flex flex-col items-center gap-3 p-8 rounded-2xl bg-gray-50 hover:bg-[#1a3a32] hover:text-white transition-all group border border-gray-100"
              >
                <Phone size={32} className="text-[#1a3a32] group-hover:text-white transition-colors" />
                <span className="font-bold tracking-wide uppercase text-xs">Call</span>
              </button>
              <button 
                onClick={() => handleCheckIn('Text')}
                className="flex flex-col items-center gap-3 p-8 rounded-2xl bg-gray-50 hover:bg-[#1a3a32] hover:text-white transition-all group border border-gray-100"
              >
                <MessageSquare size={32} className="text-[#1a3a32] group-hover:text-white transition-colors" />
                <span className="font-bold tracking-wide uppercase text-xs">Text</span>
              </button>
              <button 
                onClick={() => handleCheckIn('Video')}
                className="flex flex-col items-center gap-3 p-8 rounded-2xl bg-gray-50 hover:bg-[#1a3a32] hover:text-white transition-all group border border-gray-100"
              >
                <Video size={32} className="text-[#1a3a32] group-hover:text-white transition-colors" />
                <span className="font-bold tracking-wide uppercase text-xs">Video</span>
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
