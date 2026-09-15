import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Access token required" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as jwt.JwtPayload;
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired access token" });
  }
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ success: false, message: "Admin access required" });
    return;
  }
  next();
};
