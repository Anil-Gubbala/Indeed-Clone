const router = require ("express").Router();
var kafka = require("../kafka/client");
const { makeRequest } = require("../kafka/client");


router.post("/Profile",(req,res) =>{
  console.log("Inside Get Employer Profile Page");
  console.log("req.body",req.body);
  kafka.makeRequest("Profile",req.body,(err,data) =>{
    console.log("err data",err)
    if(err){
      res.writeHead(400,{
        "Content-type":"text/plain",
      });
          console.log(err)
      res.end("Cannot fetch employer details");
    }
    else if(data.status===200){
      if(data.data==null){
        const payload = "Looks like you have not yet entered your details! Please enter your details to save it!"
        res.status(200).json({payload});
        console.log("payload in profile",payload)
      }
      else{
      const payload={
        firstName:data.data.employerName.firstName,
        lastName:data.data.employerName.lastName,
        role:data.data.role,
        streetAddress:data.data.address.streetAddress,
        city:data.data.address.city,
        state:data.data.address.state,
        zipCode:data.data.address.zipCode,
      }
      res.status(200).json({payload});
      // console.log("landing page");
      // res.end(JSON.stringify(data));
      console.log("payload in profile",payload)
    }
  }
    else{
          console.log(err)
      res.writeHead(400,{
        "Content-type":"text/plain",
      })
      res.end("Error fetching profile details")
    }
  })
})


module.exports = router;
