"use strict";

const Jobs= require("../db/schema/job").createModel();

const handle_request = async (msg, callback) => {
    const res = {};
    Jobs.find({companyId:msg.companyId},(error, jobs) => {
        if (error) {
            console.log('Failed to fetch data');
            callback(error, null);
          }else if(jobs){
                console.log('fetched Details');
                res.status = 200; res.data = jobs;
                callback(null, res);
                        }
              else{
                  if(jobs=== null ){
                    res.status = 400; res.data = "No details found";
                    callback(null, res);
                  }
              }
          

    });
}
exports.handle_request = handle_request;