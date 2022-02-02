import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";


import createConnection from "@shared/infra/typeorm";


import swaggerFile from "../../../swagger.json";
import { router } from "./routes";



createConnection();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);


export { app }