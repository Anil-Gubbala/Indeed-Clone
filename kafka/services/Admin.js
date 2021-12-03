const mongoose = require("mongoose");
const conn = require("../db/sql/sqlConnector.js");

const sql = {
  reviewesPerDay:
    "select Date(date) as dateOnly, count(*) as total FROM indeed.reviews WHERE date  between  ? and ? group by dateOnly ;",
  top10ReviewedCompanies:
    "select  companyId, count(*) as total from indeed.reviews where status = 1 group by companyId order by total DESC  limit 5 ",
  top10RatedCompanies:
    "select  companyId, AVG(rating) as total from indeed.reviews where status = 1 group by companyId order by total DESC  limit 5 ",
  topUsers:
    "select  userId, count(*) as total from indeed.reviews where status = 1 group by userId order by total desc limit 5",
  topCEO:
    "select  companyId, AVG(approval) as total from indeed.reviews where status = 1 group by companyId order by total DESC  limit 10",
  unFilteredReviews: "select * from indeed.reviews where status = 0",
  flagReview: "update indeed.reviews set status = ? where _id = ? limit 10",
};

const CompanySchema = require("../db/schema/company").createModel();
const UserSchema = require("../db/schema/user").createModel();
const ApplicationSchema = require("../db/schema/jobApplication").createModel();
const ImageSchema = require("../db/schema/image").createModel();
const JobApplicationSchema =
  require("../db/schema/jobApplication").createModel();

const getDate = (date = new Date()) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toJSON()
    .substring(0, 10);
};

const updateView = (msg, callback) => {
  console.log(msg);
  let date = getDate();
  const views = {};
  const key = `views.${date}`;
  views[key] = 1;
  console.log(views);
  let checkExist = {};
  checkExist[key] = { $exists: "true" };

  // CompanySchema.findOne({[key]:{$exists:true}}).lean().then((result)=>{
  //   console.log(result);
  // }).catch((err1)=>{
  //   callback(err1, null);
  // })

  CompanySchema.findOneAndUpdate(
    { _id: msg.data._id },
    // { $set: { "views.date": new Date() }, $inc: { "views.count": 1 } },
    { $inc: views },
    { upsert: true, new: true }
  )
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const getMostViewedCompanies = (msg, callback) => {
  let date = msg.data.date;
  // let date = getDate(new Date(msg.data.date));
  // date = date.toJSON().substring(0, 10);
  const sort = {};
  const key = `views.${date}`;
  sort[key] = -1;
  const filter = {};
  filter[key] = { $gte: 1 };
  CompanySchema.find(filter)
    .sort(sort)
    .select(["_id", "name", key])
    .limit(10)
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const getReviewsCountByDay = (msg, callback) => {
  let { start, end } = msg.data;
  start = new Date(start);
  end = new Date(end);
  conn.query(sql.reviewesPerDay, [start, end], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getMostReviewedCompanies = (msg, callback) => {
  conn.query(sql.top10ReviewedCompanies, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      const resultMap = {};
      result.forEach((each) => {
        resultMap[each.companyId] = each.total;
      });
      // resultMap = { "61960b7c79026b0aab6bef86": 10 };
      const keys = Object.keys(resultMap);
      // keys = keys.map((each) => mongoose.Types.ObjectId(each));
      CompanySchema.find({ _id: { $in: keys } })
        .select(["name"])
        .then((res) => {
          const resMap = [];
          res.forEach((each) => {
            const temp = {};
            temp._id = each._id;
            temp.name = each.name;
            temp.total = resultMap[each._id];
            resMap.push(temp);
          });
          callback(null, resMap);
        })
        .catch((err) => {
          callback(err, null);
        });
    }
  });
};
const getTopRatedCompanies = (msg, callback) => {
  conn.query(sql.top10RatedCompanies, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      const resultMap = {};
      result.forEach((each) => {
        resultMap[each.companyId] = each.total;
      });
      // resultMap = { "61960b7c79026b0aab6bef86": 10 };
      CompanySchema.find({ _id: { $in: Object.keys(resultMap) } })
        .select(["name"])
        .then((res) => {
          const resMap = [];
          res.forEach((each) => {
            const temp = {};
            temp._id = each._id;
            temp.name = each.name;
            temp.total = resultMap[each._id];
            resMap.push(temp);
          });
          callback(null, resMap);
        })
        .catch((err) => {
          callback(err, null);
        });
    }
  });
};
const getTopJobSeekers = (msg, callback) => {
  conn.query(sql.topUsers, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      const resultMap = {};
      result.forEach((each) => {
        resultMap[each.userId] = each.total;
      });
      // resultMap = { "61960b7c79026b0aab6bef86": 10 };
      UserSchema.find({ _id: { $in: Object.keys(resultMap) } })
        .select(["name"])
        .then((res) => {
          const resMap = [];
          res.forEach((each) => {
            const temp = {};
            temp._id = each._id;
            temp.name = each.firstName;
            temp.total = resultMap[each._id];
            resMap.push(temp);
          });
          callback(null, resMap);
        })
        .catch((err) => {
          callback(err, null);
        });
    }
  });
};
const getTopRatedCEOs = (msg, callback) => {
  conn.query(sql.topCEO, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      let resultMap = {};
      result.forEach((each) => {
        resultMap[each.companyId] = each.total;
      });
      // resultMap = { "61960b7c79026b0aab6bef86": 10 };
      CompanySchema.find({ _id: { $in: Object.keys(resultMap) } })
        .select(["ceo"])
        .then((res) => {
          const resMap = [];
          res.forEach((each) => {
            const temp = {};
            temp._id = each._id;
            temp.ceo = each.ceo;
            temp.total = resultMap[each._id];
            resMap.push(temp);
          });
          callback(null, resMap);
        })
        .catch((err) => {
          callback(err, null);
        });
    }
  });
};

const getCompanyJobStatistics = (msg, callback) => {
  // { comapanyId: msg.data.companyId , status:  }
  // ApplicationSchema.find({ comapanyId: msg.data.companyId })
  ApplicationSchema.aggregate([
    {
      $match: { comapanyId: msg.data.companyId },
      $group: { _id: "$status", total: { $sum: 1 } },
    },
  ])
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const getUnfilteredReviews = (msg, callback) => {
  conn.query(sql.unFilteredReviews, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
  // callback(null, {});
};

const getUnfilteredImages = (msg, callback) => {
  ImageSchema.find({ isVerified: 0 })
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const getCompanyStatistics = (msg, callback) => {
  
  JobApplicationSchema.aggregate(
    [
      {
        '$match': {
          'companyId': mongoose.Types.ObjectId('61960b7c79026b0aab6bef86')
        }
      }, {
        '$group': {
          '_id': '$status', 
          'count': {
            '$sum': 1
          }
        }
      }
    ]
  )
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const flagReview = (msg, callback) => {
  conn.query(sql.flagReview, [msg.data.status, msg.data._id], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const flagImage = (msg, callback) => {
  ImageSchema.findOneAndUpdate(
    { _id: msg.data._id },
    { isVerified: msg.data.status }
  )
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = {
  updateView,
  getMostViewedCompanies,
  getReviewsCountByDay,
  getTopRatedCompanies,
  getMostReviewedCompanies,
  getTopRatedCEOs,
  getTopJobSeekers,
  getCompanyJobStatistics,
  getUnfilteredReviews,
  getUnfilteredImages,
  flagReview,
  flagImage,
  getCompanyStatistics,
};
