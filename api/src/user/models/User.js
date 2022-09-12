const mongoose = require('mongoose')

const Schema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reg_date: {
        type: Date,
        default: Date.now()
    },
    token: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "user"
    },
    image: {
        type: String,
        default:""
    }
})
module.exports = mongoose.model('User', Schema)