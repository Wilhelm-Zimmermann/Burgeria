import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


export class ShowUserProfileController {
    async handle(req: Request, res: Response): Promise<Response> {
        const showUserProfileUseCase = container.resolve(ShowUserProfileUseCase);
        const { id } = req.user;

        const user = await showUserProfileUseCase.execute(id);

        return res.status(200).json(user);
    }
}