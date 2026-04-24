import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import LessonView from "./pages/LessonView";
import Auth from "./pages/Auth";
import { User } from "./types";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth onLogin={login} />} />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard user={user} onLogout={logout} /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/courses/:id" 
          element={user ? <CourseDetail /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/lessons/:id" 
          element={user ? <LessonView /> : <Navigate to="/auth" />} 
        />
      </Routes>
    </Router>
  );
}
