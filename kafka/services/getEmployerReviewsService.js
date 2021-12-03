"use strict";

const conn = require("../db/sql/sqlConnector.js");

const sql = {
  companyReviews: `select * from indeed.reviews where companyId=? and status=?`,
};

const handle_request = (msg, callback) => {
  const res={};
  conn.query(sql.companyReviews,[msg.companyId,msg.status],(err, data) => {
    if (err) {
      callback(err, null);
    } else {
      res.data=data;
      res.status=200;
      console.log("data",res.data)
      callback(null, res);
    }
  });
  // callback(null, {});
};



  exports.handle_request = handle_request;
