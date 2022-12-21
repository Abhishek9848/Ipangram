const Manager = require('../models/manager.model')
var bcrypt = require('bcryptjs');
const { createError } = require('../middlewares/error');
const jwt = require('jsonwebtoken')


exports.register = async (req, res, next) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const manager = new Manager({
            ...req.body,
            password: hash,
            role: "manager"
        })
        const savedManager = await manager.save();
        savedManager.password = undefined;
        res.status(201).send({
            success: true,
            data: savedManager,
            message: "Manager created successfully"
        })
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await Manager.findOne({ email })
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
        const manager = await Manager.find({})
            .sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            data: manager,
            message: "Managers fetched successfully"
        })
    } catch (err) {
        next(err)
    }
}

exports.Update = async (req, res, next) => {
    try {
        const updated = await Manager.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate("categoryName")
        res.status(200).send({
            success: true,
            data: updated,
            message: "Manager updated successfully"
        })
    } catch (err) {
        next(err)
    }
}
exports.Delete = async (req, res, next) => {
    try {
        const deleted = await Manager.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Manager deleted successfully"
        })
    } catch (err) {
        next(err)
    }
}