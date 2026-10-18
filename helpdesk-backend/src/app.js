import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler, notFound } from "./utils/errors.js";

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: env.clientUrl }));
  app.use(express.json({ limit: "1mb" }));
  app.use("/api/auth", rateLimit({ windowMs: 15 * 60 * 1000, limit: 50 }), authRoutes);
  app.get("/api/health", (_request, response) => response.json({ success: true, service: "northstar-helpdesk-api", status: "ok" }));
  app.use("/api/tickets", ticketRoutes);
  app.use("/api/admin", adminRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
