"use strict";

const Application= require("../db/schema/jobApplication").createModel();

const handle_request = async (msg, callback) => {
    const res = {};
    Application.findOne({ _id: msg.id}, (error, applications) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(applications){
             
            Application.updateOne(
                    {
                        _id:msg.id
                    },
                   {
                    $set:{
                        status:msg.status
                    },
                   },
                   (updateErr, updatedData) => {
                    if (updateErr) {
                      err.status = 400; err.data = "cannot update ";
                      console.log('err data', err);
                      callback(null, err);
                    } else {
                      res.status = 200; res.data = updatedData;
                      console.log('updated data', res);
                      callback(null, res);
                    }
                  },
                )
        }
              else{
                  if(applications=== null ){
                    res.status = 400; res.data = "No details found";
                    callback(null, res);
                  }
              }
          

    });
}
exports.handle_request = handle_request;