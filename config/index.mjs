import dotenv from "dotenv";
dotenv.config();

function parseIntOr(v, def) {
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? def : n;
}

function load() {
  return {
    // Server
    server: {
      host: process.env.SERVER_HOST || "localhost",
      port: parseIntOr(process.env.SERVER_PORT, 4000),
    },
    // Redis
    redis: {
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      db: parseInt(process.env.REDIS_DB, 10) || 0,
      password: process.env.REDIS_PASSWORD || "",
      prefix: process.env.REDIS_PREFIX || "job_queue",
    },
    // MongoDB
    mongodb: {
      host: process.env.MONGODB_HOST || "localhost",
      port: parseInt(process.env.MONGODB_PORT, 10) || 27017,
      dbName: process.env.DEFAULT_DB_NAME || "queued-web-service",
      directConnection: process.env.MONGODB_DIRECT_CONNECTION === "true",
    },
    // Queue
    queue: {
      delayMs: parseIntOr(process.env.QUEUE_DELAY_MS, 5_000),
    },
  };
}

const config = load();

export const get = () => config;

export const reload = () => {
  Object.assign(config, load());
};
