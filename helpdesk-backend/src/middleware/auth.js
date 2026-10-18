import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { env } from "../config/env.js";
import { AppError } from "../utils/errors.js";
import asyncHandler from "../utils/asyncHandler.js";

export const requireAuth = asyncHandler(async (request, _response, next) => {
  const token = request.headers.authorization?.startsWith("Bearer ")
    ? request.headers.authorization.slice(7)
    : null;
  if (!token) throw new AppError(401, "Authentication required.");
  let payload;
  try {
    payload = jwt.verify(token, env.jwtSecret);
  } catch {
    throw new AppError(401, "Invalid or expired token.");
  }
  const user = await User.findById(payload.sub);
  if (!user || !user.isActive) throw new AppError(401, "Account is inactive or unavailable.");
  request.user = user;
  next();
});

export function requireRoles(...roles) {
  return (request, _response, next) => {
    if (!request.user || !roles.includes(request.user.role)) return next(new AppError(403, "You do not have permission for this action."));
    next();
  };
}
