import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { logger } from "../utils/logger.js";

const middlewares = (app) => {
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser("uck83gf696rgsuck"));
  app.use(bodyParser.json({ type: "application/json", limit: "15mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "15mb" }));
  // app.use(logger);
};

export default middlewares;
