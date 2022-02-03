import * as Yup from "yup";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";


export async function validationResetPassword(request: Request, response: Response, next: NextFunction){
    try{ 
       const body = await request.body;
       const schema = await Yup.object().shape({
        current_password: Yup.string().min(6).required(),
        new_password: Yup.string().min(6).required(),
        confirm_new_password: Yup.string().min(6).required()
       });
       await schema.validate(body);
       next();
    }catch(erro) {
        throw new AppError(erro, 401);
    }
}