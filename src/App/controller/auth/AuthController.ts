require('dotenv').config()

const User = require('../../model/User')

import { Request, Response } from "express"
import { sign } from "jsonwebtoken"
import { authToken, refreshToken } from "../../../config"

interface User {
    email: String,
    role: String,
    password: String,
    _id: String
}

class AuthController {
    async execute(req: Request, res: Response) {

        try {

            const { email, password } = req.body;


            User.findOne({ email: email }, '_id role name fullName password', function (err: any, user: User) {
                var token: string, refreshT: string

                if (err) {
                    throw new Error("An Internal Error Has Ocurred")
                }

                if (!user || user.password != password) {
                    return res.status(401).send("Invalid Credentials")
                }

                token = sign(
                    {
                        user_id: user._id,
                        user_role: user.role
                    },
                    authToken.secret, {
                    expiresIn: authToken.expiresIn
                }
                );

                refreshT = sign(
                    {
                        userId: user._id,
                        userRole: user.role
                    },
                    authToken.secret, {
                    expiresIn: refreshToken.expiresIn
                }
                )
                return res.status(200).send({ msg: "Logged In successfully", token, refreshToken })

            });


        } catch (error) {
            res.status(401).json(error.message)
        }


    }
}
export { AuthController }