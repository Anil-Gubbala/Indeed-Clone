"use strict";

const Applications=require('../db/schema/jobApplication').createModel()

const handle_request = async (msg, callback) => {
    const res = {};
    Applications.find({jobId:msg.jobId},(error, applications) => {
          if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(applications){
                console.log('fetched Details');
                res.status = 200; res.data = applications;
                console.log(res);
                callback(null, res);
              }
              else{
                  if(applications== null ){
                    res.status = 400; res.data = "No details found";
                    callback(null, res);
                  }
              }
          

    });
}
exports.handle_request = handle_request;