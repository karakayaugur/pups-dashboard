"use strict";
import fetch from "node-fetch";
import xss from "xss";

const handleOptions = (req, url) => {
  const headers = {
    "content-type": req.headers["content-type"] || "application/json",
    Authorization: req.get("Authorization"),
  };

  const options = {
    method: req.method,
    headers,
  };
  if (req.method !== "GET") {
    options.body = xss(JSON.stringify(req.body));
  }
  return options;
};

async function api(req, res) {
  const url = `${process.env.APP_URL}${req.originalUrl.replace("/p-api", "")}`;
  console.log(url);
  try {
    const options = handleOptions(req, url);
    const apiRes = await fetch(url, options);
    const data = await apiRes.json();
    res.status(apiRes.status).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: "52400",
      message: "There is no API connection!",
      url,
    });
  }
}

export default api;
