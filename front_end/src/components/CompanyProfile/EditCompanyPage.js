import React,{useState,useRef,useEffect} from "react"
import { get,put } from '../../utils/serverCall';
import NavBar from "./../EmpNavbar/EmpNavbar"
import  "./EditPage.css"
import {Row,Col} from "react-bootstrap"

const ProfilePage = () => {

  useEffect(() => {
      get(`/GetCompany`,{employerId:localStorage.getItem("userId")})
        .then((result) =>{
        if(result.data.data.length === 0){
          alert("Opps! Looks like you have not added company details!")
          window.open("/addcompany","_self")
        }
        else{
          console.log("data for display");
          const allCompanyData = result.data.data[0];
          // console.log("website",((response.data))["payload"][0]["website"]);
          getData(allCompanyData);
          console.log(data)
        }
      }).catch(err =>{
        console.log(err);
      })
  }, [])

const inputRefWebsite = useRef(null);
const inputRefSize = useRef(null);
const inputRefType = useRef(null);
const inputRefRevenue = useRef(null);
const inputRefHeadquarters = useRef(null);
const inputRefIndustry = useRef(null);
const inputRefFounded = useRef(null);
const inputRefMission = useRef(null);
const inputRefCEO = useRef(null);
const inputRef = useRef(null);

const [data,getData] = useState("");

const [editWebsiteVisible,setEditWebsiteVisible] = useState(false);
const [editCompanySize,setEditCompanySize] = useState(false);
const [editCompanyType,setEditCompanyType] = useState(false);
const [editRevenue,setEditRevenue] = useState(false);
const [editHeadquarters,setEditHeadquarters] = useState(false);
const [editIndustry,setEditIndustry] = useState(false);
const [editFounded,setEditFounded] = useState(false);
const [editMission,setEditMission] = useState(false);
const [editCEO,setEditCEO] = useState(false);


const [website, setWebsite] = useState("");
const [size, setSize] = useState("");
const [type, setType] = useState("");
const [revenue, setRevenue] = useState("");
const [headquarters, setHeadquarters] = useState("");
const [industry, setIndustry] = useState("");
const [founded, setFounded] = useState("");
const [mission, setMission] = useState("");
const [ceo, setCEO] = useState("");

const[websiteErr,setWebsiteErr]=useState("");
const[sizeErr,setSizeErr]=useState("");
const[typeErr,setTypeErr]=useState("");
const[revenueErr,setRevenueErr]=useState("");
const[headquatersErr,setHeadquatersErr]=useState("");
const[industryErr,setIndustryErr]=useState("");
const[foundedErr,setFoundedErr]=useState("");
const[missionErr,setMissionErr]=useState("");
const[ceoErr,setCeoErr]=useState("");

function onClickOutside(e) {
    // Check if user is clicking outside of <input>
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setEditWebsiteVisible(false);
      setEditCompanySize(false);
      setEditCompanyType(false);
      setEditRevenue(false);
      setEditHeadquarters(false);
      setEditIndustry(false);
      setEditFounded(false);
      setEditMission(false);// Disable text input
      setEditCEO(false);
    }
  }

useEffect(() => {
    if(editWebsiteVisible){
       document.addEventListener("dblclick", onClickOutside);
    }
    else if(editCompanySize){
      document.addEventListener("dblclick", onClickOutside);
    }
    else if(editCompanyType){
      document.addEventListener("dblclick", onClickOutside);
    }
    else if(editRevenue){
      document.addEventListener("dblclick", onClickOutside);
    }
    else if(editHeadquarters){
      document.addEventListener("dblclick", onClickOutside);
    }
    else if(editIndustry){
      document.addEventListener("dblclick", onClickOutside);
    }
    else if(editFounded){
      document.addEventListener("dblclick", onClickOutside);
    }
    else if(editMission){
      document.addEventListener("dblclick", onClickOutside);
    }
    else if(editCEO){
      document.addEventListener("dblclick", onClickOutside);
    }
    return () => {
       document.removeEventListener("dblclick", onClickOutside);
    }
});


const handleWebsiteChange = () =>{
  const isValid=websiteValidation();
  if(isValid){
    put("/edit/website",{_id:localStorage.getItem("companyId"),website:website.toLowerCase(),})
    .then((result) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
  }
}

const handleSizeChange = () =>{
  const isValid=sizeValidation();
  if(isValid){
    put("/edit/size",{_id:localStorage.getItem("companyId"),companySize:size,})
    .then((result) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
  }
}

const handleTypeChange = () =>{
  const isValid=typeValidation();
  if(isValid){
    put("/edit/type",{_id:localStorage.getItem("companyId"),companyType:type,}).
    then((result) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
  }
}

const handleRevenueChange = () =>{
  const isValid=revenueValidation();
  if(isValid){
    put("/edit/revenue",{_id:localStorage.getItem("companyId"),revenue:revenue})
    .then((result) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
  }
}
const handleHeadquartersChange = () =>{
  const isValid=headquatersValidation();
  if(isValid){
  put("/edit/headquaters",{_id:localStorage.getItem("companyId"),headquaters:headquarters,})
  .then((result) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
  }
}
const handleIndustryChange = () =>{
  const isValid=industryValidation();
  if(isValid){
    put("/edit/industry",{_id:localStorage.getItem("companyId"),industry:industry})
    .then((result) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
  }
}
const handleFoundedChange = () =>{
  const isValid=foundedValidation();
  if(isValid){
    put("/edit/founded",{_id:localStorage.getItem("companyId"),founded:founded,})
    .then((result) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
  }
}
const handleMissionChange = () =>{
  const isValid=missionValidation();
  if(isValid){
    put("/edit/mission",{_id:localStorage.getItem("companyId"),mission:mission,})
    .then((result) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
  }
}
const handleCEOChange = () =>{
  const isValid=ceoValidation();
  if(isValid){
    put("/edit/ceo",{_id:localStorage.getItem("companyId"),ceo:ceo,})
    .then((result) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
  }
}

const websiteValidation = () =>{
  setWebsiteErr("");
  const websiteErr="";

  let isValid=true;

  var websiteExp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regexweb= new RegExp(websiteExp);
  if(website==="" || (website.search(regexweb) == -1)) {
    isValid=false;
    setWebsiteErr("Please enter a valid URL");
  }

  return isValid;

}

const sizeValidation = () =>{
  setSizeErr("");
  const sizeErr="";
  let isValid=true;

  var sizeExp = /^\d+$/
  var regSize = new RegExp(sizeExp);
    if(size==="" || (size.search(regSize) == -1)) {
      isValid=false;
      setSizeErr("Please enter a valid Company Size");
    }

  return isValid;

}

const typeValidation = () =>{
  setTypeErr("");
  const typeErr="";
  let isValid=true;

  var typeExp= /^[a-zA-Z][a-zA-Z ]*$/;
  var regType = new RegExp(typeExp);
  if(type==="" || (type.search(regType) == -1)){
    isValid=false;
    setTypeErr("Please enter a valid Type");
  }

  return isValid;
}

const revenueValidation = () =>{
    setRevenueErr("");
    const revenueErr="";
    let isValid=true;

  if(revenue===""){
    isValid=false;
    setRevenueErr("Please enter the revenue");
  }
  return isValid;
}

const headquatersValidation = () =>{
    setHeadquatersErr("");
    const headquatersErr="";
    let isValid=true;

    if(headquaters==""){
      isValid=false;
      setHeadquatersErr("Please enter a valid headquaters");
    }
    return isValid;
}

const industryValidation = () =>{
  setIndustryErr("");
  const industryErr="";
    let isValid=true;

    if(industry==""){
      isValid=false;
      setIndustryErr("Please enter a valid industry");
    }
    return isValid;
}

const missionValidation = () =>{
  setMissionErr("");
  const missionErr="";

    let isValid=true;

    if(mission==""){
      isValid=false;
      setMissionErr("Please enter a valid mission");
    }
    return isValid;
}

const foundedValidation = () =>{
  setFoundedErr("");
  const foundedErr="";

    let isValid=true;

    if(founded==""){
      isValid=false;
      setFoundedErr("Please enter a valid year");
    }
    return isValid;
}

const ceoValidation = () =>{
  setCeoErr("");
  const ceoErr="";

    let isValid=true;
    if(ceo==""){
      isValid=false;
      setCeoErr("Please enter a valid name");
    }
    return isValid;
}


  return(
  <div key={data.id}>
  <NavBar />
  <div className="edit-div" style={{marginTop:"1%",backgroundColor: "#EEEEEE"}}>
  </div>
    <div className="profile-page-edit">
        <div className="info-profile-title page-body-edit shadow edit">
        <Row>
        <Col>
        <h2 style={{padding:"3%"}}><strong>Edit Company Page</strong></h2>
        </Col>
        <Col>
        <img src="/images/editcompany.jpeg" alt="edit-company" style={{width:"40%",marginLeft:"40%"}} />
        </Col>
        </Row>
        </div>
        <div className="info-profile-edit page-body-edit shadow edit">
          {editWebsiteVisible ? (
          <div className="hidden-body">
            <input
            type="text"
            ref={inputRefWebsite}
            ref={inputRef}
            name="website"
            placeholder="Change Website"
            className="form-control"
            onChange={
              (e)=>{
                setWebsite(e.target.value);
              }
            }
            />
            <div className="error-msg-edit" style={{color:"red"}}>{websiteErr}</div>
              <div className="save-button">
                  <button type="button" className="button-edit" style={{margin:"30px"}} onClick={handleWebsiteChange}>Save</button>
              </div>
              </div>
              ) : (
              <div style={{textAlign:"left"}} className="hidden">
                  <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"4%"}} onClick={() => setEditWebsiteVisible(true)}>
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                  </path>
                  </svg>
                  </button>
                  <div>
                  <h6><strong>Website</strong></h6>
                  </div>
              <div>
              <h6>{`${data["website"]}`}</h6>
              </div>
              <hr/>
            </div>
              )}
              {editCompanySize ? (
              <div className="hidden-body">
                <input
                type="text"
                ref={inputRefSize}
                ref={inputRef}
                name="size"
                placeholder="Change Company Size"
                className="form-control"
                onChange={
                  (e)=>{
                    setSize(e.target.value);
                  }
                }
                />
                <div className="error-msg-edit" style={{color:"red"}}>{sizeErr}</div>
                  <div className="save-button">
                      <button type="button" className="button-edit" style={{margin:"30px"}} onClick={handleSizeChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"4%"}} onClick={() => setEditCompanySize(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h6><strong>Company Size</strong></h6>
                      </div>
                  <div>
                    <h6>{`${data["companySize"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editCompanyType ? (
              <div className="hidden-body">
                <input
                type="text"
                ref={inputRefType}
                ref={inputRef}
                name="type"
                placeholder="Change Company Type"
                className="form-control"
                onChange={
                  (e)=>{
                    setType(e.target.value);
                  }
                }
                />
                <div className="error-msg-edit" style={{color:"red"}}>{typeErr}</div>
                  <div className="save-button">
                      <button type="button" className="button-edit" style={{margin:"30px"}} onClick={handleTypeChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"4%"}} onClick={() => setEditCompanyType(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h6><strong>Company Type</strong></h6>
                      </div>
                  <div>
                    <h6>{`${data["companyType"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editRevenue ? (
              <div className="hidden-body">
                <input
                type="text"
                ref={inputRefRevenue}
                ref={inputRef}
                name="revenue"
                placeholder="Change Revenue"
                className="form-control"
                onChange={
                  (e)=>{
                    setRevenue(e.target.value);
                  }
                }
                />
                <div className="error-msg-edit" style={{color:"red"}}>{revenueErr}</div>
                  <div className="save-button">
                      <button type="button" className="button-edit" style={{margin:"30px"}} onClick={handleRevenueChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"4%"}} onClick={() => setEditRevenue(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h6><strong>Revenue</strong></h6>
                      </div>
                  <div>
                    <h6>{`${data["revenue"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editHeadquarters ? (
              <div className="hidden-body">
                <input
                type="text"
                ref={inputRefHeadquarters}
                ref={inputRef}
                placeholder="Change Headquaters"
                name="headquarters"
                className="form-control"
                onChange={
                  (e)=>{
                    setHeadquarters(e.target.value);
                  }
                }
                />
                <div className="error-msg-edit" style={{color:"red"}}>{headquatersErr}</div>
                  <div className="save-button">
                      <button type="button" className="button-edit" style={{margin:"30px"}} onClick={handleHeadquartersChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"4%"}} onClick={() => setEditHeadquarters(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h6><strong>Headquarters</strong></h6>
                      </div>
                  <div>
                    <h6>{`${data["headquaters"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editIndustry ? (
              <div className="hidden-body">
                <input
                type="text"
                ref={inputRefIndustry}
                ref={inputRef}
                name="industry"
                placeholder="Change Industry"
                className="form-control"
                onChange={
                  (e)=>{
                    setIndustry(e.target.value);
                  }
                }
                />
                <div className="error-msg-edit" style={{color:"red"}}>{industryErr}</div>
                  <div className="save-button">
                      <button type="button" className="button-edit" style={{margin:"30px"}} onClick={handleIndustryChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"4%"}} onClick={() => setEditIndustry(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h6><strong>Industry</strong></h6>
                      </div>
                  <div>
                    <h6>{`${data["industry"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editFounded ? (
              <div className="hidden-body">
                <input
                type="date"
                ref={inputRefFounded}
                ref={inputRef}
                name="founded"
                placeholder="Change Founded Year"
                className="form-control"
                onChange={
                  (e)=>{
                    setFounded(e.target.value);
                  }
                }
                />
                <div className="error-msg-edit" style={{color:"red"}}>{foundedErr}</div>
                  <div className="save-button">
                      <button type="button" className="button-edit" style={{margin:"30px"}} onClick={handleFoundedChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"4%"}} onClick={() => setEditFounded(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h6><strong>Founded</strong></h6>
                      </div>
                  <div>
                    <h6>{`${data["founded"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editMission ? (
              <div className="hidden-body">
                <textarea
                ref={inputRefMission}
                ref={inputRef}
                name="mission"
                placeholder="Change Mission"
                className="form-control"
                rows="4"
                onChange={
                  (e)=>{
                    setMission(e.target.value);
                  }
                }
                >
                </textarea>
                <div className="error-msg-edit" style={{color:"red"}}>{missionErr}</div>
                  <div className="save-button">
                      <button type="button" className="button-edit" style={{margin:"30px"}} onClick={handleMissionChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"4%"}} onClick={() => setEditMission(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h6><strong>Mission</strong></h6>
                      </div>
                  <div>
                    <h6>{`${data["mission"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editCEO ? (
              <div className="hidden-body">
                <input
                type="text"
                ref={inputRefCEO}
                ref={inputRef}
                name="ceo"
                className="form-control"
                placeholder="Change CEO's Name"
                onChange={
                  (e)=>{
                    setCEO(e.target.value);
                  }
                }
                />
                <div className="error-msg-edit" style={{color:"red"}}>{ceoErr}</div>
                  <div className="save-button">
                      <button type="button" className="button-edit" style={{margin:"30px"}} onClick={handleCEOChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"4%"}} onClick={() => setEditCEO(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h6><strong>CEO</strong></h6>
                      </div>
                  <div>
                    <h6>{`${data["ceo"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
        </div>
        <div className="page-body-logo shadow-add">
        <p style={{color:"#9E9E9E",padding:"1%"}}>©2021 Indeed·6433 Champion Grandview Way Building 1, Austin, TX 78750</p>
        <p style={{color:"#9E9E9E",padding:"1%"}}>Cookies, privacy and terms–Privacy center–Security–Do not sell my personal information–Contact</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
