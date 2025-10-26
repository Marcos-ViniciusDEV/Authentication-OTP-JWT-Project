import { RequestHandler } from "express";

export const ping: RequestHandler = (req, res) => {
  res.json({ ping: "pong" });
};
