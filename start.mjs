import http from "http";
import { buildApp } from "queued-web-service/server.mjs";
import { get as getConfig } from "queued-web-service/config/index.mjs";
import redis from "queued-web-service/utils/redis/redis_client.mjs";
import JobQueue from "queued-web-service/utils/queue/job_queue.mjs";
import {
  initMongoose,
  closeMongoose,
} from "queued-web-service/db/mongoose.mjs";

export async function start() {
  try {
    await redis.ping();
    console.log("Redis connected");
    await JobQueue.init();
  } catch (err) {
    console.error("Redis connect failed:", err);
    process.exit(1);
  }

  await initMongoose();

  const app = buildApp();
  const { host, port } = getConfig().server;

  const server = http.createServer(app).listen(port, () => {
    console.log(`Server running on ${host}:${port}`);
    console.log(`API Docs running on ${host}:${port}/api-docs`);
  });

  process.on("SIGINT", async () => {
    await redis.quit();
    await JobQueue.close();
    await closeMongoose();
    server.close(() => process.exit(0));
  });
}
