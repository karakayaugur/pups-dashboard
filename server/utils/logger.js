import morgan from "morgan";
import chalk from "chalk";
import path from "path";
import { fnMaskQueryParams } from "./sensetive-data.js";

const skipThis = (req, res) => {
  if (!req.originalUrl.includes("/p-api/")) {
    return true;
  }
  return false;
};

morgan.token("date", function () {
  return `${new Date().toISOString()}`;
});

morgan.token("maskBody", function (req, res) {
  const body = fnMaskQueryParams(req.body);
  return JSON.stringify(body);
});

morgan.token("maskUrl", (req) => {
  const url = new URL(req.originalUrl, `https://${req.headers.host}`);
  const searchParams = new URLSearchParams(url.searchParams);

  searchParams.forEach((value, key) => {
    searchParams.set(key, "***");
  });
  url.search = searchParams.toString();
  return url.pathname + url.search;
});

morgan.token("headers", function (req) {
  const _headers = { ...req["proxy_headers"] };
  return JSON.stringify(_headers);
});

morgan.format("format", (token, req, res) => {
  return [
    chalk.hex("#ffffff")(`🏁`),
    chalk.hex("#f40a0a")(token.method(req, res)),
    chalk.hex("#ffffff")(token.status(req, res)),
    // chalk.hex("#1e90ff")(`Remote:${token["remote-addr"](req, res)}`),
    chalk.hex("#1e90ff")(`Url:${token.maskUrl(req, res)}`),
    chalk.hex("#2ed573")(token["response-time"](req, res) + "ms"),
    chalk.hex("#ffffff")("@" + token.date(req, res)),
    chalk.hex("#ffffff")("Headers" + token.headers(req, res)),
    chalk.hex("#ffffff")("Req: " + token.maskBody(req, res)),
  ].join(" ");
});

export const logger = morgan("format");
