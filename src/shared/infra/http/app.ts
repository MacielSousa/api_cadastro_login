import "reflect-metadata";
import upload from "@config/upload";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";
import createConnection from "@shared/infra/typeorm";
import { AppError } from "@shared/errors/AppError";


import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection();
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use(router);

app.use((err: Error, request: Request, response: Response, nex: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`
    })
});


export { app }