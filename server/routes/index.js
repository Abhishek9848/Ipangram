const express = require('express');
const rootRouter = express.Router();

//Routes
const employeeRoutes = require('./employee.route')
const departmentRoutes = require('./department.route')
const categoryRoutes = require('./category.route')
const managerRoutes = require('./manager.route')

 
rootRouter.use('/employee' , employeeRoutes)
rootRouter.use('/manager' , managerRoutes)
rootRouter.use('/department' , departmentRoutes)
rootRouter.use('/category' , categoryRoutes)

module.exports = rootRouter