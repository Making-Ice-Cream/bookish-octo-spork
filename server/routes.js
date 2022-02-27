const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const path = require("path");
const nodemailer = require('nodemailer');
const fs = require("fs");
const handlebars = require('handlebars');
const smtpTransport = require('nodemailer-smtp-transport');

const signupSchema = require("./Database/models/accountsAdmin");
const studentSchema = require("./Database/models/accountsStudents");
const facultySchema = require("./Database/models/accountsFaculty");
const sentEmail = require("./sentEmail");


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
     
      res.status(500).json({message: "Unauthorized access!" ,
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
    var installmentDate = new Date();
    let email = req.body.email;
    console.log(req.body);
    let schoNum = req.body.scholarNumber;
    let newst = new studentSchema(req.body);
    let result = await signupSchema.find({});
    let curScholarNo = result[0].scholarNumber;
    let paymentType = req.body.paymentType;
    let totalAmount = req.body.totalAmount;
    if(paymentType === "Installments"){
        const no_of_I = req.body.numberofInstallment;

        totalAmount = parseInt(totalAmount);
        const installmentAmount = totalAmount/no_of_I;
        const monthsDiff = 12/no_of_I;
        const firstM = installmentDate.getMonth();
        const installments = [];
        for(let i=1; i<=no_of_I; i++){
            installmentDate.setMonth(firstM + monthsDiff*(i-1));
            const installment = {
                "dueDate": new Date(installmentDate),
                "amount": installmentAmount,
                "paid":false
            };
            installments.push(installment);
        }
        newst.payment.installments = installments;
    }
    else{
        const obj = {
            "amount": totalAmount,
            "paid": false
        }
        newst.payment.lumpsum = obj; 
    }

    await signupSchema.updateOne({},{$set:{'scholarNumber': curScholarNo+1}});
    
    try {
        newst.save();
        const filePath = path.join(__dirname, './emailTemplates/signupStudent.html');
        const replacements = {
            Username: req.body.firstname,
            scno: schoNum
        };
        sentEmail.sendEmail(email, "User Registration", filePath, replacements);
        res.status(201).json({message: "Student Added Successfully." ,
                            status : 201});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error!" ,
                            status : 500});
    }
});

// adding add teacher route
router.post("/admin/faculty/newfaculty",async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body.imageUrl)
    let newfct = new facultySchema(req.body);; 
    const salt = await bcrypt.genSalt(10);
    newfct.password = await bcrypt.hash(newfct.password, salt);
    try {
        newfct.save();
        const filePath = path.join(__dirname, './emailTemplates/signupFaculty.html');
        const replacements = {
            id: email,
            password: password
        };
        sentEmail.sendEmail(email, "Login Credentials", filePath, replacements);
        res.status(201).json({message: "Faculty Added Successfully." ,
                            status : 201,
                        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error!" ,
                            status : 500});
    }
});

router.post("/admin/student/scholarNumber",auths, async(req,res)=>{
    try{
    let result = await signupSchema.find({});
    if(result){
        res.status(201).json({message: "Scholar Number Generated.",
                          scholarNumber: result[0].scholarNumber,
                            status : 201,
                        });
    }
    else{
        res.status(404).json({message: "Unauthorized access",
                            status : 404,
                        });
    }
    
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error!" ,
                            status : 500});
    }
});

// send teacher details
router.post("/getTeachersData", async(req, res) =>{
    try{
        let result = await facultySchema.find({},{email:0, password:0});
        if(result){
            res.status(201).json({message: "Data sent successfully.",
                                 faculties: result,
                                 status : 201,
                            });
        }
        else{
            res.status(404).json({message: "Unauthorized access",
                                status : 404,
                            });
        }
        
        }
        catch (error) {
            console.log(error);
            res.status(500).json({message: "Server error!" ,
                                status : 500});
        }
});


//get fee details manually route
router.post("/fee_payment_manually", async(req, res) =>{
    const scholarNumber = req.body.scholarNumber;
    try{
        let result = await studentSchema.findOne({scholarNumber:scholarNumber});

        if(result){
            console.log(result);
            const paymentType = result.paymentType;
            let installmentNumber = "";
            let amount = 0;
            if(result.payment.installments.length === 0){
                installmentNumber = "N/A";
                if(result.payment.lumpsum.paid === false)
                amount = result.payment.lumpsum.amount;
                else
                amount = 0;
            }
            else{
                let insts = result.payment.installments;
                for(let i=0; i<insts.length; i++){
                    if(insts[i].paid === false){
                        installmentNumber = (i+1).toString();
                        amount = insts[i].amount;
                        break;
                    }
                    else{
                        installmentNumber = "N/A";
                        amount = 0;
                    }
                }
            }
            res.status(200).json({message: "Data sent successfully.",
                                firstname:result.firstName,
                                lastname:result.lastName,
                                paymentType: result.paymentType,
                                installmentNumber: installmentNumber,
                                amount:amount,
                                status : 200,
                            });
        }
        else{
            res.status(404).json({message: "No record found, check the scholar number.",
                                status : 404,
                            });
        }
        
        }
        catch (error) {
            console.log(error);
            res.status(500).json({message: "Server error!" ,
                                status : 500});
        }
});

// route to submit manual fee through admin

router.post("/submitFee", async(req, res) =>{
    const scholarNumber = req.body.scholarNumber;
    const paymentType = req.body.paymentType;
    const installmentNumber = parseInt(req.body.installmentNumber);
    if(paymentType === "Installments"){
            try{
                 studentSchema.findOne({scholarNumber}).then(item =>{
                
                    item.payment.installments[installmentNumber].paid  =  true
                        item.save();
                    }
                 )
                 res.status(201).json({message: "Fee submitted successfully",
                 status : 201,
             });
            }
            catch(err){
                res.status(500).json({message: "No record found, check the scholar number.",
                status : 500,
            });
            }   
    }
    else{
        try {
            await studentSchema.updateOne({scholarNumber:scholarNumber},{$set:{'payment.lumpsum.paid': true}});
            res.status(201).json({message: "Fee submitted successfully",
                                status : 201,
                            });
        } catch (error) {
            res.status(404).json({message: "No record found, check the scholar number.",
                                status : 404,
                            });
        } 
    }
});


module.exports = router;