import { inject, injectable } from "tsyringe";

import { hash } from "bcryptjs";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";


@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ){}
    async execute({name, email, password}: ICreateUsersDTO): Promise<void> {

        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new AppError("User already exists!");
        }

        const passwordHash = await hash(password, 8);
        this.userRepository.create({name, email, password: passwordHash});
    }
}

export {CreateUserUseCase}