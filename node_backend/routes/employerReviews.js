const router = require ("express").Router();
var kafka = require("../kafka/client");
const { makeRequest } = require("../kafka/client");


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

module.exports = router;
