const express = require("express");
const { kafkaRequest } = require("../kafka/kafkaRequest");
const db = require("../db/sql/sequelizer");
const dbPool = require("../db/sqlPool/sequelizer");
const redisClient = require("../db/redis/redisConfig");

const router = express.Router();

router.post("/insertTestReviews", (req, res) => {
  kafkaRequest("request-topic1", "insertTestReviews", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getAllReviewsK", (req, res) => {
  kafkaRequest("request-topic1", "getAllReviews", {}, (err, result) => {
    // console.log(result);
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getAllReviewsB", (req, res) => {
  db.reviews
    .findAll({ attributes: ["review"], raw: true })
    .then((result) => {
      // const array = result.map((each) => Object.values(each.dataValues));
      res.send(result);
    })
    .catch((err) => {
      console.log("failed ");
      res.status(500);
      // callback(err, null);
    });
});

router.get("/getAllReviewsP", (req, res) => {
  dbPool.reviews
    .findAll({ attributes: ["review"], raw: true })
    .then((result) => {
      res.send({ result });
      // const array = result.map((each) => Object.values(each.dataValues));
    })
    .catch((err) => {
      console.log("failed ");
      res.status(500);
      // callback(err, null);
    });
});

const allReviewsKey = "testReviews";
router.get("/getAllReviewsR", (req, res) => {
  redisClient.get(allReviewsKey, async (err, data) => {
    if (data) {
      res.send({ data });
    } else {
      //
      dbPool.reviews
        .findAll({ attributes: ["review"] })
        .then((result) => {
          const array = result.map((each) => Object.values(each.dataValues));
          console.log(array);
          redisClient.setex(allReviewsKey, 36000, JSON.stringify(array));
          // callback(null, array);
          res.send({ array });
        })
        .catch((err) => {
          console.log("failed ");
          res.status(500);
        });
    }
  });
});

module.exports = router;
