import React, {useState,useEffect} from 'react';
import './Statistics.css';
import Navbar from'../EmpNavbar/EmpNavbar';
import Axios from 'axios';
import {Link} from 'react-router-dom';


function Statistics(){

    const[applicants,setApplicants]=useState([]);
    var selected=0;
    var rejected=0;

    useEffect(()=>{
        console.log("viewing candidates");
        //Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    
        Axios.post("http://localhost:8080/viewApplicants",
        {jobId: localStorage.getItem('jobId')}).then((response)=>{
          setApplicants(response.data.applicants);
          console.log(response.data.applicants);
         
        });
        
    },[]);

applicants.forEach(myFunction);

function myFunction(item){
    if(item.status=='Hired'){
selected+=1;
    }
}



  
    return(
        <><Navbar />
<div className="statistics">
    <div className="statisticsProp">
      <p style={{fontSize:"50px"}}>{localStorage.getItem('jobTitle')}</p>
      <div className="row">
      <div className='col1'>
          <p>{applicants.length}</p>
          <p>Applicants</p>
      </div> 
      <div className='col2'>
          <p>{selected}</p>
          <p>Selected</p>
      </div>
      <div className='col2'>
          <p>{applicants.length-selected}</p>
          <p>Rejected</p>
      </div> 
      </div>
    </div>
    
</div>
        </>
    )
}

export default Statistics;