import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, name, password, phone_number }: ICreateUserDTO): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if(user){
            throw new AppError("This email is already in use");
        }

        await this.usersRepository.create({
            email,
            password,
            phone_number,
            name
        });
    }
}