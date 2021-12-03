const router = require ("express").Router();
var kafka = require("../kafka/client");
const { makeRequest } = require("../kafka/client");

router.put("/website",(req,res) =>{
  console.log("Inside Employer Edit Role Page");
  kafka.makeRequest("changeWebsite",req.body,(err,data) =>{
    if(err){
      res.writeHead(400,{
        "Content-type":"text/plain",
      });
      res.end("Cannot save employer name details");
    }
    else{
      let payload={
        website:data.data.website,
      }
      console.log("payload in backend",JSON.stringify(payload))
      res.status(200).json({payload});
    }
  })
})

router.put("/size",(req,res) =>{
  console.log("Inside Employer Edit Size Page");
  kafka.makeRequest("changeSize",req.body,(err,data) =>{
    if(err){
      res.writeHead(400,{
        "Content-type":"text/plain",
      });
      res.end("Cannot save company size details");
    }
    else{
      let payload={
        companySize:data.data.companySize,
      }
      console.log("payload in backend",JSON.stringify(payload))
      res.status(200).json({payload});
    }
  })
})

router.put("/type",(req,res) =>{
  console.log("Inside Employer Edit Role Page");
  kafka.makeRequest("changeType",req.body,(err,data) =>{
    if(err){
      res.writeHead(400,{
        "Content-type":"text/plain",
      });
      res.end("Cannot save employer name details");
    }
    else{
      let payload={
        companyType:data.data.companyType,
      }
      console.log("payload in backend",JSON.stringify(payload))
      res.status(200).json({payload});
    }
  })
})

router.put("/revenue",(req,res) =>{
  console.log("Inside Employer Edit Role Page");
  kafka.makeRequest("changeRevenue",req.body,(err,data) =>{
    if(err){
      res.writeHead(400,{
        "Content-type":"text/plain",
      });
      res.end("Cannot save employer name details");
    }
    else{
      let payload={
        revenue:data.data.revenue,
      }
      console.log("payload in backend",JSON.stringify(payload))
      res.status(200).json({payload});
    }
  })
})

router.put("/headquaters",(req,res) =>{
  console.log("Inside Employer Edit Role Page");
  kafka.makeRequest("changeHeadquaters",req.body,(err,data) =>{
    if(err){
      res.writeHead(400,{
        "Content-type":"text/plain",
      });
      res.end("Cannot save employer name details");
    }
    else{
      let payload={
        headquaters:data.data.headquaters,
      }
      console.log("payload in backend",JSON.stringify(payload))
      res.status(200).json({payload});
    }
  })
})

router.put("/industry",(req,res) =>{
  console.log("Inside Employer Edit Role Page");
  kafka.makeRequest("changeIndustry",req.body,(err,data) =>{
    if(err){
      res.writeHead(400,{
        "Content-type":"text/plain",
      });
      res.end("Cannot save employer name details");
    }
    else{
      let payload={
        industry:data.data.industry,
      }
      console.log("payload in backend",JSON.stringify(payload))
      res.status(200).json({payload});
    }
  })
})

router.put("/founded",(req,res) =>{
  console.log("Inside Employer Edit Role Page");
  kafka.makeRequest("changeFounded",req.body,(err,data) =>{
    if(err){
      res.writeHead(400,{
        "Content-type":"text/plain",
      });
      res.end("Cannot save employer name details");
    }
    else{
      let payload={
        founded:data.data.founded,
      }
      console.log("payload in backend",JSON.stringify(payload))
      res.status(200).json({payload});
    }
  })
})

router.put("/mission",(req,res) =>{
  console.log("Inside Employer Edit Role Page");
  kafka.makeRequest("changeMission",req.body,(err,data) =>{
    if(err){
      res.writeHead(400,{
        "Content-type":"text/plain",
      });
      res.end("Cannot save employer name details");
    }
    else{
      let payload={
        mission:data.data.mission,
      }
      console.log("payload in backend",JSON.stringify(payload))
      res.status(200).json({payload});
    }
  })
})

router.put("/ceo",(req,res) =>{
  console.log("Inside Employer Edit Role Page");
  kafka.makeRequest("changeCEO",req.body,(err,data) =>{
    if(err){
      res.writeHead(400,{
        "Content-type":"text/plain",
      });
      res.end("Cannot save employer name details");
    }
    else{
      let payload={
        ceo:data.data.ceo,
      }
      console.log("payload in backend",JSON.stringify(payload))
      res.status(200).json({payload});
    }
  })
})



module.exports = router;
