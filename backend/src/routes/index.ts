import { Application } from "express";
import Router from 'express';
import { commentRouter } from "./comment";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/comments', commentRouter);
    app.use('/api', apiRouter);
}