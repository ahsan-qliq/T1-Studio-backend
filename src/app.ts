import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import homePageRoutes from "./routes/homePage.routes.ts";
import spacesPageRoutes from "./routes/spacesPage.routes.ts";
import spaceDetailPageRoutes from "./routes/spaceDetailPage.routes.ts";

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
 * Routes
 */
app.use("/api/home-page", homePageRoutes);
app.use("/api/spaces-page", spacesPageRoutes);
app.use("/api/space-detail-page", spaceDetailPageRoutes);

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