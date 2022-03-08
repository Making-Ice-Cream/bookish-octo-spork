const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const admin = new mongoose.Schema({
  name:{
    firstname:{
      type: String,
      required:true
    },
    lastname:{
      type: String,
      required:true
    }
  },  
  email:{
      type:String,
      required:true
    },
    password:{
        type:String,
        required:true
    },
    scholarNumber: {
      type:Number,
      required: true
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
  
  imageurl: {
    type: String
  }
});

// to generate the Jwt token
admin.methods.generateAuthToken = async function(){
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
admin.methods.hasExpired=  function(){
  var now = Date.now();
  return (now - Date.parse(this.forgotPass.createDate)) > 300000; // Date is converted to milliseconds to calculate 7 days it > one day = 24 hours * 60 minutes * 60 seconds *1000 milliseconds * 7 days = 604800000
};

var sign = mongoose.model('admin', admin);

module.exports = sign;