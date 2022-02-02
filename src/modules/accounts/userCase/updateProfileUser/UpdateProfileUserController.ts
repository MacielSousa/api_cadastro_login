import {Response, Request} from "express";
import { container } from "tsyringe";
import { UpdateProfileUserUseCase } from "./UpdateProfileUserUseCase";



class UpdateProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.user
        const {name, email} = request.body;

        const updateProfileUserUseCase = container.resolve(UpdateProfileUserUseCase);

        await updateProfileUserUseCase.execute({user_id: id, name, email});

        return response.status(200).send();
    }
}

export {UpdateProfileUserController}