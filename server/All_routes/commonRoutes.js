const express = require("express");
const router = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");

router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(express.static("public"));

mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    server: "us14",
  });

router.post("/subscribeNewsletter", async function(req,res){
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
            "message":"Something went wrong.",
            status:404
        })
    }
});


module.exports = router;