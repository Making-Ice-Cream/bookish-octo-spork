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
    tokens:[{
      token:{
          type:String,
      }
  }]
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

var sign = mongoose.model('admin', admin);

module.exports = sign;