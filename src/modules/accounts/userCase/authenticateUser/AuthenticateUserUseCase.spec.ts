import "reflect-metadata";
import { AppError } from "@shared/errors/AppError";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthentitcateUserUseCase } from "./AuthenticateUserUseCase"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";



let authenticateUserUseCase: AuthentitcateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
    beforeEach(() =>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory =  new UsersTokensRepositoryInMemory()
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthentitcateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("should be able to athenticate an user", async () => {
        const user: ICreateUsersDTO ={
            name: "user",
            email: "user@gmail.com",
            password: "12312356"
        };

        await createUserUseCase.execute(user);

       const tokenAuthe = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(tokenAuthe).toHaveProperty("token");

    });

    it("should not be able to authenticate an noneexitent user", async () => {

       await expect(authenticateUserUseCase.execute({
                email: "fulano@gmail.com",
                password: "fulano123"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));

    })

    it("should not be able to authenticate with incorrenct password", async () => {

        const user: ICreateUsersDTO ={
            name: "joão",
            email: "joao@gmail.com",
            password: "123"
        }

        await createUserUseCase.execute(user);

        await expect(  authenticateUserUseCase.execute({
                email: user.email,
                password: "joao123"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    })
})


