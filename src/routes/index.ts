import { Router } from "express";
import { authRoutes } from './auth.routes'

const router = Router();

authRoutes(router);


export { router }