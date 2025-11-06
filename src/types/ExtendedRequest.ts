import { Request } from "express";

export type extendedRequest = Request & {
  userId?: number;
};
