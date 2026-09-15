import { Router } from "express";
import { register, login, refresh, logout, getMe } from "../controllers/auth.controller.ts";
import { authenticate } from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);

export default router;
