"use strict";


const companySchema = require("../db/schema/company").createModel();


const handle_request = async( msg, callback) => {
  console.log("Inside company Page");
  const res={};

  companySchema.find({_id:msg._id},{
    website:1,headquaters:1,companySize:1,companyType:1,ceo:1,founded:1,revenue:1,industry:1,mission:1
  },(error,data) =>{
    if(error){
      console.log("Error fetching data");
      callback(error,null);
    }
        else{
          console.log("callback",callback);
          res.status=200;
          res.data=data;
          callback(null,res);
          }
      });
    }


exports.handle_request = handle_request;
