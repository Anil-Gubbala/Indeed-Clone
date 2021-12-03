"use strict";


const UserSchema = require("../db/schema/user").createModel();

const handle_request = async( msg, callback) => {
  console.log("Inside Add Company Id to User Table Service");
  const res={};

  var query={emailId:msg.emailId};
  var newValues=
  { $set: {
      companyId:msg.companyId,
  }
}

  UserSchema.updateOne(query,newValues,(error,data) =>{
    if(error){
      console.log("Error fetching data");
      callback(error,null);
    }
    else if(UserSchema){
         console.log("Updated Company Id");
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
