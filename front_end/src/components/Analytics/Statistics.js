import React, {useState,useEffect} from 'react';
import './Statistics.css';
import Navbar from'../EmpNavbar/EmpNavbar';
import Axios from 'axios';
import {post} from '../../utils/serverCall';


function Statistics(){

    const[applicants,setApplicants]=useState([]);
    var selected=0;

    useEffect(()=>{
        console.log("viewing candidates");
        //Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    
        post("/viewApplicants",
        {jobId: localStorage.getItem('jobId')}).then((response)=>{
          setApplicants(response.applicants);
          console.log(response.applicants);
         
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