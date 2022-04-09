const mongoose = require("mongoose");

const query = new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    resolution:{
        type: String
    },
    author:{
        name:{
            type:String
        },
        category:{
            type:String
        }
    },
    resolved: {
        type: Boolean,
        default: false
    }
})


var queryObj = mongoose.model('query', query);

module.exports = queryObj;