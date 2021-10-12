import { container } from "tsyringe";
import { IUsersRepository } from "../../modules/user/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/user/repositories/UsersRepository";


container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);