"use strict";


var Employer = require("../db/schema/EmployerModel.js")


const handle_request = async( msg, callback) => {
  console.log("Inside Edit Role");
  const res={};

  var query={_id:msg._id};
  var newValues=
  { $set: {
      role:msg.role,
  }
};
  var options = {upsert:true};

  Employer.updateOne(query,newValues,options,(error,data) =>{
    if(error){
      console.log("Error fetching data");
      callback(error,null);
    }
    else if(Employer){
         console.log("Updated Role");
         res.status=200;
         res.data=data;
         callback(null,res);
        }
        else{
          if(data === null){
            res.status=400;
            res.data="No details found";
            callback(null,res);
          }
        }
    });
  }


exports.handle_request = handle_request;
