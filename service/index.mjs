import { Router } from "express";
import queuedJobRouter from "queued-web-service/service/queued_job/router.mjs";

export default function registerAllRouters() {
  const router = Router();

  router.use(queuedJobRouter);

  return router;
}
