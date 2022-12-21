const jwt = require('jsonwebtoken')
const {createError} = require('../middlewares/error')


exports.verifyToken = (req, res, next) =>{
    let token = req.headers.authorization || req.headers.token;
    if(!token) return next(createError(401 ,"You are not authenticated!"))
    token = token.replace("Bearer ", "");
    jwt.verify(token , process.env.JWT , (err, user) =>{
        if (err) next(createError(403, "Token is not valid!"))
        req.user = user;
        next() 
    })
}

exports.verifyManger =(req, res, next) =>{
    this.verifyToken(req,res, ()=>{
        if(req.user?.role === "manager"){
            next()
        } else{
            return next(createError(403,"You are not authorized!"))
        }
    })
}