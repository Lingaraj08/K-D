export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  xp: number;
  streak: number;
}

export interface KDegree {
  id: string;
  title: string;
  description: string;
  courses: Course[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl?: string;
  content?: string;
  order: number;
}
