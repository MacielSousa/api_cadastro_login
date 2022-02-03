import { ResetPasswordUserController } from "@modules/accounts/userCase/resetPasswordUser/ResetPasswordUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { validationResetPassword } from "../middlewares/validationResetPassword";


const passwordRoutes = Router();


const resetPasswordUserController = new ResetPasswordUserController();


passwordRoutes.patch("/reset", validationResetPassword, ensureAuthenticated, resetPasswordUserController.handle);



export {passwordRoutes}