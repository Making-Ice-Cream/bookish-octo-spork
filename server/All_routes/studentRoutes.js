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

router.post("/feeStatus", async function(req, res){
   try {
       let student = await studentSchema.findOne({scholarNumber: req.body.scholarNumber});
       let curDate = new Date();
       const paymentType = student.paymentType;
       if(paymentType === "Lump Sum"){
           if(student.payment.lumpsum.paid === true){
               res.status(200).json({
                   message: "Data sent successfully.",
                   feeStatus: "Complete fees is already paid.",
                   paymentType: paymentType
               })
           }
           else{
               res.status(200).json({
                message: "Data sent successfully.",
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
            message: "Data sent successfully.",
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

router.post("/getLectures", async function(req,res){
    const batch = req.body.batch;
    try{
        let result = await lectureSchema.find({batch:batch});
        if(result.length == 0){
            res.status(200).json({message: "No Lectures Available." ,
            status : 4200}); 
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
    try {
        let result = await studentSchema.findOne({email:email});
        //console.log(result)
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

module.exports = router;