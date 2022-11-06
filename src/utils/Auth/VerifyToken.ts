import jwt from 'jsonwebtoken'

function checkToken(req, res, next) {

    const authHeader = req.headers['token']
    console.log(authHeader)


    if (authHeader == null) {
        res.status(401).send("Access Denied");
    }

    try {
        const secret = process.env.TOKEN
        
        jwt.verify(authHeader,secret);

        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}