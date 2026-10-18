import { createApp } from "./app.js";
import { closeDatabase, connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";

await connectDatabase();
const server = createApp().listen(env.port, () => console.log(`Northstar Helpdesk API listening on port ${env.port}`));

async function shutdown(signal) {
  console.log(`${signal}: shutting down`);
  server.close(async () => {
    await closeDatabase();
    process.exit(0);
  });
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
