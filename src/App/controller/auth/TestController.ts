import { Request, Response } from "express"

class TestController {
    async execute(req: Request, res: Response) {
        res.status(200).send("Auth Service")
    }
}
export { TestController }