const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const path = require("path");
const generator = require('generate-password');
const nodemailer = require('nodemailer');
const fs = require("fs");
const handlebars = require('handlebars');
const smtpTransport = require('nodemailer-smtp-transport');
const crypto = require('crypto');

const signupSchema = require("../Database/models/accountsAdmin");
const studentSchema = require("../Database/models/accountsStudents");
const facultySchema = require("../Database/models/accountsFaculty");
const sentEmail = require("../sentEmail");


const jwt = require('jsonwebtoken');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.json());

router.post("/login",async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    try {
        let result = await signupSchema.find({email:email});
        //console.log(result)
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
                                     imageurl: result[0].imageurl,
                                     studentsRegistered: result[0].scholarNumber,
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
        const token = req.body.token === undefined || null ? req.headers.batch : req.body.token ;
        // console.log(token)
        const secured_string = process.env.TOKEN_GEN_KEY;
        
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
router.post("/student/newstudent",async(req,res)=>{
    var installmentDate = new Date();
    let email = req.body.email;
    let schoNum = req.body.scholarNumber;
    let alreadyExist = await studentSchema.find({email:email});
    if(alreadyExist.length !== 0){
        res.status(400).json({message: "Student Already Exists." ,
                            status : 400});
    }
    else{
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
    newst.dateOfJoin = new Date();
    await signupSchema.updateOne({},{$set:{'scholarNumber': curScholarNo+1}});
    
    try {
        newst.save();
        const filePath = path.join(__dirname, '../emailTemplates/signupStudent.html');
        const replacements = {
            Username: req.body.firstName,
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
}
});

// adding add teacher route
router.post("/faculty/newfaculty",async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let newfct = new facultySchema(req.body);; 
    const salt = await bcrypt.genSalt(10);
    newfct.password = await bcrypt.hash(newfct.password, salt);
    try {
        newfct.save();
        const filePath = path.join(__dirname, '../emailTemplates/signupFaculty.html');
        const replacements = {
            Username: req.body.fullName,
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

router.post("/student/scholarNumber",auths, async(req,res)=>{
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
                
                    item.payment.installments[installmentNumber - 1].paid  =  true
                        item.save();
                    }
                 )
                 res.status(201).json({message: "Fee submitted successfully",
                 status : 201,
             });
            }
            catch(err){
                res.status(500).json({message: "Server Error.",
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

router.post("/pendingDues", async(req, res) =>{
    // console.log(req) 
    // console.log(req.body)
    // console.log(req.headers)
    // console.log(req.data.get("batch"))
    const batch = req.headers.batch;
    console.log(batch);
    try{
    let stu = await studentSchema.find({batch: batch, paymentType: "Installments"});
    class pendStudent {
        constructor(scholarNumber, name, installmentNumber, Amount, dueDate) {
          this.scholarNumber = scholarNumber;
          this.installNumber = installmentNumber;
          this.name = name;
          this.Amount = Amount;
          this.dueDate = new Date(dueDate).toLocaleDateString("en-IN");
        }
    }
    let result = [];
    for(let i=0; i<stu.length; i++){
        const curStudent = stu[i];
        let instNo = -1;
        let curDate = new Date();
        let dDate = new Date();
        let amount = 0;
        for(let j=0; j<curStudent.payment.installments.length; j++){
            if(curStudent.payment.installments[j].paid === false && curStudent.payment.installments[j].dueDate < curDate){
                dDate = curStudent.payment.installments[j].dueDate;
                amount = curStudent.payment.installments[j].amount;
                instNo = j+1;
                break;
            }
        }
        if(instNo !== -1)
        result.push(new pendStudent(curStudent.scholarNumber,
                                    curStudent.firstName + " " + curStudent.lastName,
                                    instNo, amount, dDate));
    }
    res.status(201).json({message: "Data sent successfully.",
                                 studentsPendingFee: result,
                                 status : 201,
                            });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error.",
                                 status : 500,
                            });
    }
});

router.get("/students" , async(req,res)=>{
    try{

         let data = await studentSchema.find({});
        
        //  console.log(data);
         
         if(data){
            let result_data = [] ;

            for(let  i = 0 ; i < data.length ;  i++){

                let obj = {
                    name : data[i].firstName +" " + data[i].lastName,
                    scholarNumber : data[i].scholarNumber,
                    gender:data[i].gender,
                    email:data[i].email,
                    batch : data[i].batch,
                    contact:data[i].contact,
                    paymentType : data[i].paymentType,
                    url : data[i].url1,
                    payment : data[i].payment,
                    id : data[i]._id
        
                }
                result_data.push(obj);
            }

            res.status(200).json({
                message: "Students Data Sent Successfully",
                status : 200,
                data : result_data
            })



         }else{
             res.status(400).json({
                 message : "An Error Occured!",
                 status : 400
             })
         }


    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Server Error!",
            status : 500
        })
    }

})

router.post("/resetPassword" , async(req,res)=>{
    const email = req.body.email;
    let oldPwd = req.body.oldPassword;
    let newPwd = req.body.newPassword;
    const salt = await bcrypt.genSalt(10);
    
    if(oldPwd === newPwd){
        res.status(400).json({
            message: "New Password and old password cannot be the same.",
            status : 400,
        })
    }

    try{
            let result = await signupSchema.findOne({email:email});
            let matched = await bcrypt.compare(oldPwd, result.password);
            if(matched){
                result.password = await bcrypt.hash(newPwd, salt);
                result.save();
                res.status(200).json({
                    message: "Reset Password Successful.",
                    status : 200,
                })
            }
            else{
                res.status(400).json({
                    message : "Old Password is incorrect.",
                    status : 400
                })
            }
            
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Server Error!",
            status : 500
        })
    }
})

router.post("/forgotPassword" , async(req,res)=>{

    let email = req.body.email;

    const token = crypto.randomBytes(31).toString('hex');
    let Username ;
    let a = await signupSchema.findOne({email});
     a != null || undefined ? Username = a.name.firstname + " " + a.name.lastname : " ";
         if( a == null || !a ){
       
            res.status(400).json({
                message:"Invaild Email",
                status: 400
            })
            return ;
         }

    try{
       
        console.log(token);
        signupSchema.findOne({email}).then(item =>{
            item.forgotPass.token = token;
            item.save();
            }
         ).catch((err)=>{
             console.log(err)
         });

         


        const filePath = path.join(__dirname, '../emailTemplates/ForgotPass.html');
        const replacements = {
            Username: Username,
            id: email,
            link: `http://localhost:3000/forgot/Password/?token=%22${token}%22&email=%22${email}%22`
        };
        sentEmail.sendEmail(email, "Reset Password", filePath, replacements);
        res.status(200).json({
            message: "Password is Reset",
            status: 200
        })



    }
    catch(error){
        console.log(error);
        res.status(500).json({
            status:500,
            message:"Server Error!"
        })
    }


})

router.post("/verifyForgotPassToken" , async(req,res)=>{
      let email = req.body.email;
      let token = req.body.token;
    //   console.log(email);
    //   console.log(token);

      let d = await signupSchema.findOne({email});
      console.log(d)

      if(d){
        //   console.log("583");
        //   console.log(d.hasExpired() === false);
        //   console.log(d.forgotPass.token === token);
        //   console.log(d.forgotPass.token);
        //   console.log(d.hasExpired())

          if(d.forgotPass.token === token && !d.hasExpired()){
            res.status(200).json({
                status:200
            })
          }
          else{
            res.status(400).json({
                status:400
            })
          }
         
      }
      else{
          res.status(400).json({
              status:400
          })
      }


})

router.post("/updatePassword" , async(req,res)=>{
    let email = req.body.email;
    // console.log(email);
    let password =await bcrypt.hash( req.body.password,10);
    
    
    let checkToken = await signupSchema.findOne({email});
    if(checkToken){

        if(checkToken.forgotPass.token !== req.body.token){
                res.status(402).json({
                    "message":"Invalid Operation",
                    status : 402
                })
                return ;
        }
    }
    else{
        res.status(402).json({
            "message":"Invalid Operation",
            status : 402
        })
        return ;
    }


    try{
    signupSchema.findOne({email}).then(item =>{
        item.password = password;
        item.save();
        }
       
     ).catch((err)=>{
         console.log(err);
         res.status(404).json({
            "message":"An Error Occured!",
            status:404
        })
     });
     res.status(201).json({
        "message":"PassWord Changed",
        status:201
    })
    }
    catch(err){
        res.status(500).json({
            message:"Server Error",
            status:500
        })
    }

    
    


})

router.post("/saveChangesToProfile" , auths, async(req,res)=>{
    let objId = req.user;
    let newemail = req.body.email;
    let username = req.body.name;
    let nameParts = username.split(" ");
    let nfirstname = "", nlastname = "";
    if(nameParts.length === 2){
         nfirstname = nameParts[0];
         nlastname = nameParts[1];
    }
    
    try {
        
        let r = signupSchema.findOne({_id: objId}).then(item =>{
            item.email = newemail;
            item.name.firstname = nfirstname;
            item.name.lastname = nlastname;
            item.save();
            });
        
        res.status(201).json({
            "message":"Data Saved.",
            status:201
        })
    } catch (error) {
        res.status(201).json({
            "message":"Some error occured.",
            status:404
        })
    }
    
})

router.post("/getAccountDetails" , auths, async(req,res)=>{
   try{
       let data  = await signupSchema.findOne({id : req.userid})
           

       res.status(200).json({
        
            name : data.name.firstname + " " + data.name.lastname,
            email: data.email,
            status :200
 
        
       });
   }
   catch(e){
       res.status(400).json({
           status : 400,

       })
   }
})
module.exports = router;