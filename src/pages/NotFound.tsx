import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-9xl font-black text-gray-100 mb-4 block">404</span>
        <h1 className="text-3xl font-bold text-[#1a3a32] mb-4">Page Not Found</h1>
        <p className="text-gray-500 max-w-md mx-auto mb-12">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="bg-[#1a3a32] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto w-fit hover:shadow-lg transition-all active:scale-95"
        >
          <Home size={20} />
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
