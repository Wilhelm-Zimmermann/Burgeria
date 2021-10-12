import { Router } from "express";
import isAuthenticated from "../middlewares/auth";
import { AuthenticateUserController } from "../modules/user/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../modules/user/useCases/createUser/CreateUserController";
import { ShowUserProfileController } from "../modules/user/useCases/showUserProfile/ShowUserProfileController";

const userRouter = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const showUserProfileController = new ShowUserProfileController();

userRouter.post(
    "/create-user",
    createUserController.handle
);

userRouter.post(
    "/login",
    authenticateUserController.handle
);

userRouter.get(
    "/profile",
    isAuthenticated,
    showUserProfileController.handle
);

export { userRouter };