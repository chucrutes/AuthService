require('dotenv').config()

const User = require('../../model/User')

import { Request, Response } from "express"
import { sign } from "jsonwebtoken"

interface User {
    email: String,
    role: String,
    password: String,
    _id: String
}

class AuthController {
    async execute(req: Request, res: Response) {

        try {

            const secret = process.env.TOKEN
            const { email, password } = req.body;


            User.findOne({ email: email }, '_id role fullName password', function (err: any, user: User) {
                var validRequest = true
                var token: String

                if (err) {
                    throw new Error("An Internal Error Has Ocurred")
                }
                
                if (!user) {
                    validRequest = false
                } else {

                    if (user.password != password) {
                        validRequest = false
                    }

                    token = sign(
                        {
                            id: user._id,
                            role: user.role
                        },
                        secret,
                    );
                }

                if (validRequest) {
                    res.status(200).send({ msg: "Logged In successfully", token })
                } else {
                    res.status(401).send("Invalid Credentials")
                }
            });


        } catch (error) {
            res.status(401).json(error.message)
        }


    }
}
export { AuthController }