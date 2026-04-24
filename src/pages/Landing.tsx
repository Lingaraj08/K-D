import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { BookOpen, Trophy, GraduationCap, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100 uppercase">K</div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">K-Degree Pro</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/auth" className="text-slate-500 hover:text-indigo-600 font-semibold text-sm">Log in</Link>
          <Link to="/auth" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-8 pt-24 pb-32 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-50 rounded-full -z-10 blur-3xl opacity-50"></div>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          V3.0 Now Live • Structured Learning Paths
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-8"
        >
          The Premium Way to <br />
          <span className="text-indigo-600">Earn Your K-Degree</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Master complex skills through structured, university-grade learning programs. Earn XP, track streaks, and get certified.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link to="/auth" className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 group">
            Start Learning Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-10 py-5 rounded-2xl font-bold text-lg text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all">
            Browse Curriculum
          </button>
        </motion.div>
      </header>

      {/* Stats/Features */}
      <section className="bg-slate-50 py-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Structured Learning</h3>
            <p className="text-slate-600">Hierarchical learning paths from basic to advanced levels in a single program.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Gamified XP</h3>
            <p className="text-slate-600">Earn points, track streaks, and climb the leaderboard as you master new skills.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Industry Degrees</h3>
            <p className="text-slate-600">Get certified with verified K-Degrees that show your depth of knowledge.</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">Trusted by learners from around the world</h2>
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
          <span className="text-2xl font-bold">COURSERA</span>
          <span className="text-2xl font-bold">UDEMY</span>
          <span className="text-2xl font-bold">LINKEDIN</span>
          <span className="text-2xl font-bold">GOOGLE</span>
          <span className="text-2xl font-bold">MIT</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-2xl">
            <GraduationCap size={32} className="text-indigo-400" />
            <span>K-Degree Pro</span>
          </div>
          <p className="text-slate-400">© 2026 K-Degree Pro Learning Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
