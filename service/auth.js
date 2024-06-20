// const sessionIdtoUserMap = new Map();

const jwt = require("jsonwebtoken");
const secret = "Swapnil$25!"

//This function will make tokens for me.
function setUser(user){
    return jwt.sign({
        id: user._id,
        email: user.email
    },secret)
}


function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret)
    }catch{
        return null;
    }
    
}

module.exports = {
    setUser,
    getUser
}