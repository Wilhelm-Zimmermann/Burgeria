import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import secret from "../../secret.json";

interface IPayload {
    sub: string;
}

export default async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization;

    if (!bearerToken)
        throw new AppError("No token on Header", 401);

    const [, token] = bearerToken.split(" ");

    try {
        const { sub: user_id } = verify(token, secret.secret_token) as IPayload;
        req.user = {
            id: user_id
        }
        next();
    }catch(err){
        throw new AppError("Invalid Token", 401);
    }
}