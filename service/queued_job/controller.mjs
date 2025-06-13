import Joi from "joi";
import JobQueue from "queued-web-service/utils/queue/job_queue.mjs";
import * as JobModel from "queued-web-service/models/job.mjs";
import { JobStatus } from "queued-web-service/utils/queue/job_queue.mjs";

export const createQueuedJob = async (req, res) => {
  const { name } = req.body || {};
  try {
    const jobId = await JobQueue.addJob({ name });
    await JobModel.createJob(jobId, name);
    res.status(202).json({ jobId });
  } catch (err) {
    if (err instanceof Joi.ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "server error" });
  }
};

export const getQueuedJob = async (req, res) => {
  const { id } = req.params;

  const doc = await JobModel.getJobByJobId(id);

  if (!doc) {
    return res.status(404).json({ status: JobStatus.NOT_FOUND });
  }

  const respObj = {
    status: doc.status,
  };

  if (doc.status === JobStatus.COMPLETED || doc.status === JobStatus.FAILED) {
    respObj.name = doc.name;
  }

  console.log(respObj);

  res.set("Cache-Control", "no-store");
  res.json(respObj);
};
