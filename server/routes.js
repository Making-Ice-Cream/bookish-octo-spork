const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const nodemailer = require('nodemailer');
const signupSchema = require("./Database/models/accountsAdmin");
const studentSchema = require("./Database/models/accountsStudents");
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
                //generating the token
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

// geting userid
const auths = async (req,res,next)=>{
    try {
        const token = req.body.token;
        const secured_string = "helloweareheretodesignthestringwhichisverystronghopeitwillworksthanks";
        
        const verify =  jwt.verify(token,secured_string);

        if(verify == null || verify == [] || verify == {}){
            res.status(404).json({message: "Invalid Credentials",
                                                     status : 404,
                                                    isvalid : false});
        }

        const userid =  await signupSchema.findOne({_id:verify._id});
        req.user = userid;
        req.token = token;
        next();
        
        
    } catch (error) {
     
      res.status(500).json({message: "Server error!" ,
      status : 500,
      isvalid : false});
      
      }
  }

// to check jwt token
router.post("/check" ,auths ,async(req,res)=>{
   
    try{   
     let a =  req.user.tokens.filter((curr)=>{
        return curr.token == req.token;
     })
     if(a.length > 0)
     {
                res.status(200).json({status : 200 , isvalid : true});
    }
    else{
        res.status(401).json({status : 401 , isvalid : false});
    }
  }
   catch(err)
   {
    // console.log(err);
    res.status(404).json({message:`${err}` ,
                          status : 404})
   }
  });

// to logout the user
router.post("/logout" , auths ,async(req,res)=>{
    try{   
        req.user.tokens = req.user.tokens.filter((curr)=>{
           return curr.token != req.token;
        })
      
       await req.user.save();
       res.status(200).json({status:200});
      }
      catch(err)
      {
       // console.log(err);
       res.status(404).json({status:404})
      }
})

router.post("/checkpassword", auths , async(req, res)=>{
    try {
        let Hashpassword  = req.user.password;
        
        let matched = await bcrypt.compare( req.body.password, Hashpassword);
         
        if(matched){
            res.status(200).json({status : 200 , isvalid : true});
        }
        else{
            res.status(404).json({status : 404, isvalid : false});
        }


    } catch (error) {
        res.status(500).json({status : 500 , isvalid : false});
    }

})




//adding add student route
router.post("/admin/student/newstudent",async(req,res)=>{
    let email = req.body.email;
    let scNo = req.body.scholarNumber;
    let newst = new studentSchema(req.body);
    try {
        newst.save();
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noreply.5671@gmail.com',
                pass: 'Apni@123'
            }
        });
          
        let mailDetails = {
            from: 'noreply.5671@gmail.com',
            to: email,
            subject: 'Complete Registration mail',
            text: 'Your Scholar Number is '+scNo+' , Signup at the given link ____ with the provided scholar number to access your details.',
        };
          
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        res.status(500).json({message: "Student Added Successfully." ,
                            status : 500});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error!" ,
                            status : 500});
    }
});

module.exports = router;