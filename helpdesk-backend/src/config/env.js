import "dotenv/config";

export const env = {
  port: Number(process.env.PORT || 5001),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || "development-only-secret",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5175",
  nodeEnv: process.env.NODE_ENV || "development",
};
