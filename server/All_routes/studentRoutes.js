const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const path = require("path");
const studentSchema = require("../Database/models/accountsStudents");
const lectureSchema = require("../Database/models/lectures");
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.json());
const jwt = require('jsonwebtoken');

const auths = async (req,res,next)=>{
    try {
        const token = req.body.token === undefined || null ? req.headers.batch : req.body.token ;
        // console.log(token)
        const secured_string = process.env.TOKEN_GEN_KEY;
        
        const verify =  jwt.verify(token,secured_string);

        if(verify == null || verify == [] || verify == {}){
            res.status(404).json({message: "Invalid Credentials",
                                                     status : 404,
                                                    isvalid : false});
        }

        const userid =  await studentSchema.findOne({_id:verify._id});
        req.user = userid;
        req.token = token;
        next();
        
        
    } catch (error) {
      console.log(error)
      res.status(500).json({message: "Unauthorized access!" ,
      status : 500,
      isvalid : false});
      
      }
  }

router.post("/getProfile", async function(req, res){
   try {
       let student = await studentSchema.findOne({email: req.body.email});
       if(student){
        res.status(200).json({
            message: "Data Send Successfully",
            profile: student,
            status: 200
       });
       }
       else{
           res.status(404).json({
               message: "Email not found in records",
               status: 404
           })
       }
       
   } catch (error) {
    console.log(error);
    res.status(500).json({message: "Server error!" ,
                        status : 500});
   }
});

router.post("/feeStatus",auths, async function(req, res){
   try {
       let student = await studentSchema.findOne({_id: req.user});
    //    console.log(student);
       let curDate = new Date();
       const paymentType = student.paymentType;
       if(paymentType === "Lump Sum"){
           if(student.payment.lumpsum.paid === true){
               res.status(200).json({
                //    message: "Data sent successfully.",
                   feeStatus: "Complete fees is already paid.",
                   paymentType: paymentType,
                   amountDue : 0 ,
                   delay : 0

               })
           }
           else{
               res.status(200).json({
               
                feeStatus : "Complete fees is due.",
                amountDue: student.payment.lumpsum.amount,
                paymentType: paymentType,
                delay: curDate - student.dateOfJoin
               })
           }
       }
       else{
           let installments = student.payment.installments;
           let paid = [];
           let due = [];
           for(let i=0; i<installments.length; i++){
                if(installments[i].dueDate > curDate && installments[i].paid === false){
                    due.push(installments[i]);
                    break;
                }
                else{
                    paid.push(installments[i]);
                }
           }
           res.status(200).json({
            
            paid: paid,
            due: due
           })
        }

       }
   catch (error) {
       console.log(error);
    res.status(500).json({message: "Server error!" ,
    status : 500});
    }
       
});

router.post("/fetchData", async function(req,res){
    const scNo = req.body.scholarNumber;
    try{
        let result = await studentSchema.findOne({scholarNumber:scNo});
        if(result){
            res.status(200).json({
                message: "Data Fetched Successfully",
                name: result.firstName + " " + result.lastName,
                batch: result.batch,
                paymentType: result.paymentType,
                email: result.email,
                status: 200
            });
        }
        else{
            res.status(404).json({message: "Scholar Number is not present in our records." ,
            status : 404}); 
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server error!" ,
                            status : 500});
    } 
});

router.post("/signUp", async function(req,res){
    console.log(req.body)
    const scNo = req.body.scholarNumber;
    try{
        let result = await studentSchema.findOne({scholarNumber:scNo});
        console.log(result)
        if(result){
            const salt = await bcrypt.genSalt(10);
            result.password = await bcrypt.hash(req.body.password, salt);
            result.parent_name = req.body.parent_name;
            result.address.plotno = req.body.plotno;
            result.address.city = req.body.city;
            result.address.state = req.body.state;
            result.address.country = req.body.country;
            result.address.zipcode= req.body.zipcode;
            result.descriptor1 = req.body.descriptor1;
            result.descriptor2 = req.body.descriptor2;
            result.descriptor3 = req.body.descriptor3;
            result.save();
            res.status(200).json({
                message: "Data Saved Sucessfully.",
                status: 200
            });
        }
        else{
            res.status(404).json({message: "Some fields are missing" ,
            status : 404}); 
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server error!" ,
                            status : 500});
    } 
});

router.post("/getLectures", auths,async function(req,res){

    
    try{
        let batch = await studentSchema.findOne({_id : req.user});
        batch = batch.batch;
        // console.log(await lectureSchema.find({}));
        let result = await lectureSchema.find({batch:batch});
        if(result.length == 0){
            res.status(200).json({message: "No Lectures Available." ,
            status : 200}); 
        }
        else
        if(result){
            res.status(200).json({
                message: "Data Sent Sucessfully.",
                lectures: result,
                status: 200
            });
        }
        
        else{
            res.status(404).json({message: "Batch not found in our records." ,
            status : 404}); 
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server error!" ,
                            status : 500});
    } 
});




router.post("/login",async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    console.log(email)
    console.log(password)
    try {
        let result = await studentSchema.findOne({email:email});
        console.log(result)
        if(result!=null){
            let matched = await bcrypt.compare(password, result.password);
            if(matched){
                //generating the token
                let token  =  await result.generateAuthToken();
               
                res.status(201).json({message: "Login Succesful.", 
                                     name: result.firstName + " " + result.lastName, 
                                     email: result.email,
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
    res.status(404).json({message:`${err}` ,
                          status : 404})
   }
  });


router.get("/StudentsData" , async(req,res)=>{

    let Students = await studentSchema.find({});
    let data = [];

    for(let i = 0 ; i < Students.length ; i++){

        if(Students[i].descriptor1 == undefined || Students[i].descriptor1 == null 
            || typeof Students[i].descriptor1 == undefined || Students[i].descriptor1.length == 0){
                continue;
            }
       let obj = {
           _id : Students[i].firstName + " " + Students[i].lastName,
           descriptor1 : Students[i].descriptor1,
           descriptor2 : Students[i].descriptor2,
           descriptor3 : Students[i].descriptor3
       }
       data.push(obj)
    }

    res.status(200).json({
        data : data,
        status : 200
    })
})

router.post("/getAccountDetails" , auths, async(req,res)=>{
   try{
       let data  = await studentSchema.findOne({_id : req.user})
           

       res.status(200).json({
        
            name : data.firstName + " " + data.lastName,
            email: data.email,
            status :200
 
        
       });
   }
   catch(e){
       console.log(e)
       res.status(400).json({
           status : 400,

       })
   }
})

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
       res.status(404).json({status:404})
      }
})

module.exports = router;