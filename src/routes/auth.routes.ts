import { Router } from "express";
import { AuthController, TestController } from "../App/controller/auth";

const auth = new AuthController()
const test = new TestController()

const authRoutes = (router: Router): void => {
    router.get("/login", auth.execute.bind(AuthController));
    router.get("/", auth.execute.bind(TestController));
}

export { authRoutes }