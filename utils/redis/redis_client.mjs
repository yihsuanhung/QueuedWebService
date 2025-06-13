import Redis from "ioredis";
import { get as getCfg } from "queued-web-service/config/index.mjs";

const cfg = getCfg().redis;

const redis = new Redis({
  host: cfg.host,
  port: cfg.port,
  db: cfg.db,
  password: cfg.password,
  keyPrefix: cfg.prefix ? `${cfg.prefix}:` : undefined,
});

export default redis;
