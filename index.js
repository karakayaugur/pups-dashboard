import app from "./server/index.js";
import http from "http";

const port = normalizePort(process.env.APP_PORT || 8001);
const server = http.createServer(app);

const startServer = () => {
  server.listen(port, function () {
    console.log(`🏁  Application is ready on ${port}'  🚀🚀🚀`);
  });
  server.on("error", onError);
};

setImmediate(startServer);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
