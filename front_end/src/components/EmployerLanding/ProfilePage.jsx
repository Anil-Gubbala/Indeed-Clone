import React,{useState,useRef,useEffect} from "react"
import {Row,Col} from "react-bootstrap"
import Axios from "axios"
import "./ProfilePage.css"
import NavBar from "./../navbar/employerNavBar"

const ProfilePage = () => {

const [employerData,setEmployerData] = useState([]);

useEffect(() => {
  console.log("I am called");
  Axios.post("http://localhost:8080/Profile",{
    _id:"61a4739875c76feb200ca414",
  }).then(response =>{
    console.log(response.data.payload);
    setEmployerData(response.data.payload);
  })
}, [])





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
    Axios.put("http://localhost:8080/EditCompanyName",{
    _id:"61a4739875c76feb200ca414",
    firstName:firstName,
    lastName:lastName,
    }).then((response) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
}

const handleRoleChange = () =>{
    Axios.put("http://localhost:8080/EditCompanyRole",{
    _id:"61a4739875c76feb200ca414",
    role:role,
    }).then((response) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
}

const handleAddressChange = () =>{
    Axios.put("http://localhost:8080/EditCompanyAddress",{
    _id:"61a4739875c76feb200ca414",
    streetAddress:streetAddress,
    city:city,
    state:state,
    zipCode:zipCode,
    }).then((response) =>{
      console.log("Data Stored in Database");
    }).catch(err =>{
      console.log(err);
      console.log("Error saving in database")
    })
    window.location.reload();
}



  return(
    <div className="body-profile">
    <NavBar/>
    <div>
    <div className="first">
    <Row>
    <Col>
    <div className="circle">
    <p className="text"></p>
    </div>
    </Col>
    <Col>
    <h4 className="main-heading"><strong>{employerData.firstName} {employerData.lastName}</strong></h4>
    </Col>
    </Row>
    </div>
      {editContactVisible ? (
        <div className="info-profile page-body shadow name-hidden">
          <h4 className="heading-profile">Contact Information</h4>
        <div className="hidden-body">
        <h6 className="heading-profile"><span style={{color:"red"}}>*</span>Required Fields</h6>
        <h6 className="heading-profile">First Name<span style={{color:"red"}}>*</span></h6>
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
          <h6 className="heading-profile">Last Name<span style={{color:"red"}}>*</span></h6>
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
          <div className="save-button">
          <button type="button" className="btn btn-primary btn-md" onClick={handleNameChange}>Save</button>
          </div>
          </div>
        </div>
              ) : (
          <div className="info-profile page-body shadow name">
          <h4 className="heading-profile">Contact Information</h4>
          <div style={{textAlign:"left"}} className="hidden">
          <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-90%",width:"30px"}} onClick={() => setEditContactVisible(true)}>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
              </path>
            </svg>
          </button>
          <div>
          <h6>{employerData.firstName} {employerData.lastName}</h6>
          </div>
        </div>
      </div>
      )}
      </div>
      <div>
      {editRoleVisible ? (
        <div className="info-profile page-body shadow role-hidden">
          <h4 className="heading-profile">Role</h4>
        <div className="hidden-body-profile">
          <h6 className="heading-profile"><span style={{color:"red"}}>*</span>Required Fields</h6>
          <h6 className="heading-profile">Role in the Company<span style={{color:"red"}}>*</span></h6>
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
          <div className="save-button">
          <button type="button" className="btn btn-primary btn-md" style={{margin:"30px"}} onClick={handleRoleChange}>Save</button>
          </div>
          </div>
        </div>
        ) : (
          <div className="info-profile page-body shadow role">
            <h4 className="heading-profile">Role</h4>
          <div style={{textAlign:"left"}} className="hidden">
          <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-90%",width:"30px"}} onClick={() => setEditRoleVisible(true)}>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
              </path>
            </svg>
          </button>
          <div>
        <h6>{employerData.role}</h6>
        </div>
        </div>
        </div>
        )}
        </div>
        <div>
        {editAddressVisible ? (
          <div className="info-profile page-body shadow address-hidden">
            <h4 className="heading-profile">Address</h4>
            <div className="hidden-body">
              <h6 className="heading-profile"><span style={{color:"red"}}>*</span>Required Fields</h6>
              <h6 className="heading-profile">Address<span style={{color:"red"}}>*</span></h6>
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
            <h6 className="heading-profile">City<span style={{color:"red"}}>*</span></h6>
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
            <h6 className="heading-profile">State<span style={{color:"red"}}>*</span></h6>
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
            <h6 className="heading-profile">ZIP Code<span style={{color:"red"}}>*</span></h6>
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
            <div className="save-button">
            <button type="button" className="btn btn-primary btn-md" style={{margin:"30px",borderRadius:"10%"}} onClick={handleAddressChange}>Save</button>
            </div>
            </div>
          </div>
          ) : (
            <div className="info-profile page-body shadow address">
            <h4 className="heading-profile">Address</h4>
            <div style={{textAlign:"left"}} className="hidden">
            <button type="button" style={{backgroundColor:"white",border:"none",justifyContent:"right",position:"relative",top:"50%",right:"-90%",width:"30px"}} onClick={() => setEditAddressVisible(true)}>
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="black" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
                </path>
              </svg>
            </button>
            <div>
            <h6>{employerData.streetAddress}</h6>
            </div>
            <div>
            <h6>{employerData.city}</h6>
            </div>
            <div>
            <h6>{employerData.state}</h6>
            </div>
            <div>
            <h6>{employerData.zipCode}</h6>
            </div>
          </div>
        </div>
          )}
        </div>
        </div>
);
}

export default ProfilePage;
