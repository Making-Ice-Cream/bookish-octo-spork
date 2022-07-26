require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./Database/conn");
const routes = require("./routes")

const port = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(port, (req,res)=>{
    console.log("Server started at port "+ port);
});