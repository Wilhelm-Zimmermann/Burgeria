import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import secret from "../../../../../secret.json";


interface IResponse {
    user: {
        name: string;
        email: string;
        phone_number: string;
    }
    token: string;
}

@injectable()
export class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(email: string, password: string): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) 
            throw new AppError("Email/Password invalid");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) 
            throw new AppError("Email/Password invalid");

        const token = sign(
            {},
            secret.secret_token,
            {
                subject: user.id,
                expiresIn: secret.expiresIn
            }
        );

        return {
            user: {
                name: user.name,
                email: user.email,
                phone_number: user.phone_number
            },
            token
        }
    }
}