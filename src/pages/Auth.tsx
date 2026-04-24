import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { GraduationCap, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { User } from "../types";

interface AuthProps {
  onLogin: (user: User, token: string) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      
      onLogin(data.user, data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden"
      >
        <div className="p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600"></div>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-indigo-100 uppercase">K</div>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Welcome to K-Degree</h2>
          <p className="text-slate-500 font-medium">
            {isLogin ? "Enter your details to continue" : "Start your path to mastery today"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-10 pb-10 space-y-5">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-red-50 text-red-600 text-sm font-semibold rounded-xl border border-red-100 flex items-center gap-2"
            >
              <div className="w-1 h-1 bg-red-600 rounded-full"></div>
              {error}
            </motion.div>
          )}

          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <UserIcon size={18} className="absolute left-4 top-3.5 text-slate-400" />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
            <div className="relative">
              <input
                required
                type="email"
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all font-medium"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Mail size={18} className="absolute left-4 top-3.5 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between pl-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
              {isLogin && <button type="button" className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline">Forgot?</button>}
            </div>
            <div className="relative">
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 outline-none transition-all font-medium"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Lock size={18} className="absolute left-4 top-3.5 text-slate-400" />
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-indigo-100"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? "Sign In" : "Get Started")}
          </button>

          <div className="pt-2 text-center text-sm font-medium text-slate-500">
            {isLogin ? "New to the platform?" : "Joined us before?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4"
            >
              {isLogin ? "Create Account" : "Log In"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
