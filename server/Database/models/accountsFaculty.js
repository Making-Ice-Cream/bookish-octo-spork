const mongoose = require("mongoose");

const faculty = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    batch: {
        type: [String]
    },
    subject: {
        type:String
    },
    email:{
        type:String,
        required:true,
        //unique:true
    },
    password:{
        type:String,
        required:true
    },
    contact: {
        type:Number,
        required: true
    },
    imageUrl:String
});

var facultyObject = mongoose.model('faculty', faculty);

module.exports = facultyObject;