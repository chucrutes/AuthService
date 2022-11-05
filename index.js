require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/authservicedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, console.log('Connected do the database'));


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Professor', 'Project Manager', 'Team', 'Support', 'Dev'],
        required: true
    },
    institution: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastPasswordUpdate: {
        type: Date
    },
    passwordUpdateCount: {
        type: Number
    }
});

const User = mongoose.model("users", userSchema);


async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;

}

async function verifyPassword(password, hash) {
    const result = await bcrypt.compare(password, hash);
    return result;
}

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

app.post('/user/new', function (req, res) {

    const passwordInHash = hashPassword(req.body.password);
    const user = new User({
        email: req.body.email,
        fullName: req.body.fullName,
        role: 'Project Manager',
        institution: req.body.institution,
        password: passwordInHash,
    });

    user.save(function (err) {
        if (err) {
            res.status(400).send({ message: "Some error has ocurred" })
        }
    })
});

app.get('/user/teste', checkToken, function(req, res) {

    res.status(200).send("Valid Token");
});

app.get('/login', function (req, res) {
    const emailBody = req.body.email
    const passwordBody = req.body.password

    User.findOne({ email: emailBody }, '_id role fullName password', function (err, user) {
        if (err) {
            res.status(401).json({ message: "Error Ocurred" })
        }

        if (user == null) {
            return res.status(401).send(`Invalid Credentials`)
        }
        if (user.password == passwordBody) {

            try {
                const secret = process.env.TOKEN

                const token = jwt.sign(
                    {
                        id: user._id,
                        role: user.role
                    },
                    secret,
                );
                res.status(200).json({msg: "Logged In successfully", token})

            } catch (error) {
                res.status(400).send("Invalid Token")
            }

        } else {
            res.status(401).send(`The correct password for this user is: ${user.password}`)
        }
    });

});

app.get('/all', function (req, res) {

    User.findOne({}, 'fullName password role email', function (err, user) {
        if (err) {
            res.status(401).json({ message: "Error Ocurred" })
        } else {
            res.status(200).json({ message: "Logged In Successfully" })
        }
    });


});

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Auth Service" });
});

app.listen(4001, () => {
    console.log(`Server started on port 4001`)

})
