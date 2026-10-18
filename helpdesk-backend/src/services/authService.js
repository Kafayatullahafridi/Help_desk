import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { env } from "../config/env.js";
import { AppError } from "../utils/errors.js";

export async function registerUser({ name, email, password }) {
  if (await User.exists({ email })) throw new AppError(409, "An account with this email already exists.");
  const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) });
  return createSession(user);
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !user.isActive || !(await bcrypt.compare(password, user.passwordHash))) throw new AppError(401, "Invalid email or password.");
  return createSession(user);
}

function createSession(user) {
  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, env.jwtSecret, { expiresIn: "8h" });
  return { token, user: user.toSafeObject() };
}
