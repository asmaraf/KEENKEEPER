import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FriendDetail from './pages/FriendDetail';
import Timeline from './pages/Timeline';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';
import { useAppState } from './lib/useAppState';

export default function App() {
  const state = useAppState();

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#f8f9fa] font-sans text-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home state={state} />} />
            <Route path="/friend/:id" element={<FriendDetail state={state} />} />
            <Route path="/timeline" element={<Timeline state={state} />} />
            <Route path="/stats" element={<Stats state={state} />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}
