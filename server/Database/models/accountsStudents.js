const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
    plotno: String,
    city: String,
    state: String,
    zipcode: Number,
    country:String
});

const student = new mongoose.Schema({
    scholarNumber:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        //required:true
    },
    address:{
        type:AddressSchema,
        //required:true
    },
    batch:{
        type:String,
        required:true
    },
    paymentType:{
        type:String,
        required:true
    },
    contact: {
        type:Number,
        required: true
    },
    parent_contact: {
        type:Number,
        required: true
    },
    url1:String,
    url2:String
});

var s = mongoose.model('student', student);

module.exports = s;