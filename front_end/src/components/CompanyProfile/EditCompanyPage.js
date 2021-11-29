import React,{useState,useRef,useEffect} from "react"
import Axios from "axios"
import NavBar from "./../navbar/employerNavBar"
import  "./EditPage.css"
import {Row,Col} from "react-bootstrap"

const ProfilePage = () => {

  useEffect(() => {
      Axios.get(`http://localhost:8080/GetCompany`,{
        params:{
            _id:"61a47a7c41e79758f01d1ace",
        }
      }).then((response) =>{
        localStorage.setItem("companyDetails",JSON.stringify(response.data.data.data[0]));
        console.log("data for display",response.data.data.data[0]);
        const allCompanyData = response.data.data.data[0];
        // console.log("website",((response.data))["payload"][0]["website"]);
        getData(allCompanyData);
        console.log(data)
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
    Axios.put("http://localhost:8080/edit/website",{
    _id:JSON.parse(localStorage.getItem("companyDetails"))["_id"],
    website:website,
    }).then((response) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
}

const handleSizeChange = () =>{
    Axios.put("http://localhost:8080/edit/size",{
    _id:JSON.parse(localStorage.getItem("companyDetails"))["_id"],
    companySize:size,
    }).then((response) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
}

const handleTypeChange = () =>{
    Axios.put("http://localhost:8080/edit/type",{
    _id:JSON.parse(localStorage.getItem("companyDetails"))["_id"],
    companyType:type,
    }).then((response) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
}

const handleRevenueChange = () =>{
    Axios.put("http://localhost:8080/edit/revenue",{
    _id:JSON.parse(localStorage.getItem("companyDetails"))["_id"],
    revenue:revenue
    }).then((response) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
}
const handleHeadquartersChange = () =>{
    Axios.put("http://localhost:8080/edit/headquaters",{
    _id:JSON.parse(localStorage.getItem("companyDetails"))["_id"],
    headquaters:headquarters,
    }).then((response) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
}
const handleIndustryChange = () =>{
    Axios.put("http://localhost:8080/edit/industry",{
    _id:JSON.parse(localStorage.getItem("companyDetails"))["_id"],
    industry:industry
    }).then((response) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
}
const handleFoundedChange = () =>{
    Axios.put("http://localhost:8080/edit/founded",{
    _id:JSON.parse(localStorage.getItem("companyDetails"))["_id"],
    founded:founded,
    }).then((response) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
}
const handleMissionChange = () =>{
    Axios.put("http://localhost:8080/edit/mission",{
    _id:JSON.parse(localStorage.getItem("companyDetails"))["_id"],
    mission:mission,
    }).then((response) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
}
const handleCEOChange = () =>{
    Axios.put("http://localhost:8080/edit/ceo",{
    _id:JSON.parse(localStorage.getItem("companyDetails"))["_id"],
    ceo:ceo,
    }).then((response) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
}

  return(
  <div key={data.id}>
  <NavBar />
    <div className="profile-page-edit">
        <div className="info-profile-title page-body-edit shadow edit">
        <Row>
        <Col>
        <h2><strong>Edit Company Page</strong></h2>
        </Col>
        <Col>
        <img src="/images/editcompany.jpeg" alt="edit-company" style={{width:"250px",marginLeft:"100px",marginTop:"-80px"}} />
        </Col>
        </Row>
        </div>
        <div className="info-profile-edit page-body-edit shadow edit">
          {editWebsiteVisible ? (
          <div className="hidden-body">
            <h6 className="heading">Company Website:</h6>
            <input
            type="text"
            ref={inputRefWebsite}
            ref={inputRef}
            name="website"
            className="form-control"
            onChange={
              (e)=>{
                setWebsite(e.target.value);
              }
            }
            />
              <div className="save-button">
                  <button type="button" className="btn btn-primary btn-md" style={{margin:"30px"}} onClick={handleWebsiteChange}>Save</button>
              </div>
              </div>
              ) : (
              <div style={{textAlign:"left"}} className="hidden">
                  <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"30px"}} onClick={() => setEditWebsiteVisible(true)}>
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                  </path>
                  </svg>
                  </button>
                  <div>
                  <h4><strong>Website</strong></h4>
                  </div>
              <div>
              <h6>{`${data["website"]}`}</h6>
              </div>
              <hr/>
            </div>
              )}
              {editCompanySize ? (
              <div className="hidden-body">
                <h4 className="heading">Your Company Size:</h4>
                <input
                type="text"
                ref={inputRefSize}
                ref={inputRef}
                name="size"
                className="form-control"
                onChange={
                  (e)=>{
                    setSize(e.target.value);
                  }
                }
                />
                  <div className="save-button">
                      <button type="button" className="btn btn-primary btn-md" style={{margin:"30px"}} onClick={handleSizeChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"30px"}} onClick={() => setEditCompanySize(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h4><strong>Company Size</strong></h4>
                      </div>
                  <div>
                    <h6>{`${data["companySize"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editCompanyType ? (
              <div className="hidden-body">
                <h6 className="heading">Your Company Type:</h6>
                <input
                type="text"
                ref={inputRefType}
                ref={inputRef}
                name="type"
                className="form-control"
                onChange={
                  (e)=>{
                    setType(e.target.value);
                  }
                }
                />
                  <div className="save-button">
                      <button type="button" className="btn btn-primary btn-md" style={{margin:"30px"}} onClick={handleTypeChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"30px"}} onClick={() => setEditCompanyType(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h4><strong>Company Type</strong></h4>
                      </div>
                  <div>
                    <h6>{`${data["companyType"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editRevenue ? (
              <div className="hidden-body">
                <h6 className="heading">Revenue:</h6>
                <input
                type="text"
                ref={inputRefRevenue}
                ref={inputRef}
                name="revenue"
                className="form-control"
                onChange={
                  (e)=>{
                    setRevenue(e.target.value);
                  }
                }
                />
                  <div className="save-button">
                      <button type="button" className="btn btn-primary btn-md" style={{margin:"30px"}} onClick={handleRevenueChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"30px"}} onClick={() => setEditRevenue(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h4><strong>Revenue</strong></h4>
                      </div>
                  <div>
                    <h6>{`${data["revenue"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editHeadquarters ? (
              <div className="hidden-body">
                <h6 className="heading">Headquarters:</h6>
                <input
                type="text"
                ref={inputRefHeadquarters}
                ref={inputRef}
                name="headquarters"
                className="form-control"
                onChange={
                  (e)=>{
                    setHeadquarters(e.target.value);
                  }
                }
                />
                  <div className="save-button">
                      <button type="button" className="btn btn-primary btn-md" style={{margin:"30px"}} onClick={handleHeadquartersChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"30px"}} onClick={() => setEditHeadquarters(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h4><strong>Headquarters</strong></h4>
                      </div>
                  <div>
                    <h6>{`${data["headquaters"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editIndustry ? (
              <div className="hidden-body">
                <h6 className="heading">Industry:</h6>
                <input
                type="text"
                ref={inputRefIndustry}
                ref={inputRef}
                name="industry"
                className="form-control"
                onChange={
                  (e)=>{
                    setIndustry(e.target.value);
                  }
                }
                />
                  <div className="save-button">
                      <button type="button" className="btn btn-primary btn-md" style={{margin:"30px"}} onClick={handleIndustryChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"30px"}} onClick={() => setEditIndustry(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h4><strong>Industry</strong></h4>
                      </div>
                  <div>
                    <h6>{`${data["industry"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editFounded ? (
              <div className="hidden-body">
                <h6 className="heading">Founded:</h6>
                <input
                type="date"
                ref={inputRefFounded}
                ref={inputRef}
                name="founded"
                className="form-control"
                onChange={
                  (e)=>{
                    setFounded(e.target.value);
                  }
                }
                />
                  <div className="save-button">
                      <button type="button" className="btn btn-primary btn-md" style={{margin:"30px"}} onClick={handleFoundedChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"30px"}} onClick={() => setEditFounded(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h4><strong>Founded</strong></h4>
                      </div>
                  <div>
                    <h6>{`${data["founded"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editMission ? (
              <div className="hidden-body">
                <h6 className="heading">Mission & Vision:</h6>
                <textarea
                ref={inputRefMission}
                ref={inputRef}
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
                  <div className="save-button">
                      <button type="button" className="btn btn-primary btn-md" style={{margin:"30px"}} onClick={handleMissionChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"30px"}} onClick={() => setEditMission(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h4><strong>Mission</strong></h4>
                      </div>
                  <div>
                    <h6>{`${data["mission"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
                   {editCEO ? (
              <div className="hidden-body">
                <h6 className="heading">CEO:</h6>
                <input
                type="text"
                ref={inputRefCEO}
                ref={inputRef}
                name="ceo"
                className="form-control"
                onChange={
                  (e)=>{
                    setCEO(e.target.value);
                  }
                }
                />
                  <div className="save-button">
                      <button type="button" className="btn btn-primary btn-md" style={{margin:"30px"}} onClick={handleCEOChange}>Save</button>
                  </div>
                  </div>
                  ) : (
                  <div style={{textAlign:"left"}} className="hidden">
                      <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-100%",width:"30px"}} onClick={() => setEditCEO(true)}>
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                      </path>
                      </svg>
                      </button>
                      <div>
                      <h4><strong>CEO</strong></h4>
                      </div>
                  <div>
                    <h6>{`${data["ceo"]}`}</h6>
                  </div>
                  <hr/>
                </div>
                  )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
