const Department = require('../models/department.model')

exports.create = async = async (req, res, next) => {
    try {
        const department = new Department(req.body)
        const savedDepartment = await department.save()
        res.status(201).send({
            success: true,
            data: savedDepartment,
            message: "Department created successfully"
        })
    } catch (err) {
        next(err)
    }
}

exports.list = async (req, res, next) => {
    try {
        const data = await Department.find({})
            .sort({ createdAt: -1 })
            .populate("categoryName")
        res.status(200).send({
            success: true,
            data,
            message: "Department fetched successfully"
        })
    } catch (err) {
        next(err)
    }
}

exports.Update = async (req, res, next) => {
    try {
        const updated = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate("categoryName")
        res.status(200).send({
            success: true,
            data: updated,
            message: "Department updated successfully"
        })
    } catch (err) {
        next(err)
    }
}
exports.Delete = async (req, res, next) => {
    try {
        const deleted = await Department.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Department deleted successfully"
        })
    } catch (err) {
        next(err)
    }
}