const express = require('express');
//const jwt = require('jsonwebtoken');
//const { secret } = require('../Utils/config');
//const { auth } = require("../Utils/passport");
const kafka = require('../kafka/client');
const {makeRequest}=require('../kafka/client');


const router = express.Router();
router.post('/viewApplicants',(req, res)=>{
    console.log("Route view jobs: ")
      kafka.makeRequest('viewApplicants', req.body, function(err, data){
      if (err) {
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("system error");
      }else if (data.status === 200) {
        let applicants=[];
        for(let i=0;i<data.data.length;i++){
            let appDetails={
            _id: data.data[i]._id,
            userId: data.data[i].userId,
            userName: data.data[i].userName,
            companyId: data.data[i].companyId,
            jobId:data.data[i].jobId,
            status:data.data[i].status,
            resume:data.data[i].resume,
            coverLetter:data.data[i].coverLetter,
           
            
                    } 
                    applicants.push(appDetails);           
                }
                
             
          res.status(200).json({ applicants});
     
      }else {
        
        res.writeHead(400, {
          "content-type": "text/plain",
        });
        res.end("Cannot fetch details");
        
      }
    });
  });

  module.exports = router;