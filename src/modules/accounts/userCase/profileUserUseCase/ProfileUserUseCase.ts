import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { inject, injectable } from "tsyringe";



@injectable()
class ProfileUserUseCase{
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ){}

    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.userRepository.findById(id);
        if(!user){
            throw new AppError("User not Exists!");
        }

       return UserMap.toDTO(user);
    }
}

export {ProfileUserUseCase}