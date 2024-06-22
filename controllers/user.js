const User = require("../models/urlusers")
const {setUser} = require("../service/auth")
const { v4: uuidv4 } = require('uuid');

async function handleUserSignup(req,res) {
    const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password
    })

    return res.render("/");
}

async function handleUserLogin(req,res) {
    const {email,password} = req.body;

    const user = await User.findOne({
        email,
        password
    })

    if(!user){
        return res.render("login",{
            error: "Invalid email or password"
        })
    }
    
    const token = setUser(user);
    // return res.json({"token": token})
    res.cookie("uid",token)
    return res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}
