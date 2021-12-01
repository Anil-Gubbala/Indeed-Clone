const express = require('express');
//const jwt = require('jsonwebtoken');
//const { secret } = require('../Utils/config');
//const { auth } = require("../Utils/passport");
const kafka = require('../kafka/client');
const {makeRequest}=require('../kafka/client')



const router = express.Router();


router.post('/postJob',(req, res)=>{
  console.log("in route post job");
  
    kafka.makeRequest('postJob',req.body, function(err,data){
            
      if (err){
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else if(data.status===200){
          console.log('successfully posted');
         
          res.status(200).json({ data });
             
          }else {
            console.log('Invalid data');
            
            res.end('Invalid data');
          }
      
  });
  
  });
  module.exports = router;