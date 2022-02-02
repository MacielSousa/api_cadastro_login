import { AthenticateUserUseController } from "@modules/accounts/userCase/authenticateUser/AthenticateUserUseController";
import { RefreshTokenController } from "@modules/accounts/userCase/refreshToken/RefreshTokenController";
import { Router } from "express";


const authenticateRoutes = Router();

const refreshTokenController = new RefreshTokenController();
const authenticateUserController = new AthenticateUserUseController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes }