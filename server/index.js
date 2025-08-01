"use strict";

import express from "express";
import middlewares from "./settings/index.js";
import routes from "./routes.js";

const app = express();
middlewares(app);
routes(app);

export default app;
