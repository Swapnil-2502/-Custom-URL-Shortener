const express = require("express");
const path = require("path");
const {connectMongoDB} = require("./connection")
const cookieParser = require('cookie-parser')
const {restrictToLoggedInUserOnly, checkAuth} = require("./middleware/auth")
const URL = require("./models/url");
const app = express();
const PORT = 8001;


const URLroutes = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

//COnnect to mongoDB using mongoose
connectMongoDB("mongodb://127.0.0.1:27017/SwapnilHajare");

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.set("view engine", "ejs");
app.set('views',path.resolve("./views"))

// app.get("/test",async (req,res)=>{
//     const allURLs = await URL.find({});
//     return res.render("home",{
//         urls: allURLs
//     })
// })

//Route

app.get("/url/:shortId",async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push: {
            visitHistory:{
                timestamp: Date.now()
            }
        }
    },{timestamps: true})
    res.redirect(entry.redirectURL)
})

app.use("/url",restrictToLoggedInUserOnly,URLroutes);
app.use("/user",userRoute)
app.use("/",checkAuth, staticRoute)

app.listen(PORT,
    () => console.log(`Server started at PORT: ${PORT}`)
)