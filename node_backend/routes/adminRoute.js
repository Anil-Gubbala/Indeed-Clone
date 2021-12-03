const express = require("express");
const { kafkaRequest } = require("../kafka/kafkaRequest");
const { checkAuth } = require("../Utils/auth");

const router = express.Router();

router.post("/updateView" , (req, res) => {
  kafkaRequest(
    "admin",
    "updateView",
    { _id: req.body.id, date: new Date() },
    (err, result) => {
      if (err) {
        res.status(500).send({});
      } else {
        res.status(200).send(result);
      }
    }
  );
});

router.get( "/getMostViewedCompanies", checkAuth , (req, res) => {
  console.logcheckAuth , (req.user);
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

router.get("/getReviewsCountByDay", checkAuth , (req, res) => {
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

router.get("/getMostReviewedCompanies", checkAuth , (req, res) => {
  kafkaRequest("admin", "getMostReviewedCompanies", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getTopRatedCompanies", checkAuth , (req, res) => {
  kafkaRequest("admin", "getTopRatedCompanies", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getTopJobSeekers", checkAuth , (req, res) => {
  kafkaRequest("admin", "getTopJobSeekers", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getTopRatedCEOs", checkAuth , (req, res) => {
  kafkaRequest("admin", "getTopRatedCEOs", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getCompanyJobStatistics", checkAuth , (req, res) => {
  kafkaRequest("admin", "getCompanyJobStatistics", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getUnfilteredReviews", checkAuth , (req, res) => {
  
  kafkaRequest("admin", "getUnfilteredReviews", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getUnfilteredImages", checkAuth , (req, res) => {
  kafkaRequest("admin", "getUnfilteredImages", {}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getCompanyStatistics", checkAuth , (req, res) => {
  kafkaRequest("admin", "getCompanyStatistics", {id:req.query.id}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.put("/flagReview", checkAuth , (req, res) => {
  const {_id, approved} = req.body;
  kafkaRequest("admin", "flagReview", {status:approved ? 1: 2, id:_id}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

router.put("/flagImage", checkAuth , (req, res) => {
  const {_id, approved} = req.body;
  kafkaRequest("admin", "flagImage", {status:approved ? 1:2, _id}, (err, result) => {
    if (err) {
      res.status(500).send({});
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
