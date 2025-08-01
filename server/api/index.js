import fetch from "node-fetch";
import xss from "xss";

const buildHeaders = (req) => ({
  "content-type": req.headers["content-type"] || "application/json",
  Authorization: req.get("Authorization"),
});

const buildOptions = (req) => {
  const options = {
    method: req.method,
    headers: buildHeaders(req),
  };
  if (req.method !== "GET") {
    options.body = xss(JSON.stringify(req.body));
  }
  return options;
};

const getApiUrl = (req) =>
  `${process.env.APP_URL}${req.originalUrl.replace("/p-api", "")}`;

const api = async (req, res) => {
  const url = getApiUrl(req);
  console.log(url);
  try {
    const options = buildOptions(req);
    const response = await fetch(url, options);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: "52400",
      message: "There is no API connection!",
      url,
    });
  }
};

export default api;
