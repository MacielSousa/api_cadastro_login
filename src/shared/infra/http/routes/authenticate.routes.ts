import { AthenticateUserUseController } from "@modules/accounts/userCase/authenticateUser/AthenticateUserUseController";
import { Router } from "express";


const authenticateRoutes = Router();

const authenticateUserController = new AthenticateUserUseController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateRoutes }