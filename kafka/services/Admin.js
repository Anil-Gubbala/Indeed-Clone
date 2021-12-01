const mongoose = require("mongoose");
const conn = require("../db/sql/sqlConnector.js");

const sqlSample = {
  reviewesPerDay:
    "select Date(date) as dateOnly, count(*) as total FROM indeed.reviews WHERE date  between  '2021-11-15' and '2021-11-25' group by dateOnly ;",
  top10ReviewedCompanies:
    "select  companyId, count(*) as total from indeed.reviews group by companyId order by total DESC  limit 5 ",
  top10RatedCompanies:
    "select  companyId, AVG(rating) as total from indeed.reviews group by companyId order by total DESC  limit 5 ",
  topUsers:
    "select  userId, count(*) as total from indeed.reviews where status = 0 group by userId order by total desc",
  topCEO: "similar to company",
};

const sql = {
  reviewesPerDay:
    "select Date(date) as dateOnly, count(*) as total FROM indeed.reviews WHERE date  between  ? and ? group by dateOnly ;",
  top10ReviewedCompanies:
    "select  companyId, count(*) as total from indeed.reviews group by companyId order by total DESC  limit 5 ",
  top10RatedCompanies:
    "select  companyId, AVG(rating) as total from indeed.reviews group by companyId order by total DESC  limit 5 ",
  topUsers:
    "select  userId, count(*) as total from indeed.reviews join indeed.users on  where status = 0 group by userId order by total desc",
  topCEO:
    "select  userId, count(*), users.firstname, users.lastname as total from indeed.reviews join indeed.users on reviews.userId = users._id  where status = 0 group by userId order by total desc",
  unFilteredReviews: "select * from indeed.reviews where status = 0",
  flagReview: "update indeed.reviews set status = ? where _id = ?",
};

const CompanySchema = require("../db/schema/company").createModel();
const ApplicationSchema = require("../db/schema/jobApplication").createModel();

const updateView = (msg, callback) => {
  console.log(msg);
  let date = new Date();

  date = date.toJSON().substring(0, 10);
  const views = {};
  views[`views.${date}`] = 1;
  console.log(views);
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
  let date = new Date(msg.data.date);
  date = date.toJSON().substring(0, 10);
  const sort = {};
  sort[`views.${date}`] = -1;
  const filter = {};
  filter[`views.${date}`] = { $gte: 0 };
  CompanySchema.find(filter)
    .sort(sort)
    .select(["_id", "name", `views.${date}`])
    .limit(5)
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const getReviewsCountByDay = (msg, callback) => {
  let { start, end } = msg.data;
  start = new Date(start).toJSON().substring(0, 10);
  end = new Date(end).toJSON().substring(0, 10);
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
      callback(null, result);
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
      resultMap = { "61960b7c79026b0aab6bef86": 10 };
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
  callback(null, {});
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
  callback(null, {});
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
};
