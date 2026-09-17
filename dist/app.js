import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import homePageRoutes from "./routes/homePage.routes.js";
import spacesPageRoutes from "./routes/spacesPage.routes.js";
import spaceDetailPageRoutes from "./routes/spaceDetailPage.routes.js";
import projectPageRoutes from "./routes/projectPage.routes.js";
import projectDetailPageRoutes from "./routes/projectDetailPage.routes.js";
import inspirationPageRoutes from "./routes/inspirationPage.routes.js";
import whyT1PageRoutes from "./routes/whyT1Page.routes.js";
import tradePageRoutes from "./routes/tradePage.routes.js";
import aboutPageRoutes from "./routes/aboutPage.routes.js";
import contactPageRoutes from "./routes/contactPage.routes.js";
import landingPageRoutes from "./routes/landingPage.routes.js";
import blogPageRoutes from "./routes/blogPage.routes.js";
import blogDetailPageRoutes from "./routes/blogDetailPage.routes.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
const app = express();
/**
 * Middlewares
 */
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
/**
 * Auth Routes (public)
 */
app.use("/api/auth", authRoutes);
/**
 * Page Routes (GET public, POST/PATCH/DELETE admin only)
 */
app.use("/api/home-page", homePageRoutes);
app.use("/api/spaces-page", spacesPageRoutes);
app.use("/api/space-detail-page", spaceDetailPageRoutes);
app.use("/api/project-page", projectPageRoutes);
app.use("/api/project-detail-page", projectDetailPageRoutes);
app.use("/api/inspiration-page", inspirationPageRoutes);
app.use("/api/why-t1-page", whyT1PageRoutes);
app.use("/api/trade-page", tradePageRoutes);
app.use("/api/about-page", aboutPageRoutes);
app.use("/api/contact-page", contactPageRoutes);
app.use("/api/landing-page", landingPageRoutes);
app.use("/api/blog-page", blogPageRoutes);
app.use("/api/blog-detail-page", blogDetailPageRoutes);
app.use("/api/uploads", uploadRoutes);
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
