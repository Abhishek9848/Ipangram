const mongoose = require('mongoose')


const DepartmentSchema = new mongoose.Schema({
    departmentName:{
        type:String,
        required: true
    },
    categoryName:{
        type:mongoose.Types.ObjectId,
        ref:"Category"
    },
    location:{
        type:String,
        required:true,
        index:true
    },    
}, { timestamps: true })

module.exports = mongoose.model('Department', DepartmentSchema)