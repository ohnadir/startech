const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Checks if user is authenticated or not 
exports.isAuthenticatedUser = async (req, res, next) => {

    const token = req.cookies.token;
    console.log(token)
    if (!token) {
        return res.status(401).send({message: 'UnAuthorized access'})
    }
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded){
        if(err) {
          return res.status(403).send({ message: 'Forbidden access' })
        }
        req.user = await User.findById(decoded.id);
        next()
    })
}

// Handling users roles
exports.authorizeRoles = (req, res, next) => {
    
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).send({message: 'UnAuthorized access'})
    }
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded){
        if(err) {
            return res.status(403).send({ message: 'Forbidden access' })
        }
        const user = await User.findById(decoded.id);
        if(user.role === "admin"){
            req.user = user;
            next();
        }else{
            return res.status(401).send({message: `Role ${user.role} is not allowed to access this resource`})
        }
    })
}