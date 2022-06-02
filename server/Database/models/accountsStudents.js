const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

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
        unique:true
    },
    password:{
        type:String,
        //required:true
    },
    address:{
        plotno: {
            type:String,
            default:" "
        },
        city: {
            type:String,
            default:" "
        },
        state: {
            type:String,
            default:" "
        },
        zipcode: {
            type:Number,
            default:0
        },
        country:{
            type:String,
            default:" "
        }
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
    },
    image_of_student:{
        type:String
    },
    forgotPass:{
        token:{
          type:String
          },
        tokenCreated: {
          type: Date, 
          default: Date.now()
        }
    },
    tokens:[{
      token:{
          type:String,
      }
  }],
});


student.methods.generateAuthToken = async function(){
    try {
      const secured_string = "helloweareheretodesignthestringwhichisverystronghopeitwillworksthanks";
      const token  = jwt.sign({_id:this._id.toString()},secured_string,{ expiresIn: '1d' });
      // console.log(token);
      this.tokens = this.tokens.concat({token:token});
      await this.save();
      return token;
      
    } catch (error) {
     console.log(error);
     res.send(error);
      
    }
  
  }
  
  // to generate forgotPass token
student.methods.hasExpired=  function(){
    var now = Date.now();
    return (now - Date.parse(this.forgotPass.createDate)) > 300000; // Date is converted to milliseconds to calculate 7 days it > one day = 24 hours * 60 minutes * 60 seconds *1000 milliseconds * 7 days = 604800000
  };

var s = mongoose.model('student', student);
module.exports = s;