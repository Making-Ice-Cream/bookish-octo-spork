const mongoose = require("mongoose");
const dburl = process.env.DATABASE_URL;

mongoose.connect(dburl,{useNewUrlParser: true}).then(()=>{
    console.log('Connected With database');
}).catch((err)=>{
    console.log(err);
});