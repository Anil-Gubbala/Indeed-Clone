const router = require ("express").Router();
var kafka = require("../kafka/client");
const { makeRequest } = require("../kafka/client");

router.put("/EditCompanyAddress",(req,res) =>{
  console.log("Inside Employer Edit Address Page");
  kafka.makeRequest("EditCompanyAddress",req.body,(err,data) =>{
    if(err){
      res.writeHead(400,{
        "Content-type":"text/plain",
      });
      res.end("Cannot save employer address details");
    }
    else if(data.status===200){
      let payload={
        address: {
          streetAddress: data.data.streetAddress,
          city: data.data.city,
          state: data.data.state,
          zipCode: data.data.zipCode,
        }
      }
      console.log("payload in backend",JSON.stringify(payload))
      res.status(200).json({payload});
  }
    else{
      res.writeHead(400,{
        "Content-type":"text/plain",
      })
      res.end("Error saving employer name")
    }
  })
})

module.exports = router;
