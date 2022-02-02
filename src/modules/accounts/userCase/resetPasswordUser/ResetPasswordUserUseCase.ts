import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { compare, hash } from "bcryptjs";

interface IRequest {
    user_id: string;
    current_password: string;
     new_password: string;
     confirm_new_password: string;
}

@injectable()
class ResetPasswordUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRespository: IUsersRepository
    ) {}

    async execute({
        user_id,
        current_password,
        new_password,
        confirm_new_password,
    }: IRequest): Promise<void> {
        
        if(new_password != confirm_new_password){
            throw new AppError("The new password and confirmation are not identical!");
        }

        const user = await this.usersRespository.findById(user_id);

        const passwordMatch = await compare(current_password, user.password);
        if(!passwordMatch){
            throw new AppError("Current password incorrect!");
        }

        user.password = await hash(new_password, 8);

        await this.usersRespository.create(user);

    }
}

export { ResetPasswordUserUseCase }