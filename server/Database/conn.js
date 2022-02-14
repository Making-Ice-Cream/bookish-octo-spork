const mongoose = require("mongoose");
const dburl = `mongodb+srv://Shreenavk:NuLWllTS2kDbskTX@cluster0.4qsiy.mongodb.net/CMDb`;

mongoose.connect(dburl,{useNewUrlParser: true}).then(()=>{
    console.log('Connected With database');
}).catch((err)=>{
    console.log(err);
});