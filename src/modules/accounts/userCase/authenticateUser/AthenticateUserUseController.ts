import {Response, Request} from "express";
import { container } from "tsyringe";
import { AuthentitcateUserUseCase } from "./AuthenticateUserUseCase";


class AthenticateUserUseController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authentitcateUserUseCase = container.resolve(AuthentitcateUserUseCase);

        const token = await authentitcateUserUseCase.execute({ email, password });

        return response.json(token);
    }

}

export {AthenticateUserUseController}