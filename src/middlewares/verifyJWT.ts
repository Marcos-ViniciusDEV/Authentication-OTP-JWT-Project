import { NextFunction, Response } from "express";
import { extendedRequest } from "../types/ExtendedRequest";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req: extendedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(400).json({ error: "Acesso Negado" });
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: any) => {
    if (err) {
      res.status(500).json({ error: "Acesso Negado" });
      return;
    }
    req.userId = decoded.id;
    next();
  });
};
