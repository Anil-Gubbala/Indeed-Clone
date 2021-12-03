const router = require ("express").Router();
var kafka = require("../kafka/client");
const appController = require("../controllers/fileUpload");
const multer = require("multer");
const { makeRequest } = require("../kafka/client");

router.post("/AddCompany", (req, res) => {
  console.log("Inside add company details");
  console.log('Req Body : ', req.body);
  kafka.makeRequest("AddCompany",req.body, (err,data)=>{
        if(err) {
        res.writeHead(400,{
            "Content-type":"text/plain",
          })
          res.end("Server error")
        }
        else if(data.status===200){
          const payload = {
            _id:data.data._id,
            website: data.data.website,
            companySize: data.data.companySize,
            companyType:data.data.companyType,
            revenue:data.data.revenue,
            headquaters:data.data.headquaters,
            industry:data.data.industry,
            founded:data.data.founded,
            mission:data.data.mission,
            ceo:data.data.ceo,
            companyPicture:data.data.companyPicture,
            companyLogo:data.data.companyLogo,
            ceoImage:data.data.ceoImage,
            employerId:data.data.employerId,
        };
          console.log("Successfully added company",payload);
          res.status(200).json({payload});
        }
        else{
          console.log("Invalid data");
        res.writeHead(400,{
          "Content-type":"text/plain",
        })
        console.log(err)
        res.end("Invalid data")
        }
  })
  })

  router.put("/AddCompany/Id",(req,res) =>{
    console.log("Inside Add Company Id to User Profile Page");
    kafka.makeRequest("addCompanyId",req.body,(err,data) =>{
      if(err){
        res.writeHead(400,{
          "Content-type":"text/plain",
        });
        res.end("Cannot save company Id details");
      }
      else{
        let payload={
          companyId:data.data.companyId,
        }
        console.log("payload in backend",JSON.stringify(payload))
        res.status(200).json({payload});
      }
    })
  })



module.exports = router;
