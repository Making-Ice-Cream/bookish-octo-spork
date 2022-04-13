const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
    plotno: String,
    city: String,
    state: String,
    zipcode: Number,
    country:String
});

const installmentSchema = mongoose.Schema({
    dueDate: Date,
    amount: Number,
    paid: Boolean
});

const lumpsumpSchema = mongoose.Schema({
    amount: Number,
    paid: Boolean
});

const student = new mongoose.Schema({
    scholarNumber:{
        type:Number,
        required:true,
        //unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    gender: {
        type:String,
        //required:true
    },
    email:{
        type:String,
        required:true,
        //unique:true
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
    parent_name:{
        type: String
    },
    parent_contact: {
        type:Number,
        required: true
    },
    payment:{
        installments: {
            type: [installmentSchema]
        },
        lumpsum: {
            type: lumpsumpSchema
        }
    },
    dateOfJoin : {
        type: Date,
        required :true
    },
    descriptor1:{
        type: String
    },
    descriptor2:{
        type: String
    },
    descriptor3:{
        type: String
    }
});

var s = mongoose.model('student', student);

module.exports = s;