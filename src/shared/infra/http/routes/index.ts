import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";
import { passwordRoutes } from "./password.routes";


const router = Router();


router.use("/users", usersRoutes);
router.use('/password', passwordRoutes);
router.use(authenticateRoutes);

export { router }