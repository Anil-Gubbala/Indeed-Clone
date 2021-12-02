const router = require ("express").Router();
var kafka = require("../kafka/client");
const { makeRequest } = require("../kafka/client");

var constraints = require('../kafka/config');
const config = require('../Utils/config')
var mysql = require('mysql');

const sqlconnection = mysql.createPool({
  host: constraints.DB.host,
  user: constraints.DB.username,
  password: constraints.DB.password,
  port: constraints.DB.port,
  database: constraints.DB.database,
});


sqlconnection.getConnection((err) => {
  if (err) {
    throw 'Error occured ' + err.message;
  }
  console.log('pool created');
});

router.get("/empReviews/getCompanyReviews", (req, res) => {
  kafka.makeRequest("empReviews",req.body,(err,data) =>{
    if (err) {
      res.status(500).send({});
    } else {
      let reviews=[];
      for(let i=0;i<data.data.length;i++){
        let reviewDetails = {
          _id:data.data[i]._id,
          companyId:data.data[i].companyId,
          userId:data.data[i].userId,
          upVotes:data.data[i].upVotes,
          downVotes:data.data[i].downVotes,
          rating:data.data[i].rating,
          summary:data.data[i].summary,
          review:data.data[i].review,
          pros:data.data[i].pros,
          cons:data.data[i].cons,
          createdAt:data.data[i].createdAt,
          featured:data.data[i].featured,
        }
        reviews.push(reviewDetails);
      }
      // console.log(reviews)
      res.status(200).json({reviews});
    }
  });
});

router.post("/empReviews/markAsFeatured", (req, res) => {
  kafka.makeRequest("featured",req.body,(err,data) =>{
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).json(data);
    }
  });
});

router.post("/empReviews/avgrating",(req,res)=>{
  const {companyId} = req.body;
  try{
    sqlconnection.query(`SELECT avg(rating) as avgrating, count(*) as totalreviews FROM reviews WHERE companyId=?`,companyId
       ,  function (error,results){
          console.log(results);
         if(results.length !== 0){
            res.send(JSON.stringify(results));
         }
        });
  }
  catch(err){
    console.log(err);
 const message = err.message
      ? err.message
       : "Error while getting user Details";
     const code = err.statusCode ? err.statusCode : 500;
     return response.status(code).json({ message });
  }
})

module.exports = router;
