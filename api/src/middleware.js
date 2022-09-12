require('dotenv').config();
const jwt = require('jsonwebtoken')

const authenticateToken = async(req,res,next) => {
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];
            try {
                const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
                 req.user = verifyToken
                 next()
            } catch (error) {
                console.log("Error from token", error)
            } 
        } else{
            console.log("Token working")
        }
    } catch (error) {
        console.log("Error from verification", error)
    }
}

module.exports = authenticateToken