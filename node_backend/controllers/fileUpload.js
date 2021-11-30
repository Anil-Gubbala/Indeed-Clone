const AWS = require("aws-sdk");
const config = require("../Utils/config");

AWS.config.update({
  secretAccessKey: config.REACT_APP_ACCESS_KEY,
  accessKeyId:config.REACT_APP_ACCESS_ID,
  region:config.REACT_APP_REGION,
});

var s3 = new AWS.S3();

const handleFileUpload = (req,res) =>{
  console.log("req._id",req.body._id)
  console.log("req.file",req.file)
  const {originalname,buffer} = req.file;
  let params = {
    Bucket:config.REACT_APP_BUCKET_NAME,
    Key:originalname,
    Body:buffer,
  }

s3.upload(params,async(err,result) =>{
  if(err){
    res.status(500).json({
      message:"Failed to upload",
      error:err.message,
    });
  }
    // res.send({imagePath : `https://pictures-upload-ubereats.s3.us-west-1.amazonaws.com/${result.Key}`})
    res.send({imagePath : `https://indeed13.s3.us-east-2.amazonaws.com/${result.Key}`})
});

};

module.exports = {
  handleFileUpload,
}
