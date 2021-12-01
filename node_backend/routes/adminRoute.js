const express = require("express");
const { kafkaRequest } = require("../kafka/kafkaRequest");

const router = express.Router();

router.post("/updateView", (req, res) => {
  kafkaRequest(
    "admin",
    "updateView",
    { _id: "61960b7c79026b0aab6bef86", date: new Date() },
    (err, result) => {
      if (err) {
        res.status(500).send({});
      } else {
        res.status(200).send(result);
      }
    }
  );
});

router.get("/getMostViewedCompanies", (req, res) => {
  kafkaRequest(
    "admin",
    "getMostViewedCompanies",
    { date: req.query.date },
    (err, result) => {
      if (err) {
        res.status(500).send({});
      } else {
        res.status(200).send(result);
      }
    }
  );
});

router.get("/getReviewsCountByDay", (req, res) => {
  kafkaRequest(
    "admin",
    "getReviewsCountByDay",
    { start: req.query.start, end: req.query.end },
    (err, result) => {
      if (err) {
        res.status(500).send({});
      } else {
        res.status(200).send(result);
      }
    }
  );
});

router.get("/getMostReviewedCompanies", (req, res) => {
  kafkaRequest("admin", "getMostReviewedCompanies", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getTopRatedCompanies", (req, res) => {
  kafkaRequest("admin", "getTopRatedCompanies", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getTopJobSeekers", (req, res) => {
  kafkaRequest("admin", "getTopJobSeekers", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getTopRatedCEOs", (req, res) => {
  kafkaRequest("admin", "getTopRatedCEOs", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getCompanyJobStatistics", (req, res) => {
  kafkaRequest("admin", "getCompanyJobStatistics", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getUnfilteredReviews", (req, res) => {
  
  kafkaRequest("admin", "getUnfilteredReviews", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getUnfilteredImages", (req, res) => {
  kafkaRequest("admin", "getUnfilteredImages", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.put("/flagReview", (req, res) => {
  const {_id, approved} = req.body;
  kafkaRequest("admin", "flagReview", {status:approved ? 1: 2, id:_id}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.put("/flagImage", (req, res) => {
  kafkaRequest("admin", "flagImage", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
