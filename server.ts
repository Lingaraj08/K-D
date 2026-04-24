import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_change_me_in_prod";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  app.post("/api/auth/register", async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name }
      });
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
      res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
      res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/k-degrees", async (req, res) => {
    const degrees = await prisma.kDegree.findMany({
      include: { courses: true }
    });
    res.json(degrees);
  });

  app.get("/api/courses/:id", async (req, res) => {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: { modules: { include: { lessons: true } } }
    });
    res.json(course);
  });

  app.get("/api/lessons/:id", async (req, res) => {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
      include: { module: { include: { course: true } } }
    });
    res.json(lesson);
  });

  app.post("/api/lessons/:id/complete", async (req, res) => {
    const { userId } = req.body;
    const lessonId = req.params.id;
    try {
      await prisma.userProgress.upsert({
        where: { userId_lessonId: { userId, lessonId } },
        update: { isCompleted: true },
        create: { userId, lessonId, isCompleted: true }
      });
      // Award XP
      await prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: 50 }, streak: { increment: 1 } }
      });
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
