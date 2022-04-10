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
    link: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: false
    }

});

var lectureObj = mongoose.model('lecture', lecture);

module.exports = lectureObj;