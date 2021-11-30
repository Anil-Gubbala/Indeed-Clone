import React,{useState,useRef,useEffect} from "react"
import {Row,Col} from "react-bootstrap"
import { post,put } from '../../utils/serverCall';
import "./ProfilePage.css"
import NavBar from "./../navbar/employerNavBar"
import { IoIosLock } from 'react-icons/io';

const ProfilePage = () => {

const [employerData,setEmployerData] = useState([]);

useEffect(() => {
  console.log("I am called");
  post("/Profile",{_id:"61a4739875c76feb200ca414"})
  .then(result =>{
    console.log(result.payload);
    setEmployerData(result.payload);
  })
}, [])

const getAcronym = (str1,str2) =>{
  const newStr = str1 + " "+ str2;
  var matches = newStr.match(/\b(\w)/g); // ['J','S','O','N']
  var acronym = matches.join(''); // JSON
  return acronym;
  console.log("acronym",acronym);
}



const inputRefContact = useRef(null);
const inputRefRole = useRef(null);
const inputRefAddress = useRef(null);

const [editContactVisible,setEditContactVisible] = useState(false);
const [editRoleVisible,setEditRoleVisible] = useState(false);
const [editAddressVisible,setEditAddressVisible] = useState(false);

const [firstName,setFirstName] = useState();
const [lastName,setLastName] = useState("");
const [role,setRole] = useState("");
const [streetAddress,setStreetAddress] = useState("");
const [city,setCity] = useState("");
const [state,setState] = useState("");
const [zipCode,setZipCode] = useState("");

const [firstNameErr,setFirstNameErr] = useState();
const [lastNameErr,setLastNameErr] = useState("");
const [roleErr,setRoleErr] = useState("");
const [streetAddressErr,setStreetAddressErr] = useState("");
const [cityErr,setCityErr] = useState("");
const [stateErr,setStateErr] = useState("");
const [zipCodeErr,setZipCodeErr] = useState("");


function onClickOutSideContact(e) {
    // Check if user is clicking outside of <input>
    if (inputRefContact.current && !inputRefContact.current.contains(e.target)) {
      setEditContactVisible(false); // Disable text input
    }
  }

function onClickOutSideRole(e) {
      // Check if user is clicking outside of <input>
      if (inputRefRole.current && !inputRefRole.current.contains(e.target)) {
        setEditRoleVisible(false); // Disable text input
      }
    }
function onClickOutSideAddress(e) {
      // Check if user is clicking outside of <input>
      if (inputRefAddress.current && !inputRefAddress.current.contains(e.target)) {
        setEditAddressVisible(false); // Disable text input
      }
    }


useEffect(() => {
    if(editContactVisible){
       document.addEventListener("dblclick", onClickOutSideContact);
    }
    return () => {
       document.removeEventListener("dblclick", onClickOutSideContact);
    }
});


useEffect(() => {
    if(editRoleVisible){
       document.addEventListener("dblclick", onClickOutSideRole);
    }
    return () => {
       document.removeEventListener("dblclick", onClickOutSideRole);
    }
});

useEffect(() => {
    if(editAddressVisible){
       document.addEventListener("dblclick", onClickOutSideAddress);
    }
    return () => {
       document.removeEventListener("dblclick", onClickOutSideAddress);
    }
});

const handleNameChange = () =>{
  const isValid=nameValidation();
  if(isValid){
    put("/EditCompanyName",{_id:"61a4739875c76feb200ca414",firstName:firstName,lastName:lastName,})
    .then((result) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
  }
}


const handleRoleChange = () =>{
  const isValid=roleValidation();
  if(isValid){
    put("/EditCompanyRole",{_id:"61a4739875c76feb200ca414",role:role,})
    .then((result) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
  }
}

const handleAddressChange = () =>{
  const isValid=addressValidation();
  if(isValid){
    put("/EditCompanyAddress",{_id:"61a4739875c76feb200ca414",streetAddress:streetAddress,city:city,state:state,zipCode:zipCode})
    .then((result) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
  }
}

const nameValidation = () =>{
    setFirstNameErr("");
    setLastNameErr("");
    const firstNameErr="";
    const lastNameErr="";
    let isValid=true;
  var nameExp = /^[a-zA-Z\s]*$/;
  var regexName = new RegExp(nameExp);
  if(firstName==="" || (firstName.search(regexName) == -1)){
    isValid=false;
    setFirstNameErr("Please enter a valid FirstName");
  }
  if(lastName==="" || (lastName.search(regexName) == -1)){
    isValid=false;
    setLastNameErr("Please enter a valid Lastname");
  }
  return isValid;
}

const roleValidation = () =>{
    setRoleErr("");
    const roleErr="";
    let isValid=true;

    if(role==""){
      isValid=false;
      setRoleErr("Please enter a valid role");
    }
    return isValid;
}

const addressValidation = () =>{
  setStreetAddressErr("");
  const streetAddressErr="";
  setCityErr("");
  const cityErr="";
  setStateErr("");
  const stateErr="";
  setZipCodeErr("");
  const zipCodeErr="";

    let isValid=true;

    if(streetAddress===""){
      isValid=false;
      setStreetAddressErr("Please enter a valid street");
    }
    var exp= /^[a-zA-Z][a-zA-Z ]*$/;
    var regEx = new RegExp(exp);
    if(city==="" || (city.search(regEx) == -1)){
      isValid=false;
      setCityErr("Please enter a valid city");
    }
    if(state==="" || (state.search(regEx) == -1)){
      isValid=false;
      setStateErr("Please enter a valid state");
    }
    var zipEx = /^\d+$/
    var regZIP = new RegExp(zipEx);
    if(zipCode==="" || (zipCode.search(regZIP) == -1) || (zipCode.length!=5)){
      isValid=false;
      setZipCodeErr("Please enter a valid zipcode");
    }
    return isValid;
}

  return(
    <div className="body-profile">
    <NavBar/>
    <div>
    <div className="first">
    <Row>
    <Col>
    <div className="circle">
    <h1 className="text">{getAcronym(employerData.firstName,employerData.lastName)}</h1>
    </div>
    </Col>
    <Col>
    <h2 className="main-heading"><strong>{employerData.firstName} {employerData.lastName}</strong></h2>
    </Col>
    </Row>
    </div>
      {editContactVisible ? (
        <div className="info-profile page-body shadow name-hidden">
          <h6 className="heading-profile">Contact Information</h6>
        <div className="hidden-body">
        <p className="heading-profile"><span style={{color:"red"}}>*</span>Required Fields</p>
        <p className="heading-profile">First Name<span style={{color:"red"}}>*</span></p>
          <input
          type="text"
          ref={inputRefContact}
          name="firstName"
          className="form-control"
          onChange={
            (e)=>{
              setFirstName(e.target.value);
            }
          }
          />
          <div className="error-msg" style={{color:"red"}}>{firstNameErr}</div>
          <p className="heading-profile">Last Name<span style={{color:"red"}}>*</span></p>
          <input
          type="text"
          ref={inputRefContact}
          name="lastName"
          className="form-control"
          onChange={
            (e)=>{
              setLastName(e.target.value);
            }
          }
          />
          <div className="error-msg" style={{color:"red"}}>{lastNameErr}</div>
          <div className="save-button">
          <button type="button" className="btn btn-primary btn-md" onClick={handleNameChange}>Save</button>
          </div>
          </div>
        </div>
              ) : (
          <div className="info-profile page-body shadow name">
          <h6 className="heading-profile">Contact Information</h6>
          <div style={{textAlign:"left"}} className="hidden">
          <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-99%",width:"3.5%"}} onClick={() => setEditContactVisible(true)}>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
              </path>
            </svg>
          </button>
          <div>
          <p>{employerData.firstName} {employerData.lastName}</p>
          </div>
        </div>
      </div>
      )}
      </div>
      <div>
      {editRoleVisible ? (
        <div className="info-profile page-body shadow role-hidden">
          <h6 className="heading-profile">Role</h6>
        <div className="hidden-body-profile">
          <p className="heading-profile"><span style={{color:"red"}}>*</span>Required Fields</p>
          <p className="heading-profile">Role in the Company<span style={{color:"red"}}>*</span></p>
          <input
          type="text"
          ref={inputRefRole}
          name="role"
          className="form-control"
          onChange={
            (e)=>{
              setRole(e.target.value);
            }
          }
          />
          <div className="error-msg" style={{color:"red"}}>{roleErr}</div>
          <div className="save-button">
          <button type="button" className="btn btn-primary btn-md" style={{margin:"30px"}} onClick={handleRoleChange}>Save</button>
          </div>
          </div>
        </div>
        ) : (
          <div className="info-profile page-body shadow role">
            <h6 className="heading-profile">Role</h6>
          <div style={{textAlign:"left"}} className="hidden">
          <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-99%",width:"3.5%"}} onClick={() => setEditRoleVisible(true)}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
              </path>
            </svg>
          </button>
          <div>
        <p>{employerData.role}<span><IoIosLock /></span></p>
        </div>
        </div>
        </div>
        )}
        </div>
        <div>
        {editAddressVisible ? (
          <div className="info-profile page-body shadow address-hidden">
            <h6 className="heading-profile">Address</h6>
            <div className="hidden-body-profile">
              <p className="heading-profile"><span style={{color:"red"}}>*</span>Required Fields</p>
              <p className="heading-profile">Address<span style={{color:"red"}}>*</span></p>
            <input
            type="text"
            ref={inputRefAddress}
            name="streetAddress"
            className="form-control"
            onChange={
              (e)=>{
                setStreetAddress(e.target.value);
              }
            }
            />
            <div className="error-msg" style={{color:"red"}}>{streetAddressErr}</div>
            <p className="heading-profile">City<span style={{color:"red"}}>*</span></p>
            <input
            type="text"
            ref={inputRefAddress}
            name="city"
            className="form-control"
            onChange={
              (e)=>{
                setCity(e.target.value);
              }
            }
            />
            <div className="error-msg" style={{color:"red"}}>{cityErr}</div>
            <p className="heading-profile">State<span style={{color:"red"}}>*</span></p>
            <input
            type="text"
            ref={inputRefAddress}
            name="state"
            className="form-control"
            onChange={
              (e)=>{
                setState(e.target.value);
              }
            }
            />
            <div className="error-msg" style={{color:"red"}}>{stateErr}</div>
            <p className="heading-profile">ZIP Code<span style={{color:"red"}}>*</span></p>
            <input
            type="text"
            ref={inputRefAddress}
            name="zipCode"
            className="form-control"
            onChange={
              (e)=>{
                setZipCode(e.target.value);
              }
            }
            />
            <div className="error-msg" style={{color:"red"}}>{zipCodeErr}</div>
            <div className="save-button">
            <button type="button" className="btn btn-primary btn-md" style={{margin:"30px",borderRadius:"10%"}} onClick={handleAddressChange}>Save</button>
            </div>
            </div>
          </div>
          ) : (
            <div className="info-profile page-body shadow address">
            <h6 className="heading-profile">Address</h6>
            <div style={{textAlign:"left"}} className="hidden">
            <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-99%",width:"3.5%"}} onClick={() => setEditAddressVisible(true)}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                </path>
              </svg>
            </button>
            <div>
            <p>{employerData.streetAddress}</p>
            </div>
            <div>
            <p>{employerData.city}</p>
            </div>
            <div>
            <p>{employerData.state}</p>
            </div>
            <div>
            <p>{employerData.zipCode}</p>
            </div>
          </div>
        </div>
          )}
        </div>
        </div>
);
}

export default ProfilePage;
