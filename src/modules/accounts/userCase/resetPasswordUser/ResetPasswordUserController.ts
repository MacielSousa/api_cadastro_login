import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";



class ResetPasswordUserController {

    async handle(request: Request, response: Response): Promise<Response>{
       const { id } = request.user;
       const {current_password, new_password, confirm_new_password} = request.body;

       const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase);

       await resetPasswordUserUseCase.execute({user_id: id, current_password, new_password, confirm_new_password});

       return response.send();
    }

}

export { ResetPasswordUserController }