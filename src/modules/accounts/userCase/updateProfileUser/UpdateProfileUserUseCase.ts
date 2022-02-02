import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    user_id: string;
    name: string;
    email: string;
}

@injectable()
class UpdateProfileUserUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ){}
    async execute({user_id, name, email}: IRequest): Promise<void> {

        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if(userAlreadyExists){
            throw new AppError("User already exists with this email!");
        }

        const user = await this.userRepository.findById(user_id);

        user.name = name;
        user.email = email;

        this.userRepository.create(user);
    }
}

export {UpdateProfileUserUseCase}