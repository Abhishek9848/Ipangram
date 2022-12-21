const Category = require('../models/category.model')

exports.create = async = async (req, res, next) => {
    try {
        const category = new Category(req.body)
        const savedCategory = await category.save()
        res.status(201).send({
            success: true,
            data: savedCategory,
            message: "Category created successfully"
        })
    } catch (err) {
        next(err)
    }
}

exports.list = async (req, res, next) => {
    try {
        const data = await Category.find({}).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            data,
            message: "Categories fetched successfully"
        })
    } catch (err) {
        next(err)
    }
}

exports.Update = (req, res, next) => {
    try {
        Category.findByIdAndUpdate(req.params.id, req.body, { new: true } ,(err,data)=>{
            if (err) {
                return res.status(200).send({
                    success: false,
                    data: null,
                    message: err
                })
            }
            res.status(200).send({
                success: true,
                data,
                message: "Category updated successfully"
            })
        })
       
    } catch (err) {
        next(err)
    }
}
exports.Delete = async (req, res, next) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            data: deleted,
            message: "Category deleted successfully"
        })
    } catch (err) {
        next(err)
    }
}