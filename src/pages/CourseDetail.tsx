import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, PlayCircle, Lock, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";
import { Course, Module, Lesson } from "../types";
import { motion } from "motion/react";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(data => {
        setCourse(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!course) return <div className="flex items-center justify-center h-screen">Course not found</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Course Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-8 py-12">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:underline">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{course.title}</h1>
          <p className="text-slate-600 text-lg max-w-3xl mb-8">{course.description}</p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500">
              <BookOpen size={20} />
              <span className="font-medium">{course.modules?.length || 0} Modules</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <PlayCircle size={20} />
              <span className="font-medium">{course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0)} Lessons</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <CheckCircle2 size={20} />
              <span>Full Degree Credit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-5xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Course Curriculum</h2>
        
        <div className="space-y-6">
          {course.modules?.map((module, index) => (
            <div key={module.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
              <div className="p-6 bg-slate-50/50 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Module {index + 1}</p>
                  <h3 className="text-xl font-bold text-slate-900">{module.title}</h3>
                </div>
                <div className="text-xs font-bold text-slate-400">
                  {module.lessons?.length || 0} Lessons
                </div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {module.lessons?.map((lesson, lIdx) => (
                  <Link 
                    key={lesson.id}
                    to={`/lessons/${lesson.id}`}
                    className="p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
                      <PlayCircle size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-900 font-medium">{lesson.title}</p>
                      <p className="text-xs text-slate-400">Video Lesson</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
