import React,{useState} from "react"
import { post } from '../../utils/serverCall';
import "./AddCompanyDetails.css"
import NavBar from "./../navbar/employerNavBar"
import {Row,Col} from "react-bootstrap"
import { Grid,TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const AddCompanyDetails = () => {

  const useStyle = makeStyles(theme =>({
    root:{
      '& .MuiFormControl-root': {
        width:"190%",
        padding:"0",
        margin:theme.spacing(0.1)
      }
    }
  }))


const classes = useStyle();
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

const[websiteErr,setWebsiteErr]=useState("");
const[sizeErr,setSizeErr]=useState("");
const[typeErr,setTypeErr]=useState("");
const[revenueErr,setRevenueErr]=useState("");
const[headquatersErr,setHeadquatersErr]=useState("");
const[industryErr,setIndustryErr]=useState("");
const[foundedErr,setFoundedErr]=useState("");
const[missionErr,setMissionErr]=useState("");
const[ceoErr,setCeoErr]=useState("");

const[addCompanyStatus,setAddCompanyStatus]=useState("");


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
  const isValid=formValidation();
  if(isValid){
  const formData1 = new FormData();
  const formData2 = new FormData();
  const formData3 = new FormData();
  formData1.append("originalname",companyPicture);
  formData2.append("originalname",ceoImage);
  formData3.append("originalname",companyLogo);
  console.log("image here",companyPicture);
  console.log("image here",ceoImage);
  console.log("image here",companyLogo);
  post ("/AddImg", formData1)
    .then((result) =>{
      console.log("formData1",result.imagePath);
      setCompanyPicture(result.imagePath);
      const imagePath1 = result.imagePath;
  post("/AddImg", formData2)
      .then((result) =>{
        console.log("formData2",result.imagePath);
        setCeoImage(result.imagePath);
        const imagePath2 = result.imagePath;
  post("/AddImg", formData3)
      .then((result) =>{
        console.log("formData3",result.imagePath);
        setCompanyLogo(result.imagePath);
        const imagePath3 = result.imagePath;
  post("/AddCompany",{
    _id:"61962f8b97ef3ba02f04e4d2",
    website:website.toLowerCase(),
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
}

const formValidation = () =>{
  setAddCompanyStatus("");
  setWebsiteErr("");
  setSizeErr("");
  setTypeErr("");
  setRevenueErr("");
  setHeadquatersErr("");
  setIndustryErr("");
  setMissionErr("");
  setFoundedErr("");
  setCeoErr("");
  const websiteErr="";
  const sizeErr="";
  const typeErr="";
  const revenueErr="";
  const headquatersErr="";
  const industryErr="";
  const foundedErr="";
  const missionErr="";
  const ceoErr="";
  let isValid=true;

  var websiteExp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regexweb= new RegExp(websiteExp);
  if(website==="" || (website.search(regexweb) == -1)) {
    isValid=false;
    setWebsiteErr("Please enter a valid URL");
  }
  var sizeExp = /^\d+$/
  var regSize = new RegExp(sizeExp);
    if(size==="" || (size.search(regSize) == -1)) {
      isValid=false;
      setSizeErr("Please enter a valid Company Size");
    }
  var typeExp= /^[a-zA-Z][a-zA-Z ]*$/;
  var regType = new RegExp(typeExp);
  if(type==="" || (type.search(regType) == -1)){
    isValid=false;
    setTypeErr("Please enter a valid Type");
  }

  if(revenue===""){
    isValid=false;
    setRevenueErr("Please enter the revenue");
  }
  if(headquaters==""){
    isValid=false;
    setHeadquatersErr("Please enter a valid headquaters");
  }
  if(industry==""){
    isValid=false;
    setIndustryErr("Please enter a valid industry");
  }
  if(mission==""){
    isValid=false;
    setMissionErr("Please enter a valid mission");
  }
  if(founded==""){
    isValid=false;
    setFoundedErr("Please enter a valid year");
  }
  if(ceo==""){
    isValid=false;
    setCeoErr("Please enter a valid name");
  }

  if(isValid==false){
    setAddCompanyStatus("Failed to add Company Details!");
  }
  else{
    setAddCompanyStatus("Company Details added to profile successfully!")
  }
  return isValid;

}

  return(
  <div className="body-add">
  <NavBar />
  <form className={classes.root}>
  <div className="page-body-add-image shadow-add">
  <Row>
  <Col>
  <h2><strong>Provide Company Details</strong></h2>
  </Col>
  <Col>
  <img src="/images/addcompanydet.jpeg" alt="register-company" style={{width:"250px",marginLeft:"100px"}} />
  </Col>
  </Row>
  </div>
  <div className="page-body-add shadow-add">
        <h6 className="heading-add"><span style={{color:"red"}}>*</span>Required Fields</h6>
        <h6 className="heading-add">Your Company's Website<span style={{color:"red"}}>*</span></h6>
        <Grid container>
          <Grid item xs={6}>
            <TextField
            variant="outlined"
            name="website"
            size="small"
            fullWidth
            required
            onChange={
              (e) =>{
                setWebsite(e.target.value);
                }
              }
              />
              <div className="error-msg" style={{color:"red"}}>{websiteErr}</div>
            </Grid>
            </Grid>
            <h6 className="heading-add">Your Company's Size<span style={{color:"red"}}>*</span></h6>
            <Grid container>
            <Grid item xs={6}>
              <TextField
              variant="outlined"
              name="size"
              size="small"
              fullWidth
              required
              onChange={
                (e) =>{
                  setSize(e.target.value);
                  }
                }
                />
              <div className="error-msg" style={{color:"red"}}>{sizeErr}</div>
              </Grid>
            </Grid>
          <h6 className="heading-add">Your Company's Type<span style={{color:"red"}}>*</span></h6>
          <Grid container>
            <Grid item xs={6}>
              <TextField
              variant="outlined"
              name="type"
              size="small"
              fullWidth
              required
              onChange={
                (e) =>{
                  setType(e.target.value);
                  }
                }
                />
                <div className="error-msg" style={{color:"red"}}>{typeErr}</div>
              </Grid>
            </Grid>
          <h6 className="heading-add">Revenue<span style={{color:"red",margin:"10px"}}>*</span></h6>
          <Grid container>
            <Grid item xs={6}>
              <TextField
              variant="outlined"
              size="small"
              name="revenue"
              onChange={
                (e) =>{
                    setRevenue(e.target.value);
                  }
                }
                />
                <div className="error-msg" style={{color:"red"}}>{revenueErr}</div>
              </Grid>
            </Grid>
          <h6 className="heading-add">Headquaters<span style={{color:"red"}}>*</span></h6>
          <Grid container>
            <Grid item xs={6}>
              <TextField
              variant="outlined"
              size="small"
              name="headquaters"
              onChange={
                (e) =>{
                  setHeadquaters(e.target.value);
                  }
                }
                />
                <div className="error-msg" style={{color:"red"}}>{headquatersErr}</div>
              </Grid>
            </Grid>
          <h6 className="heading-add">Industry<span style={{color:"red"}}>*</span></h6>
          <Grid container>
            <Grid item xs={6}>
              <TextField
              variant="outlined"
              size="small"
              name="industry"
              onChange={
                (e) =>{
                  setIndustry(e.target.value);
                  }
                }
                />
                <div className="error-msg" style={{color:"red"}}>{industryErr}</div>
              </Grid>
            </Grid>
          <h6 className="heading-add">Founded<span style={{color:"red"}}>*</span></h6>
          <Grid container>
            <Grid item xs={6}>
              <TextField
              variant="outlined"
              name="founded"
              size="small"
              type="date"
              onChange={
                (e) =>{
                  setFounded(e.target.value);
                  }
                }
                />
                <div className="error-msg" style={{color:"red"}}>{foundedErr}</div>
              </Grid>
            </Grid>
            <h6 className="heading-add">Mission&Vission<span style={{color:"red"}}>*</span></h6>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                variant="outlined"
                name="mission"
                size="small"
                multiline
                rows={4}
                rowsMax={6}
                onChange={
                  (e) =>{
                    setMission(e.target.value);
                    }
                  }
                  />
                  <div className="error-msg" style={{color:"red"}}>{missionErr}</div>
                </Grid>
              </Grid>
            <h6 className="heading-add">CEO's Name<span style={{color:"red"}}>*</span></h6>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                variant="outlined"
                size="small"
                name="ceo"
                onChange={
                  (e) =>{
                    setCEO(e.target.value);
                    }
                  }
                  />
                  <div className="error-msg" style={{color:"red"}}>{ceoErr}</div>
                </Grid>
              </Grid>
            <h6 className="heading-add">Company Image<span style={{color:"red"}}>*</span></h6>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                variant="outlined"
                type="file"
                size="medium"
                name="companyPicture"
                onChange={
                  (e) =>{
                    handleCompanyImgChange(e);
                    }
                  }
                  />
                </Grid>
              </Grid>
          <h6 className="heading-add">CEO's Image<span style={{color:"red"}}>*</span></h6>
          <Grid container>
              <Grid item xs={6}>
                <TextField
                variant="outlined"
                name="ceoImage"
                size="medium"
                type="file"
                onChange={
                  (e) =>{
                    handleCEOImgChange(e);
                    }
                  }
                  />
                </Grid>
              </Grid>
              <h6 className="heading-add">Company Logo<span style={{color:"red"}}>*</span></h6>
              <Grid container>
                  <Grid item xs={6}>
                    <TextField
                    variant="outlined"
                    name="companyLogo"
                    size="medium"
                    type="file"
                    onChange={
                      (e) =>{
                        handleLogoChange(e);
                        }
                      }
                      />
                    </Grid>
              </Grid>
            </div>
            <div className="page-body-add-btn shadow-add">
            <Row>
            <Col>
            <button type="button" className="btn btn-outline-secondary btn-lg back" style={{borderRadius:"0.5rem",color:"#193498"}}>
              <ArrowBackIosIcon/><strong>Back</strong>
            </button>
            </Col>
            <Col style={{marginLeft:"30%"}}>
            <button type="button" className="btn btn-lg" style={{margin:"30px",borderRadius:"0.5rem",backgroundColor:"#193498",color:"white",margin:"0"}} onClick={handleAddCompanyDetails}><strong>Save And Continue</strong>
            </button>
            </Col>
            </Row>
            {addCompanyStatus=="Failed to add Company Details!" ?
            <div className="alert">
            <span className="error-msg closebtn" style={{padding:"0"}}>{addCompanyStatus}</span>
            </div>
             : addCompanyStatus=="Company Details added to profile successfully!" ?
            <div className="alert-good">
            <div className="error-msg closebtn" style={{textAlign:"left",padding:"0"}}>{addCompanyStatus}</div>
            </div>
            :
            <div></div>
            }
            </div>
            </form>
    </div>
);
}

export default AddCompanyDetails;
