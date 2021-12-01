const router = require ("express").Router();
var kafka = require("../kafka/client");
const { makeRequest } = require("../kafka/client");

router.put("/EditCompanyRole",(req,res) =>{
  console.log("Inside Employer Edit Role Page");
  kafka.makeRequest("EditCompanyRole",req.body,(err,data) =>{
    if(err){
      res.writeHead(400,{
        "Content-type":"text/plain",
      });
      res.end("Cannot save employer name details");
    }
    else if(data.status===200){
      let payload={
        role:data.data.role,
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
