import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Layout as LayoutIcon, 
  BookOpen, 
  Trophy, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  CheckCircle2,
  Clock,
  Award
} from "lucide-react";
import { User, KDegree } from "../types";
import { motion } from "motion/react";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [degrees, setDegrees] = useState<KDegree[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/k-degrees")
      .then(res => res.json())
      .then(data => {
        setDegrees(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">K</div>
            <span className="font-bold text-xl text-slate-800 tracking-tight">K-Degree</span>
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <SidebarItem icon={<LayoutIcon size={20} />} label="Dashboard" active />
          <SidebarItem icon={<BookOpen size={20} />} label="My Degrees" />
          <SidebarItem icon={<Trophy size={20} />} label="Learning Hub" />
          <SidebarItem icon={<Award size={20} />} label="Certificates" />
        </nav>

        <div className="p-6 mt-auto border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-900 rounded-xl text-white shadow-lg">
            <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-slate-900">🔥</div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Daily Streak</p>
              <p className="text-lg font-bold">{user.streak || 0} Days</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full mt-4 flex items-center gap-3 px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="relative w-96">
            <input 
              type="text" 
              placeholder="Search your courses..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <Search size={18} className="text-slate-400 absolute left-4 top-2.5" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
              <span className="text-indigo-600 font-bold">{user.xp || 1240} XP</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-500">Active Learner</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                 <div className="w-full h-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold uppercase">
                  {user.name?.charAt(0)}
                 </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero Welcome */}
            <div className="bg-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="relative z-10 flex justify-between items-center">
                <div className="max-w-xl">
                  <h1 className="text-3xl font-bold mb-2 tracking-tight">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
                  <p className="text-indigo-100 text-lg mb-6 leading-relaxed">
                    You're making great progress in your learning path. Keep the momentum going!
                  </p>
                  <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold shadow-md hover:bg-slate-50 transition-colors">
                    Continue Learning
                  </button>
                </div>
                <div className="w-48 h-48 bg-white/10 rounded-full absolute -right-12 -top-12 blur-3xl"></div>
                <div className="hidden lg:block bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-64">
                   <p className="text-sm font-semibold opacity-80 mb-2 uppercase tracking-wide text-indigo-50">Course Progress</p>
                   <div className="flex items-end justify-between mb-2">
                     <span className="text-3xl font-bold">68%</span>
                     <span className="text-sm opacity-80">2/3 Modules</span>
                   </div>
                   <div className="w-full h-2 bg-indigo-900/40 rounded-full overflow-hidden">
                     <div className="h-full bg-amber-400 rounded-full w-[68%]"></div>
                   </div>
                </div>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Column */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Active K-Degrees</h2>
                    <button className="text-sm font-semibold text-indigo-600 hover:underline">View all</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? (
                       [1,2].map(i => <div key={i} className="h-48 bg-white border border-slate-200 rounded-xl animate-pulse"></div>)
                    ) : (
                      degrees.map(degree => (
                        <motion.div 
                          key={degree.id}
                          whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                          className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col gap-4 shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center text-3xl">💻</div>
                            <div>
                              <h3 className="font-bold text-lg text-slate-800">{degree.title}</h3>
                              <p className="text-slate-500 text-xs line-clamp-1">{degree.description}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                              <span>75% Complete</span>
                              <span>{degree.courses?.length || 0} Courses</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-600 w-3/4 rounded-full"></div>
                            </div>
                          </div>
                          <Link 
                            to={`/courses/${degree.courses[0]?.id}`}
                            className="text-center bg-indigo-50 text-indigo-600 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors mt-2"
                          >
                            Resume Learning
                          </Link>
                        </motion.div>
                      ))
                    )}
                  </div>
                </section>
              </div>

              {/* Sidebar Column (Leaderboard) */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col sticky top-8">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800">Leaderboard</h2>
                    <p className="text-xs text-slate-500">Week 42 • Diamond League</p>
                  </div>
                  <div className="p-6 space-y-5">
                    <LeaderboardItem rank={1} name="Alex Chen" xp="2,450" change="+5 slots" />
                    <LeaderboardItem rank={2} name="You" xp={`${user.xp || 1240}`} change="-1 slot" active />
                    <LeaderboardItem rank={3} name="Maria Rosa" xp="980" change="-2 slots" />
                  </div>
                  <div className="p-4 bg-slate-900 text-center">
                    <button className="text-white font-bold text-xs uppercase tracking-widest hover:text-indigo-300 transition-colors">
                      Launch Mini-Games
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-semibold ${
      active ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-500 hover:bg-slate-100"
    }`}>
      {icon}
      <span className="text-sm tracking-tight">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>}
    </button>
  );
}

function LeaderboardItem({ rank, name, xp, change, active = false }: { rank: number, name: string, xp: string, change: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
      active ? "bg-indigo-50/50 ring-1 ring-indigo-100" : ""
    }`}>
      <span className={`font-bold w-4 text-sm ${active ? "text-indigo-600" : "text-slate-300"}`}>{rank}</span>
      <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-bold text-xs ring-2 ${
        active ? "bg-indigo-200 text-indigo-700 ring-indigo-600" : "bg-slate-100 text-slate-400 ring-white"
      }`}>
        {name === "You" ? "SJ" : name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold truncate ${active ? "text-indigo-900 uppercase tracking-wide" : "text-slate-800"}`}>
          {name}
        </p>
        <p className={`text-xs ${active ? "text-indigo-700" : "text-slate-500"}`}>{xp} XP</p>
      </div>
      <div className={`text-xs font-bold ${change.startsWith('+') ? "text-emerald-500" : "text-rose-400 whitespace-nowrap"}`}>
        {change}
      </div>
    </div>
  );
}
