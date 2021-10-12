import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";


export class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const createUserUseCase = container.resolve(CreateUserUseCase);
        const { email, name, password, phone_number } = req.body;

        await createUserUseCase.execute({
            email,
            name,
            password,
            phone_number
        });

        return res.status(201).json({ msg: "ok"});
    }
}