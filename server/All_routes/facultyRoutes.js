const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const path = require("path");
const lectureSchema = require("../Database/models/lectures");

router.post("/announceLecture", async function(req, res){
    try {
        let newL = new lectureSchema(req.body);
        newL.save();
        res.status(200).json({
            message: "Lecture Announced Successfully",
            status : "200"
        });
    } catch (error) {
        console.log(error);
    } 
});

module.exports = router;