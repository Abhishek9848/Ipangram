const Employee = require('../models/employee.model')
var bcrypt = require('bcryptjs');
const Category = require('../models/category.model')
const Department = require('../models/department.model')
const { createError } = require('../middlewares/error');
const jwt = require('jsonwebtoken')


exports.register = async (req, res, next) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const employee = new Employee({
            ...req.body,
            password: hash,
            role: "employee"
        })
        const savedEmployee = await employee.save();
        res.status(201).send({
            success: true,
            data: savedEmployee,
            message: "Employee created successfully"
        })
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await Employee.findOne({ email })
        if (!user) return next(createError(404, "User not found!"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Wrong password"))
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT)
        const { password, ...options } = user._doc
        res.status(200).json({
            success: true,
            data: { token, ...options },
            message: "Logged In Successfully"
        })
    } catch (error) {
        next(error)
    }
}


exports.list = async (req, res, next) => {
    try {
        const employee = await Employee.find({}, { password: 0 })
            .populate("department")
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            data: employee,
            message: "Employees fetched successfully"
        })
    } catch (err) {
        next(err)
    }
}

exports.queryList = async (req, res, next) => {
    try {
        const categoryName = await Category.findOne({ name: "IT" })
        const department = await Department.find({ categoryName: categoryName._id, location: { $regex: '(\s+a|^a)', $options: '$i' } })
        const data = await Employee.find({ department })
        res.status(200).send({
            success: true,
            data,
            message: "Employees fetched successfully"
        })
    } catch (err) {
        next(err)
    }
}
exports.secondQueryList = async (req, res, next) => {
    try {
        const categoryName = await Category.findOne({ name: "sales" })
        const department = await Department.find({ categoryName: categoryName._id })
        const data = await Employee.find({ department }).sort({ firstName: -1 })
        res.status(200).send({
            success: true,
            data,
            message: "Employees fetched successfully"
        })
    } catch (err) {
        next(err)
    }
}

exports.getById = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id)
            .populate("department")
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            data: employee,
            message: "Employee fetched successfully"
        })
    } catch (err) {
        next(err)
    }
}

exports.Update = async (req, res, next) => {
    try {
        let updated;
        if (req.body.password) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            updated = await Employee.findByIdAndUpdate(req.params.id, { ...req.body, password: hash }, { new: true })
                .populate("department")
        } else {
            updated = await Employee.findByIdAndUpdate(req.params.id, { ...req.body, password: hash }, { new: true })
                .populate("department")
        }
        updated.password = undefined
        res.status(200).send({
            success: true,
            data: updated,
            message: "Employee updated successfully"
        })
    } catch (err) {
        next(err)
    }
}
exports.Delete = async (req, res, next) => {
    try {
        const deleted = await Employee.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Employee deleted successfully"
        })
    } catch (err) {
        next(err)
    }
}