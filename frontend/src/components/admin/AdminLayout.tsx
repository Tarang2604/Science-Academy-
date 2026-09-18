import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Trophy,
  Image as ImageIcon,
  BookOpen,
  UserCheck,
  MessageSquare,
  Film,
  FileText,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { label: 'Overview Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Enquiries & Leads', href: '/admin/leads', icon: Users },
    { label: '1-on-1 Consultations', href: '/admin/consultations', icon: CalendarCheck },
  ];

  const cmsNavItems = [
    { label: 'Results & Toppers', href: '/admin/results', icon: Trophy },
    { label: 'Gallery & Media', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Courses & Syllabus', href: '/admin/courses', icon: BookOpen },
    { label: 'Faculty Profiles', href: '/admin/faculty', icon: UserCheck },
    { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { label: 'Stories & Reels', href: '/admin/stories', icon: Film },
    { label: 'Blog & News', href: '/admin/blog', icon: FileText },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const userDisplayName = user?.email || 'Administrator';

  return (
    <div className="min-h-screen bg-slate-50/75 text-slate-900 flex flex-col lg:flex-row font-sans selection:bg-slate-900 selection:text-white">
      
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 text-slate-100 p-6 flex-shrink-0 justify-between sticky top-0 h-screen z-30 shadow-xl border-r border-slate-800">
        <div className="flex flex-col gap-8">
          
          {/* Institution Brand Identity */}
          <div className="flex items-center gap-3.5 pb-6 border-b border-slate-800/80">
            <div className="p-1 rounded-xl bg-white flex items-center justify-center shadow-md shrink-0">
              <img src="/images/logo.png" alt="Science Academy" className="h-8 w-auto object-contain" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-black text-white tracking-tight truncate">Science Academy</span>
              <span className="text-[11px] text-amber-400 font-semibold tracking-wide">Admin Control Center</span>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-220px)] pr-1 scrollbar-thin">
            <nav className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">Core Management</span>
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-amber-400" />}
                  </Link>
                );
              })}
            </nav>

            <nav className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">Content CMS</span>
              {cmsNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-amber-400" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer & Identity */}
        <div className="flex flex-col gap-3 pt-4 border-t border-slate-800/80">
          
          {/* Current User Session Badge */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Signed In As</span>
            <span className="text-xs font-bold text-slate-200 truncate" title={userDisplayName}>
              {userDisplayName}
            </span>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              View Public Website
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Navigation Header */}
      <header className="lg:hidden flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white leading-tight">Science Academy</h2>
            <span className="text-[10px] text-amber-400 font-semibold">Admin Portal</span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Modal */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex flex-col justify-end animate-fadeIn">
          <div className="bg-slate-900 border-t border-slate-800 p-6 rounded-t-2xl flex flex-col gap-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-white">Admin Menu</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Core</span>
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mt-2">Content CMS</span>
              {cmsNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-950 text-xs text-slate-300 flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400">Logged in:</span>
                <span className="font-bold text-white truncate">{userDisplayName}</span>
              </div>
              <Link
                to="/"
                target="_blank"
                className="flex items-center justify-center gap-2 py-2.5 text-xs text-slate-300 hover:text-white"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Site</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Viewport Content */}
      <main className="flex-1 flex flex-col min-w-0 p-6 md:p-10">
        <div className="max-w-7xl w-full mx-auto flex flex-col gap-8">
          
          {/* Header Title Section */}
          <div className="flex flex-col gap-1.5 pb-6 border-b border-slate-200/90">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-xs sm:text-sm text-slate-600 font-medium">{subtitle}</p>}
          </div>

          {/* Page Body Viewport */}
          <div className="w-full">{children}</div>

        </div>
      </main>

    </div>
  );
};

