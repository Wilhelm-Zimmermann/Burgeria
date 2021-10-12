import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import "./shared/container";
import "express-async-errors";
import connection from "./database";
import { AppError } from "./errors/AppError";
import { router } from "./routes";


connection();
const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message })
    }

    return res.status(500).json({ error: "Internal server Error: " + err.message });
});

export { app };