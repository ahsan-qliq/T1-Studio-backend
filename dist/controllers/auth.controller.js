import { registerService, loginService, refreshTokenService, logoutService, getMeService, } from "../services/auth.service.js";
export const register = async (req, res) => {
    try {
        const user = await registerService(req.body);
        res.status(201).json({ success: true, data: user });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: "Email and password are required" });
            return;
        }
        const result = await loginService(email, password);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400).json({ success: false, message: "Refresh token is required" });
            return;
        }
        const tokens = await refreshTokenService(refreshToken);
        res.status(200).json({ success: true, data: tokens });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const logout = async (req, res) => {
    try {
        await logoutService(req.user.id);
        res.status(200).json({ success: true, message: "Logged out successfully" });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
export const getMe = async (req, res) => {
    try {
        const user = await getMeService(req.user.id);
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        const err = error;
        res.status(err.statusCode || 500).json({ success: false, message: err.message });
    }
};
