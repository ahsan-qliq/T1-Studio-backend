import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.JWT_ACCESS_EXPIRY || "15m";
const REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_EXPIRY || "7d";
export const generateAccessToken = (userId, role) => jwt.sign({ id: userId, role }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
export const generateRefreshToken = (userId) => jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
export const registerService = async (data) => {
    const existing = await User.findOne({ email: data.email });
    if (existing) {
        const error = new Error("Email already in use");
        error.statusCode = 409;
        throw error;
    }
    const hashed = await bcrypt.hash(data.password, 12);
    const { name, email, role } = data;
    const user = await User.create({ name, email, password: hashed, ...(role && { role }) });
    return { id: user._id, name: user.name, email: user.email, role: user.role };
};
export const loginService = async (email, password) => {
    const user = await User.findOne({ email }).select("+password +refreshToken");
    if (!user) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }
    const accessToken = generateAccessToken(String(user._id), user.role);
    const refreshToken = generateRefreshToken(String(user._id));
    user.refreshToken = refreshToken;
    await user.save();
    return {
        accessToken,
        refreshToken,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
    };
};
export const refreshTokenService = async (token) => {
    let payload;
    try {
        payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
    }
    catch {
        const error = new Error("Invalid or expired refresh token");
        error.statusCode = 401;
        throw error;
    }
    const user = await User.findById(payload.id).select("+refreshToken");
    if (!user || user.refreshToken !== token) {
        const error = new Error("Refresh token mismatch");
        error.statusCode = 401;
        throw error;
    }
    const accessToken = generateAccessToken(String(user._id), user.role);
    const newRefreshToken = generateRefreshToken(String(user._id));
    user.refreshToken = newRefreshToken;
    await user.save();
    return { accessToken, refreshToken: newRefreshToken };
};
export const logoutService = async (userId) => {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
};
export const getMeService = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return { id: user._id, name: user.name, email: user.email, role: user.role };
};
