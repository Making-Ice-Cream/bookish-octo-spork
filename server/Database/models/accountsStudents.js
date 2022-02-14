const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const AddressSchema = mongoose.Schema({
    plotno: String,
    city: String,
    state: String,
    zipcode: Number,
    country:String
});

const student = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:AddressSchema,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    paymentype:{
        type:String,
        required:true
    },
    url1:String,
    url2:String
});