import { BookOpen, Trophy, Home, GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function Header() {
  const { totalScore } = useApp();
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: 'Início' },
    { to: '/units', icon: BookOpen, label: 'Aulas' },
    { to: '/progress', icon: Trophy, label: 'Progresso' },
  ];

  return (
    <header className="bg-wizard-blue text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap size={28} className="text-wizard-gold" />
          <span>Wizard English</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === to
                  ? 'bg-white/20 text-white'
                  : 'hover:bg-white/10 text-blue-100'
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
          <div className="ml-3 flex items-center gap-1.5 bg-wizard-gold text-white px-3 py-1.5 rounded-full text-sm font-bold">
            <Trophy size={14} />
            {totalScore} pts
          </div>
        </nav>
      </div>
    </header>
  );
}
