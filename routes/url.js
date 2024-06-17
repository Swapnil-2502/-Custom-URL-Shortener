const express = require("express");
const {handleGenerateNewShortURL,
    handleGETAnalytics
} = require("../controllers/url")
const router = express.Router();

router.post("/",handleGenerateNewShortURL)

router.get("/analytics/:shortId",handleGETAnalytics)

module.exports = router