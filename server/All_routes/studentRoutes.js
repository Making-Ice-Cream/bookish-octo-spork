const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const path = require("path");

router.get("/Hello", (req, res)=>{
    res.send("Hello World!");
});

module.exports = router;