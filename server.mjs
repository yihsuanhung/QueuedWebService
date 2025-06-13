import express from "express";
import cors from "cors";
import registerAllRouters from "queued-web-service/service/index.mjs";
import {
  logger,
  getSwaggerServer,
  getSwaggerSetup,
} from "queued-web-service/middlewares/index.mjs";

export function buildApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(logger());
  app.use("/api", registerAllRouters());
  app.use("/api-docs", getSwaggerServer(), getSwaggerSetup());

  return app;
}
