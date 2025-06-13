import Joi from "joi";

export const createSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(1).required().allow(""),
});

export const updateSchema = Joi.object({
  status: Joi.string().valid("queued", "completed", "failed"),
}).or("status");
