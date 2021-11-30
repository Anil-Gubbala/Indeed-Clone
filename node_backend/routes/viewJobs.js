const express = require('express');
//const jwt = require('jsonwebtoken');
//const { secret } = require('../Utils/config');
//const { auth } = require("../Utils/passport");
const kafka=require('../kafka/client');
const { makeRequest }= require("../kafka/client");



const router = express.Router();
router.post('/viewJobs',(req, res)=>{
    console.log("Route view jobs: ")
    kafka.makeRequest('viewJobs', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
        let jobsPosted=[];
        for(let i=0;i<data.data.length;i++){
            let jobDetails={
            _id: data.data[i]._id,
            CompanyId: data.data[i].companyId,
            JobTitle: data.data[i].jobTitle,
            JobType:data.data[i].work,
            Type:data.data[i].type,
            Street:data.data[i].street,
          
              City:data.data[i].location.city,
              State:data.data[i].location.state,
              Zip:data.data[i].location.zip,
            

                    } 
                    jobsPosted.push(jobDetails);           
                }
                
           console.log(jobsPosted);   
          res.status(200).json({ jobsPosted});
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("Cannot fetch details");
        
      }
    });
  });

  module.exports = router;