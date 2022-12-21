const mongoose = require('mongoose')


const ManagerSchema = new mongoose.Schema({
    profilePhoto:{
        type:String,
        default: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png"
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender:{
        type:String,
        enum:['male','female','other']
    },
    hobbies:String,
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        min:8,
        max:20
    },
    role:{
        type:String,
        required: true,
        default:'manager'
    }
    
}, { timestamps: true })

module.exports = mongoose.model('Manager', ManagerSchema)