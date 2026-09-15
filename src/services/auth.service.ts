import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { UserRole } from "../models/user.model.ts";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_TOKEN_EXPIRY = process.env.JWT_ACCESS_EXPIRY || "15m";
const REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_EXPIRY || "7d";

export const generateAccessToken = (userId: string, role: string) =>
  jwt.sign({ id: userId, role }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY } as jwt.SignOptions);

export const generateRefreshToken = (userId: string) =>
  jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY } as jwt.SignOptions);

export const registerService = async (data: { name: string; email: string; password: string; role?: UserRole }) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    const error = new Error("Email already in use") as Error & { statusCode: number };
    error.statusCode = 409;
    throw error;
  }

  const hashed = await bcrypt.hash(data.password, 12);
  const { name, email, role } = data;
  const user = await User.create({ name, email, password: hashed, ...(role && { role }) });

  return { id: user._id, name: user.name, email: user.email, role: user.role };
};

export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password +refreshToken");
  if (!user) {
    const error = new Error("Invalid credentials") as Error & { statusCode: number };
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid credentials") as Error & { statusCode: number };
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

export const refreshTokenService = async (token: string) => {
  let payload: jwt.JwtPayload;

  try {
    payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;
  } catch {
    const error = new Error("Invalid or expired refresh token") as Error & { statusCode: number };
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findById(payload.id).select("+refreshToken");
  if (!user || user.refreshToken !== token) {
    const error = new Error("Refresh token mismatch") as Error & { statusCode: number };
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken(String(user._id), user.role);
  const newRefreshToken = generateRefreshToken(String(user._id));

  user.refreshToken = newRefreshToken;
  await user.save();

  return { accessToken, refreshToken: newRefreshToken };
};

export const logoutService = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

export const getMeService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found") as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return { id: user._id, name: user.name, email: user.email, role: user.role };
};
