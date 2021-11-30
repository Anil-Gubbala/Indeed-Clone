const router = require ("express").Router();
var kafka = require("../kafka/client");
const { makeRequest } = require("../kafka/client");


router.get("/GetCompany", (req, res) => {
  console.log("Inside get company details");
  kafka.makeRequest("GetCompany",req.query, (err,data)=>{
        if(err) {
        res.writeHead(400,{
            "Content-type":"text/plain",
          })
          console.log(err);
          res.end("Server error")
        }
      else{
          console.log("I am here")
          console.log("payload in backend",data)
          res.status(200).json({data});
    }
    })
  })


module.exports = router;
