const mongoose = require("mongoose");

const lecture = new mongoose.Schema({
    code:{
        type: String,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    subject:{
        type: String,
        required:true
    },
    link: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    time:{
        type: Date
    }
});

var lectureObj = mongoose.model('lecture', lecture);

module.exports = lectureObj;