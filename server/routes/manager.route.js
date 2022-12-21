const express = require('express')
const { list, register, Update, Delete, login } = require('../controllers/manager.controller')
const { verifyManger } = require('../middlewares/validate')
const router = express.Router()

router.route('/')
    .post(register)
    .get(verifyManger, list)

router.route('/login')
    .post(login)

router.route('/:id')
    .put(verifyManger, Update)
    .delete(verifyManger, Delete)

module.exports = router