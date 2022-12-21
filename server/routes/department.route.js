const express = require('express')
const { list, create, Update, Delete } = require('../controllers/department.controller')
const { verifyManger } = require('../middlewares/validate')
const router = express.Router()

router.route('/')
    .post(verifyManger, create)
    .get(verifyManger, list)

router.route('/:id')
    .put(verifyManger, Update)
    .delete(verifyManger, Delete)

module.exports = router