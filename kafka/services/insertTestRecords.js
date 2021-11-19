const db = require("../db/sql/sequelizer");
const redisClient = require("../redis/redisConfig");
const { doInsert } = require("../utils/doQuery");

const ReviewSchema = require("../db/schema/review").createModel();

const crypto = require("crypto");

const id = crypto.randomBytes(20).toString("hex");

const { reviews } = db;
const { Op } = db.Sequelize;

const allReviewsKey = "testReviews";

const getAllReviews = (msg, callback) => {
  // Mongodb..........
  // ReviewSchema.find()
  //   .select(["review", "-_id"])
  //   .then((result) => {
  //     console.log("done");
  //     callback(null, result);
  //   })
  //   .catch((err) => {
  //     callback(err, null);
  //   });
  // Redis............
  redisClient.get(allReviewsKey, async (err, data) => {
    if (err) {
      callback(err, null);
    }
    if (data) {
      // console.log(data);
      //   res.data = result;
      //   res.status = 200;
      //   console.log(data);
      //   callback(null, data);
      // callback(null, {});
      callback(null, { data });
    } else {
      //
      reviews
        .findAll({ attributes: ["review", "rating", "_id"] })
        .then((result) => {
          const array = result.map((each) => Object.values(each.dataValues));
          console.log(array);
          redisClient.setex(allReviewsKey, 36000, JSON.stringify(array));
          // callback(null, array);
          callback(null, {});
        })
        .catch((err) => {
          console.log("failed ");
          callback(err, null);
        });
    }
  });
  // Mysql........
  // reviews
  //   .findAll({ attributes: ["review"] })
  //   .then((result) => {
  //     console.log("done");
  //     callback(null, {});
  //   })
  //   .catch((err) => {
  //     console.log("failed ");
  //     callback(err, null);
  //   });
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const insertTestReviews = (msg, callback) => {
  const reviewsList = [];
  for (let i = 0; i < 100000; i++) {
    const reviewObject = {
      comapanyId: (Math.random() + 1).toString(36).substring(7),
      userId: (Math.random() + 1).toString(36).substring(7),
      date: Date.now(),
      upVotes: getRandomInt(10000),
      downVotes: getRandomInt(10000),
      rating: getRandomInt(5),
      summary: (Math.random() + 1).toString(36).substring(10),
      review: (Math.random() + 1).toString(36),
      pros: (Math.random() + 1).toString(36).substring(7),
      cons: (Math.random() + 1).toString(36).substring(7),
      approval: Math.random() < 0.5,
      prep: (Math.random() + 1).toString(36).substring(7),
    };
    reviewsList.push(reviewObject);
  }

  reviews
    .bulkCreate(reviewsList)
    .then((result) => {
      // console.log("inserted test records");
      //   result.forEach((each) => {
      //     redisClient.setex(each._id, 36000, JSON.stringify(result));
      //   });
      // const data = result.map((each) => Object.values(each));
      // redisClient.setex(allReviewsKey, 36000, JSON.stringify(data));
      callback(null, {});
    })
    .catch((err) => {
      console.log("failed ");
      callback(err, null);
    });
  //   db.query();
  //   ReviewSchema.insertMany(reviewsList)
  //     .then((result) => {
  //       console.log("inserted test records");
  //       callback(null, result);
  //     })
  //     .catch((err) => {
  //       console.log("failed ");
  //       callback(err, null);
  //     });
};

module.exports = { insertTestReviews, getAllReviews };
