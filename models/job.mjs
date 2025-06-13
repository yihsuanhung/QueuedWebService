import JobSchema from "queued-web-service/schemas/job.mjs";
import { createSchema, updateSchema } from "../utils/validators/queued_job.mjs";
import Joi from "joi";

/* CREATE */
export const createJob = async (jobId, name) => {
  const { error, value } = createSchema.validate({
    id: jobId,
    name,
  });
  if (error) throw new Joi.ValidationError(error.message, error.details, value);

  return JobSchema.create({
    job_id: value.id,
    name: value.name,
  });
};

/* READ */
export const getJob = async (id) => {
  return JobSchema.findById(id).lean();
};

/* READ */
export const getJobByJobId = async (jobId) => {
  return JobSchema.findOne({ job_id: jobId }).lean();
};

/* UPDATE */
export const updateJobByJobId = async (jobId, fields) => {
  const { error, value } = updateSchema.validate(fields);
  if (error) throw new Joi.ValidationError(error.message, error.details, value);

  return JobSchema.findOneAndUpdate({ job_id: jobId }, value, {
    new: true,
  });
};

/* DELETE */
export const deleteJob = async (id) => {
  return JobSchema.findByIdAndDelete(id);
};
