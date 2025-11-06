import { Router } from "express";
import { ping } from "../controllers/ping";
import * as authController from "../controllers/auth";
import { privatePing } from "../controllers/private";
import { verifyJWT } from "../middlewares/verifyJWT";

export const mainRouter = Router();

mainRouter.get("/ping", ping);

mainRouter.post("/auth/signin", authController.signin);
mainRouter.post("/auth/signup", authController.signup);
mainRouter.post("/auth/useotp", authController.useOTP);
mainRouter.post("/ping", verifyJWT, privatePing);
