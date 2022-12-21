const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employeeId:{
        type:String,
    },
    salary:{
        type:Number
    },
    profilePhoto: {
        type: String,
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
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    department:{
        type:mongoose.Types.ObjectId,
        ref:'Department',
    },
    hobbies: String,
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
        min: 8,
        max: 20
    },
    role: {
        type: String,
        default: 'employee'
    }
},{timestamps:true})

module.exports = mongoose.model('Employee', EmployeeSchema)
