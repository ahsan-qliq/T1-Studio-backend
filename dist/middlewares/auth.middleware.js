import jwt from "jsonwebtoken";
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "Access token required" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = { id: payload.id, role: payload.role };
        next();
    }
    catch {
        res.status(401).json({ success: false, message: "Invalid or expired access token" });
    }
};
export const authorizeAdmin = (req, res, next) => {
    if (req.user?.role !== "admin") {
        res.status(403).json({ success: false, message: "Admin access required" });
        return;
    }
    next();
};
