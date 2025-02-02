import { logEvents } from "./logEvents.js";

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}, "errLog.txt`);
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
  });
};

export default errorHandler;
