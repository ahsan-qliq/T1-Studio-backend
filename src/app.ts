import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import homePageRoutes from "./routes/homePage.routes.ts";
import spacesPageRoutes from "./routes/spacesPage.routes.ts";
import spaceDetailPageRoutes from "./routes/spaceDetailPage.routes.ts";
import projectPageRoutes from "./routes/projectPage.routes.ts";
import projectDetailPageRoutes from "./routes/projectDetailPage.routes.ts";
import authRoutes from "./routes/auth.routes.ts";
import { authenticate, authorizeAdmin } from "./middlewares/auth.middleware.ts";

const app = express();

/**
 * Middlewares
 */
app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

/**
 * Auth Routes (public)
 */
app.use("/api/auth", authRoutes);

/**
 * Protected Page Routes (admin only)
 */
app.use("/api/home-page", authenticate, authorizeAdmin, homePageRoutes);
app.use("/api/spaces-page", authenticate, authorizeAdmin, spacesPageRoutes);
app.use("/api/space-detail-page", authenticate, authorizeAdmin, spaceDetailPageRoutes);
app.use("/api/project-page", authenticate, authorizeAdmin, projectPageRoutes);
app.use("/api/project-detail-page", authenticate, authorizeAdmin,  projectDetailPageRoutes);

/**
 * Health Check
 */
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "T1 Studio API is running",
  });
});

export default app;
