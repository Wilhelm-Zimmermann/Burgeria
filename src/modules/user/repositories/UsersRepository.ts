import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { hash } from "bcrypt";
import { IUsersRepository } from "./IUsersRepository";


export class UsersRepository implements IUsersRepository {

    private repository : Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ email, name, phone_number, password }: ICreateUserDTO): Promise<void> {
        const passHash = await hash(password, 8);
        password = passHash;
        const user = this.repository.create({
            name,
            email,
            password,
            phone_number
        });
        await this.repository.save(user);
    }

    async findByEmail(email: string):Promise<User> {
        const user = await this.repository.findOne({
            email
        });

        return user;
    }

    async findById(id: string): Promise<User> {
        return await this.repository.findOne(id);
    }
}