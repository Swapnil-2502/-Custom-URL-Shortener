const express = require("express");
const path = require("path");
const URLroutes = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const {connectMongoDB} = require("./connection")
const URL = require("./models/url");
const app = express();
const PORT = 8001;

// app.get("/",(req,res)=>{
//     res.send("Hello from home route")
// })

//COnnect to mongoDB using mongoose
connectMongoDB("mongodb://127.0.0.1:27017/SwapnilHajare");

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

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

app.use("/url",URLroutes);
app.use("/",staticRoute)

app.listen(PORT,
    () => console.log(`Server started at PORT: ${PORT}`)
)