import React,{useState} from "react"
import Axios from "axios"
import "./AddCompanyDetails.css"
import NavBar from "./../navbar/employerNavBar"
import {Row,Col} from "react-bootstrap"


const AddCompanyDetails = () => {


const [website, setWebsite] = useState("");
const [size, setSize] = useState("");
const [type, setType] = useState("");
const [revenue, setRevenue] = useState("");
const [headquaters, setHeadquaters] = useState("");
const [industry, setIndustry] = useState("");
const [founded, setFounded] = useState("");
const [mission, setMission] = useState("");
const [ceo, setCEO] = useState("");
const [companyPicture,setCompanyPicture]=useState("");
const [ceoImage,setCeoImage]=useState("");
const [companyLogo,setCompanyLogo]=useState("");

const handleCompanyImgChange = (e) =>{
  if(e.target.files && e.target.files.length > 0){
    const fileName = e.target.files[0]['name'];
    console.log(e.target.files[0]['name'])
      setCompanyPicture(e.target.files[0]);
  }
}

const handleCEOImgChange = (e) =>{
  if(e.target.files && e.target.files.length > 0){
    const fileName = e.target.files[0]['name'];
    console.log(e.target.files[0]['name'])
      setCeoImage(e.target.files[0]);
  }
}

const handleLogoChange = (e) =>{
  if(e.target.files && e.target.files.length > 0){
    const fileName = e.target.files[0]['name'];
    console.log(e.target.files[0]['name'])
      setCompanyLogo(e.target.files[0]);
  }
}

const handleAddCompanyDetails = () =>{
  const formData1 = new FormData();
  const formData2 = new FormData();
  const formData3 = new FormData();
  formData1.append("originalname",companyPicture);
  formData2.append("originalname",ceoImage);
  formData3.append("originalname",companyLogo);
  console.log("image here",companyPicture);
  console.log("image here",ceoImage);
  console.log("image here",companyLogo);
  Axios.post("http://localhost:8080/AddImg", formData1)
    .then((response) =>{
      console.log("formData1",response.data.imagePath);
      setCompanyPicture(response.data.imagePath);
      const imagePath1 = response.data.imagePath;
  Axios.post("http://localhost:8080/AddImg", formData2)
      .then((response) =>{
        console.log("formData2",response.data.imagePath);
        setCeoImage(response.data.imagePath);
        const imagePath2 = response.data.imagePath;
  Axios.post("http://localhost:8080/AddImg", formData3)
      .then((response) =>{
        console.log("formData3",response.data.imagePath);
        setCompanyLogo(response.data.imagePath);
        const imagePath3 = response.data.imagePath;
  Axios.post("http://localhost:8080/AddCompany",{
    _id:"61962f8b97ef3ba02f04e4d3",
    website:website,
    companySize:size,
    companyType:type,
    revenue:revenue,
    headquaters:headquaters,
    industry:industry,
    founded:founded,
    mission:mission,
    ceo:ceo,
    companyPicture:imagePath1,
    ceoImage:imagePath2,
    companyLogo:imagePath3,

  }).then((response) =>{
    console.log("Added to DB!")
  })
  })
  })
  }).catch(err =>{
    console.log(err);
  })
}

  return(
  <div className="body">
  <NavBar />
  <div className="page-body-add-image shadow">
  <Row>
  <Col>
  <h2><strong>Provide Company Details</strong></h2>
  </Col>
  <Col>
  <img src="/images/addcompanydet.jpeg" alt="register-company" style={{width:"250px",marginLeft:"100px"}} />
  </Col>
  </Row>
  </div>
  <div className="page-body-add shadow">
        <h6 className="heading-add"><span style={{color:"red"}}>*</span>Required Fields</h6>
        <h6 className="heading-add">Your Company's Website<span style={{color:"red"}}>*</span></h6>
          <input
          type="text"
          name="website"
          className="form-control"
          onChange={
            (e) =>{
              setWebsite(e.target.value);
            }
          }
          />
          <h6 className="heading-add">Your Company's Size:<span style={{color:"red"}}>*</span></h6>
          <input
          type="text"
          name="size"
          className="form-control"
          onChange={
            (e) =>{
              setSize(e.target.value);
            }
          }
          />
          <h6 className="heading-add">Your Company's Type<span style={{color:"red"}}>*</span></h6>
          <input
          type="text"
          name="type"
          className="form-control"
          onChange ={
            (e) => {
              setType(e.target.value);
            }
          }
          />
            <h6 className="heading-add">Revenue<span style={{color:"red",margin:"10px"}}>*</span></h6>
            <input
            type="text"
            name="revenue"
            className="form-control"
            onChange={
              (e) =>{
                setRevenue(e.target.value);
              }
            }
            />
            <h6 className="heading-add">Headquaters<span style={{color:"red"}}>*</span></h6>
            <input
            type="text"
            name="headquaters"
            className="form-control"
            onChange={
              (e) =>{
                setHeadquaters(e.target.value);
              }
            }
            />
            <h6 className="heading-add">Industry<span style={{color:"red"}}>*</span></h6>
            <input
            type="text"
            name="industry"
            className="form-control"
            onChange={
              (e) =>{
                setIndustry(e.target.value);
              }
            }
            />
            <h6 className="heading-add">Founded<span style={{color:"red"}}>*</span></h6>
            <input
            type="date"
            name="founded"
            className="form-control"
            onChange={
              (e) =>{
                setFounded(e.target.value);
              }
            }
            />
            <h6 className="heading-add">Mission&Vission<span style={{color:"red"}}>*</span></h6>
            <textarea
            name="mission"
            className="form-control"
            rows="4"
            onChange={
              (e)=>{
                setMission(e.target.value);
              }
            }
            >
            </textarea>
            <h6 className="heading-add">CEO's Name<span style={{color:"red"}}>*</span></h6>
            <input
            type="text"
            name="ceo"
            className="form-control"
            onChange={
              (e) =>{
                setCEO(e.target.value);
              }
            }
            />
            <h6 className="heading-add">Company Image<span style={{color:"red"}}>*</span></h6>
            <input
            type="file"
            name="companyPicture"
            className="form-control"
            onChange={
              (e) =>{
                handleCompanyImgChange(e);
              }
            }
            />
            <h6 className="heading-add">CEO's Image<span style={{color:"red"}}>*</span></h6>
            <input
            type="file"
            name="ceoImage"
            className="form-control"
            onChange={
              (e) =>{
                handleCEOImgChange(e);
              }
            }
            />
            <h6 className="heading-add">Company Logo<span style={{color:"red"}}>*</span></h6>
            <input
            type="file"
            name="companyLogo"
            className="form-control"
            onChange={
              (e) =>{
                handleLogoChange(e);
              }
            }
            />
            </div>

            <div className="page-body-add-btn shadow">
            <button type="button" className="btn btn-outline-secondary btn-lg back" style={{borderRadius:"0.5rem",color:"#193498"}}>
            <span>
              <svg className="SVG" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" class=" css-dgdn9t">
              <path d="M14.112 18.002c.2.2.52.204.716.008l.707-.707a.507.507 0 00-.009-.716L10.94 12l4.587-4.587c.2-.2.205-.521.01-.716l-.708-.708a.507.507 0 00-.716.01l-5.648 5.647c-.1.1-.148.234-.143.367.002.124.05.247.143.34l.001.001a.758.758 0 00.008.008l5.64 5.64z">
              </path>
              </svg>
              <strong>Back</strong></span>
            </button>
            <button type="button" className="btn btn-lg" style={{margin:"30px",borderRadius:"0.5rem",position:"absolute",marginLeft:"400px",backgroundColor:"#193498",color:"white",top:"1600px"}} onClick={handleAddCompanyDetails}><strong>Save And Continue</strong></button>
            </div>

    </div>
);
}

export default AddCompanyDetails;
