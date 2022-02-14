const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const signupSchema = require("./Database/models/accountsAdmin");
const jwt = require('jsonwebtoken');
router.use(bodyParser.urlencoded({extended: true}));

router.post("/login",async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    try {
        let result = await signupSchema.find({email:email});
        console.log(result);
        if(result!=null){
            let matched = await bcrypt.compare(password, result[0].password);
            if(matched){
                //generating the token"
                let token  =  await result[0].generateAuthToken();
               
                // response sending
                res.status(201).json({message: "Login Succesful.", 
                                     name: result[0].name.firstname + " " + 
                                     result[0].name.lastname, 
                                     email: result[0].email,
                                    status: 200,
                                    token : token});
            }
            else{
                res.status(404).json({message: "Invalid Credentials",
                                     status : 404});
            }
        }else{
            res.status(404).json({message: "Invalid Credentials",
                                                     status : 404});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error!" ,
                            status : 500});
    }
});
module.exports = router;