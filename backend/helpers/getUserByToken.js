const jwt = require("jsonwebtoken");

const User = require('../model/User')

const getUserByToken = async (token) =>{
    if(!token){
        return res.status(422).json({ message: "TOKEN INVALIDO" });
    }
    const decoded = jwt.verify(token, "nosssosrcret");
    const userId = decoded.id
    const user = await User.findOne({_id :userId})
    return user
}

module.exports = getUserByToken