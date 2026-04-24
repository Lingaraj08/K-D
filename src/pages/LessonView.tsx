import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft, Award, Trophy } from "lucide-react";
import { Lesson } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function LessonView() {
  const { id } = useParams();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/lessons/${id}`)
      .then(res => res.json())
      .then(data => {
        setLesson(data);
        setLoading(false);
      });
  }, [id]);

  const handleComplete = async () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return;
    const user = JSON.parse(userStr);

    try {
      await fetch(`/api/lessons/${id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id })
      });
      setIsCompleted(true);
      setShowQuiz(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!lesson) return <div className="flex items-center justify-center h-screen">Lesson not found</div>;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Lesson Topbar */}
      <header className="h-16 border-b border-slate-200 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/courses/${lesson.module.course.id}`} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <ArrowLeft size={20} />
          </Link>
          <div className="border-l border-slate-200 pl-4">
            <p className="text-xs font-bold text-slate-400 uppercase">{lesson.module.course.title} • {lesson.module.title}</p>
            <h1 className="font-bold text-slate-900">{lesson.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
            <Award size={18} /> Resources
          </button>
          {!isCompleted ? (
            <button 
              onClick={handleComplete}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              Mark as Complete
            </button>
          ) : (
            <div className="flex items-center gap-2 text-emerald-600 font-bold px-4 py-2 border border-emerald-100 bg-emerald-50 rounded-xl">
              <CheckCircle2 size={18} />
              <span>Completed</span>
            </div>
          )}
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 bg-black flex flex-col relative">
          <AnimatePresence>
            {showQuiz ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-10 bg-slate-900/95 flex items-center justify-center p-8"
              >
                <div className="bg-white w-full max-w-xl rounded-3xl p-10 text-center">
                  <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Lesson Mastered!</h2>
                  <p className="text-slate-500 mb-8">You've earned +50 XP and 1 streak point. Ready for a quick check?</p>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => navigate("/dashboard")}
                      className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                    >
                      Continue to Next Lesson
                    </button>
                    <button 
                      onClick={() => setShowQuiz(false)}
                      className="w-full text-slate-500 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all"
                    >
                      Review Content
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <iframe
                className="w-full h-full"
                src={lesson.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar (Optional: Notes/Course List) */}
        <div className="w-80 border-l border-slate-200 overflow-y-auto p-6 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Lesson Notes</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            In this lesson, we explore the core foundations of the subject. Pay close attention to the concepts of modularity and scalability as they apply to real-world engineering.
          </p>
          
          <div className="mt-8 border-t border-slate-200 pt-8">
            <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-widest">Next Up</h4>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <PlayCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-tight">Advanced Paradigms</p>
                <p className="text-xs text-slate-400">7 mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayCircle({ size }: { size: number }) {
  return <PlayCircleIcon size={size} />;
}
import { PlayCircle as PlayCircleIcon } from "lucide-react";
