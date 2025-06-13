import path from "path";
import { fileURLToPath } from "url";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export const getSwaggerServer = () => swaggerUi.serve;
export const getSwaggerSetup = () => {
  const __dir = path.dirname(fileURLToPath(import.meta.url));

  const spec = swaggerJsdoc({
    definition: {
      openapi: "3.0.0",
      info: { title: "Queued Web Service API", version: "1.0.0" },
    },
    apis: [path.join(__dir, "../service/**/swagger.mjs")],
  });

  return swaggerUi.setup(spec);
};
