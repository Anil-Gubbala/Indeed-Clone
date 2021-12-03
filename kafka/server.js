// topics files
// var signin = require('./services/signin.js');
const mongoose = require("mongoose");
const connection = require("./Connection");
const admin = require("./routes/admin");
const { config } = require("./utils/config");
const redisClient = require("./redis/redisConfig");
const db = require("./db/sql/sequelizer");
var EditCompanyName = require("./services/EditCompanyName.js");
var EditCompanyRole = require("./services/EditCompanyRole.js")
var EditCompanyAddress = require("./services/EditCompanyAddress.js")
var Profile = require("./services/Profile")
var AddCompany = require("./services/AddCompany")
var GetCompany = require("./services/GetCompany")
var changeWebsite = require("./services/changeCompanyWebsiteService")
var changeSize = require("./services/changeCompanySizeService")
var changeType = require("./services/changeCompanyTypeService")
var changeFounded = require("./services/changeFoundedService")
var changeHeadquaters = require("./services/changeHeadquatersService")
var changeIndustry = require("./services/changeIndustryService")
var changeMission = require("./services/changeMissionService")
var changeRevenue = require("./services/changeRevenueService")
var changeCEO = require("./services/changeCEOService")
var empReviews = require("./services/getEmployerReviewsService")
var featured = require("./services/markAsFeaturedService.js")
var addCompanyId = require("./services/addCompanytoUserService")

const postJob=require('./services/postJob');
const viewJobs=require('./services/viewJobs');
const viewApplicants=require('./services/viewApplicants');
const setApplicationStatus=require('./services/setApplicationStatus');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

mongoose.connect(config.mongoDB, options, (err) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function handleTopicRequest(topicName, fname) {
  // var topicName = 'root_topic';
  console.log("listening to : ", topicName);
  const producer = connection.getProducer();
  const consumer = connection.getConsumer(topicName);
  // console.log("server is running ");
  consumer.on("message", (message) => {
    console.log(`message received for ${topicName} `);
    // console.log(JSON.stringify(message.value));
    if (!IsJsonString(message.value)) {
      return;
    }
    const data = JSON.parse(message.value);

    fname.handle_request(data.data, (err, res) => {
      // console.log(`after handle${res}`);
      const payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
            error: err,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, (err, data) => {
        console.log(data);
      });
    });
  });
}

handleTopicRequest("request-topic1", admin);

handleTopicRequest("admin", admin);

handleTopicRequest("Profile",Profile);
handleTopicRequest("EditCompanyName",EditCompanyName);
handleTopicRequest("EditCompanyName",EditCompanyName);
handleTopicRequest("EditCompanyRole",EditCompanyRole);
handleTopicRequest("EditCompanyAddress",EditCompanyAddress);
handleTopicRequest("AddCompany",AddCompany);
handleTopicRequest("changeWebsite",changeWebsite);
handleTopicRequest("changeSize",changeSize);
handleTopicRequest("changeType",changeType);
handleTopicRequest("changeFounded",changeFounded);
handleTopicRequest("changeHeadquaters",changeHeadquaters);
handleTopicRequest("changeIndustry",changeIndustry);
handleTopicRequest("changeMission",changeMission);
handleTopicRequest("changeRevenue",changeRevenue);
handleTopicRequest("changeCEO",changeCEO);
handleTopicRequest("GetCompany",GetCompany);
handleTopicRequest("empReviews",empReviews);
handleTopicRequest("featured",featured);
handleTopicRequest("addCompanyId",addCompanyId)

handleTopicRequest("postJob",postJob)
handleTopicRequest("viewJobs",viewJobs)
handleTopicRequest("viewApplicants",viewApplicants)
handleTopicRequest("setApplicationStatus",setApplicationStatus)
