import app from "./server/index.js";
import http from "http";

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const handleError = (error) => {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const port = normalizePort(process.env.APP_PORT || 8001);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`🏁  Application is ready on ${port} 🚀🚀🚀`);
});

server.on("error", handleError);
