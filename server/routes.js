import path from "path";
import express from "express";
import api from "./api/index.js";

const STATIC_PATH = path.join(process.cwd(), "/client/dist/pups-app/browser");

const routes = (app) => {
  app.use("/p-api/*", api);
  app.use("/e-handler", (_, res) => res.status(200).json({ status: "ok." }));
  app.get("/health-check", (_, res) => {
    res.status(200).json({ status: "Application is running..." });
  });

  app.use("/", express.static(STATIC_PATH));
  app.use("/*", express.static(STATIC_PATH));
};

export default routes;
