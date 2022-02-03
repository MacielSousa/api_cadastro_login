import * as Yup from "yup";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";


export async function validationProfile(request: Request, response: Response, next: NextFunction){
    try{ 
       const body = await request.body;
       const schema = await Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
       });
       await schema.validate(body);
       next();
    }catch(erro) {
        throw new AppError(erro, 401);
    }
}