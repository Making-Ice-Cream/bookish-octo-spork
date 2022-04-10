const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const path = require("path");
const studentSchema = require("../Database/models/accountsStudents");

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.json());

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
    const scNo = req.body.scholarNumber;
    try{
        let result = await studentSchema.findOne({scholarNumber:scNo});
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

module.exports = router;