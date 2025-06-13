import Joi from "joi";

export function validateBody(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation failed", details: error.details });
    }
    req.body = value;
    next();
  };
}

export function validateParams(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params);
    if (error) {
      return res
        .status(400)
        .json({ message: "Invalid URL parameter", details: error.details });
    }
    req.params = value;
    next();
  };
}
