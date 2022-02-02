import { ResetPasswordUserController } from "@modules/accounts/userCase/resetPasswordUser/ResetPasswordUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";


const passwordRoutes = Router();


const resetPasswordUserController = new ResetPasswordUserController();


passwordRoutes.patch("/reset", ensureAuthenticated, resetPasswordUserController.handle);



export {passwordRoutes}