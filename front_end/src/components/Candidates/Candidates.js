import React, {useState,useEffect} from 'react';
import './Candidates.css';
import Navbar from'../EmpNavbar/EmpNavbar';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import EmpNav from '../EmployerLanding/Empnav'
import image from '../images/find.jpg'

function Candidates(){

    const[applicants,setApplicants]=useState([]);
    const[applicationStatus,setApplicationStatus]=useState("");

    useEffect(()=>{
        console.log("viewing candidates");
        //Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    
        Axios.post("http://localhost:8080/viewApplicants",
        {jobId: localStorage.getItem('jobId')}).then((response)=>{
          setApplicants(response.data.applicants);
          console.log(response.data.applicants);
         
        });
        
    },[]);

    const setStatus=(id)=>{
        //Axios.defaults.headers.common.authorization = localStorage.getItem('token');
        Axios.post("http://localhost:8080/setApplicationStatus",
        {id:id,status:applicationStatus}).then((response)=>{
          console.log(response.data.data);
         
        });
    }

    if(applicants.length==0){
        return(
            <><Navbar /><EmpNav />
            <div className="header">{localStorage.getItem('jobTitle')}</div>
            <div className="noCandidates">
                <img src={image} alt="img" style={{height:"20%", width:"20%"}} />
                <p style={{fontWeight:"bold", color: "black"}}>There aren't any applicants in your list.</p>
                <Link to={"/EmployerLanding"} style={{fontWeight:"bold", color: "rgb(9, 79, 136)"}}>View all Jobs</Link>

            </div></>
        )

    }else{
    return(
        <><Navbar />
        <EmpNav/>
        <div className="header">{localStorage.getItem('jobTitle')} ({applicants.length})</div>
        {
applicants.map(function (d, idx) {
return (
    
    <div className="candidates">
        <div className="leftside">
        <Link to={"/ApplicantProfile"} 
        onClick={()=>{localStorage.setItem('userId',d._id)}}
        style={{color:"rgb(9, 79, 136)"}} ><h3>{d.userName}</h3></Link>
        <p>
        <a href={d.resume} download="Resume" style={{color:"black", fontSize:"13px"}}>Resume</a></p>
        <p>
        <a href={d.coverLetter} download="Resume" style={{color:"black", fontSize:"13px"}}>CoverLetter</a></p>
        <p>Status: {d.status}</p>
        
        <div className="rightside">
        <select type="text" className="select" onChange={(e)=>{
                    setApplicationStatus(e.target.value); }}>
						    <option ></option>
                            <option value="Reviewed">Reviewed</option>
	                         <option value="Initial Screening">Initial Screening</option>
                             <option value="Interviewing">Interviewing</option>
                             <option value="Hired">Hired</option>
                            </select>
                            <button className="rightsideButton" onClick={() => { setStatus(d._id); } }>Update</button>
        
                            </div>
                            </div> 
                            </div>
);
})}
        </>
    )
}
}
export default Candidates;