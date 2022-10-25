import { serve, setup } from "swagger-ui-express";
import swaggerFile from "../../swagger_output.json";

export default function (app, prefix) {
  prefix = prefix || "";

  app.use(prefix + "/api-docs", serve, setup(swaggerFile));
}
