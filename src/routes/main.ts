import { Router } from "express";
import { ping } from "../controllers/ping";
import * as authController from "../controllers/auth";

export const mainRouter = Router();

mainRouter.get("/ping", ping);

mainRouter.post("/auth/signin", authController.signin);
mainRouter.post("/auth/signup", authController.signup);
