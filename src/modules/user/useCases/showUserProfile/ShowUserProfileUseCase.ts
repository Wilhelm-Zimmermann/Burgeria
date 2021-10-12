import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IResponse {
    user: {
        id: string;
        name: string;
        email: string;
        phone_number: string;
    }
}

@injectable()
export class ShowUserProfileUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(id: string): Promise<IResponse> {
        
        const user = await this.usersRepository.findById(id);

        if (!user)
            throw new AppError("User does not exists");

        const { name, email, phone_number } = user;

        return {
            user: {
                id: user.id,
                name,
                email,
                phone_number,
            }
        }
    }
}