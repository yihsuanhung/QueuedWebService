import Joi from "joi";
import { Router } from "express";
import {
  createQueuedJob,
  getQueuedJob,
} from "queued-web-service/service/queued_job/controller.mjs";
import {
  validateBody,
  validateParams,
} from "queued-web-service/middlewares/validate.mjs";

const r = Router();

r.post(
  "/queued-job",
  validateBody(
    Joi.object({
      name: Joi.string().required().allow(""),
    })
  ),
  createQueuedJob
);
r.get(
  "/queued-job/:id",
  validateParams(Joi.object({ id: Joi.string().required() })),
  getQueuedJob
);

export default r;
