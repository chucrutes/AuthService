const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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

module.exports = mongoose.model("User", UserSchema)