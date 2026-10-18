import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";

test("health endpoint reports the API status", async () => {
  const server = createApp().listen(0);
  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/api/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      success: true,
      service: "northstar-helpdesk-api",
      status: "ok",
    });
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
