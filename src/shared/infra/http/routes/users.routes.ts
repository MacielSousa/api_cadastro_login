import { CreateUserController } from "@modules/accounts/userCase/createUser/CreateUserController";
import { ProfileUserController } from "@modules/accounts/userCase/profileUserUseCase/ProfileUserController";
import { UpdateProfileUserController } from "@modules/accounts/userCase/updateProfileUser/UpdateProfileUserController";
import { UpdateUserAvatarController } from "@modules/accounts/userCase/updateUserAvatar/UpdateUserAvatarController";

import { Router } from "express";

import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);


const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();
const updateProfileUserController = new UpdateProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/avatar",
 uploadAvatar.single("avatar"),
 ensureAuthenticated, 
 updateUserAvatarController.handle
 );
 
 usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);
 usersRoutes.put("/profile", ensureAuthenticated, updateProfileUserController.handle);
 
 
export { usersRoutes };