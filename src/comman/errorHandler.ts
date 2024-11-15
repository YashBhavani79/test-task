import * as express from "express";

const respond = (
  res: express.Response,
  req: express.Request,
  values: any,
  error: boolean = false,
  message: string = "",
  code: number = 200
): void => {
  if (req.get("origin")) {
    res.set("Access-Control-Allow-Origin", req.get("origin"));
  }
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  res.status(code);
  res.json({
    data: values,
    error: error,
    message: message
  });
};

const sendSuccess = (
  res: express.Response,
  req: express.Request,
  data: any,
  message: string
): void => {
  respond(res, req, data, false, message);
};

const sendError = (
  res: express.Response,
  req: express.Request,
  message: string,
  code: number
): void => {
  respond(res, req, undefined, true, message, code);
};

export { sendSuccess, sendError };
