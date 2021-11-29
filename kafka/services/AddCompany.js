"use strict";


const companySchema = require("../db/schema/company").createModel();

  const handle_request = async (msg,callback) => {
    console.log("Inside add company details kafka backend");
    console.log(msg);
    const res={};
      companySchema.findOne({_id:msg._id}, (error,data) => {
        if(error){
          res.writeHead(400,{
            "content-type":"text/plain",
          })
          console.log("Mongo Error");
          callback(error,null);
        }
        else{
          console.log("Fetching result");
          if(data){
                  console.log("Company Details already exists")
                  res.status=400;
                  res.data="The details have already been added"
                  callback(null, res);
                }
          else{
           var newCompany = new companySchema({
               website: msg.website,
               companySize: msg.companySize,
               companyType:msg.companyType,
               revenue:msg.revenue,
               headquaters:msg.headquaters,
               industry:msg.industry,
               founded:msg.founded,
               mission:msg.mission,
               ceo:msg.ceo,
               companyPicture:msg.companyPicture,
               companyLogo:msg.companyLogo,
               ceoImage:msg.ceoImage,
          });
              newCompany.save((insertErr,insertData) => {
              if(insertErr){
              console.log(insertErr)
              res.status=400;
              res.data="Cannot insert company details details into db"
                callback(null,error);
              }else{
                console.log("Inserted Successfully")
              res.status=200;
              res.data=insertData;
                callback(null, res);
              }
            });
          }
          }
        });
      }


exports.handle_request = handle_request;
