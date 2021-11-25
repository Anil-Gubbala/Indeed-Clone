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

// function randomDate(start, end) {
//   return new Date(
//     start.getTime() + Math.random() * (end.getTime() - start.getTime())
//   );
// }

function randomDate() {
  const start = new Date(2021, 10, 15); // date month starts from 0
  const startHour = 0;
  const endHour = 23;
  const end = new Date();
  const date = new Date(+start + Math.random() * (end - start));
  const hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date;
}

// const d = randomDate(new Date(2012, 0, 1), new Date());

const getRandomCompany = () => {
  const Array = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10"];
  const random = Math.floor(Math.random() * Array.length);
  return Array[random];
};

const getRandomUser = () => {
  const Array = ["u1", "u2", "u3", "u4", "u5", "u6", "u7", "u8", "u9", "u10"];
  const random = Math.floor(Math.random() * Array.length);
  return Array[random];
};

const getRandomCEO = () => {
  const Array = ["o1", "o2", "o3", "o4", "o5", "o6", "o7", "o8", "o9", "o10"];
  const random = Math.floor(Math.random() * Array.length);
  return Array[random];
};

const insertTestReviews = (msg, callback) => {
  const reviewsList = [];
  for (let i = 0; i < 100000; i++) {
    const reviewObject = {
      // comapanyId: (Math.random() + 1).toString(36).substring(7),
      companyId: getRandomCompany(),
      userId: getRandomUser(),
      // date: randomDate(new Date(2021, 11, 15), new Date()),
      date: randomDate(),
      upVotes: getRandomInt(10000),
      downVotes: getRandomInt(10000),
      rating: getRandomInt(5),
      summary: (Math.random() + 1).toString(36).substring(10),
      review: (Math.random() + 1).toString(36),
      pros: (Math.random() + 1).toString(36).substring(7),
      cons: (Math.random() + 1).toString(36).substring(7),
      approval: Math.random() < 0.5,
      prep: (Math.random() + 1).toString(36).substring(7),
      status: getRandomInt(2),
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
