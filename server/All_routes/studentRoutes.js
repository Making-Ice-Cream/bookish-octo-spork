const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const router = express.Router();
const path = require("path");

router.post("/signUp", async function(req,res){
    const email = req.body.email;
    const data ={
          "email_address": email,
          "status": "subscribed"
        }
  
    const listID = "d510b9b174";
    try {
      const response = await  mailchimp.lists.addListMember(listID, data);
      console.log(response.status);
      res.status(200).json({
          "message":"You are now subscribed to our newsletter!",
          "response-status":response.status,
          status:404
      })
      }   
      catch (err) {
          res.status(404).json({
              "message":"Something went wrong, or you maybe already subscribed to our newsletter.",
              status:404
          })
      }
  });

module.exports = router;