import { Link, useLocation } from 'react-router-dom';
import { Home, History, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Timeline', path: '/timeline', icon: History },
    { name: 'Stats', path: '/stats', icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-tight text-[#1a3a32]">
          Keen<span className="text-[#1a3a32]/70">Keeper</span>
        </span>
      </Link>

      <div className="flex items-center gap-1">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-[#1a3a32] text-white shadow-md shadow-[#1a3a32]/20" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <link.icon size={18} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
