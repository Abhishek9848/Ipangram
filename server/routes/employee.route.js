const express = require('express')
const { list, register, Update, Delete, login, getById, queryList, secondQueryList } = require('../controllers/employee.controller')
const { verifyManger, verifyToken } = require('../middlewares/validate')
const router = express.Router()

router.route('/')
    .post(register)
    .get(verifyManger, list)

router.route('/login')
    .post(login)

router.route('/:id')
    .get(verifyToken, getById)
    .put(verifyManger, Update)
    .delete(verifyManger, Delete)

router.get('/query/first' ,queryList)
router.get('/query/second' ,secondQueryList)
module.exports = router