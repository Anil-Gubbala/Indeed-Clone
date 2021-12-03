import React, {useState,useEffect} from 'react';
import './EmployerLanding.css';
import Navbar from '../EmpNavbar/EmpNavbar';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import EmpNav from './Empnav';
import image from '../images/postjob.PNG'
import ReactPaginate from 'react-paginate';
import {post} from '../../utils/serverCall';

function EmployerLanding(){
    const[jobsPosted,setJobPosted]=useState([]);
    const [pageNumber,setPageNumber]=useState(0);
    const jobPerPage =2;
    const pagesVisited= pageNumber*jobPerPage;
    const totalPage=(jobsPosted.length/2);
    
        
    const pageChange=({selected})=>{
        setPageNumber(selected);

    }

    /*const applyJob=(jobId)=>{
        console.log("Appling");
        Axios.post("http://localhost:3001/applyJob",
        {companyId: "1", userId:"3",jobId:jobId,status:"Applied"}).then((response)=>{

          console.log("Applied");
         
        });
    }*/

    const displayJobs= jobsPosted.slice(pagesVisited, pagesVisited+jobPerPage)
    .map(function (d, idx) {
            
    return (
        <div className="joProp">
            <Link to={"/Candidates"} 
            onClick={()=>{localStorage.setItem('jobId',d._id);
            localStorage.setItem('jobTitle',d.JobTitle);
        
        }}
            style={{color:"steelblue"}}><h5>{d.JobTitle}</h5></Link>
            {d.JobType}
            <p>{d.Type}</p>
            Address: {d.Street}, {d.City}, {d.State}, {d.Zip}
    
    
            
        </div>
    );
    
    })

    useEffect(()=>{
        //Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    
        post("/viewJobs",
        {companyId: localStorage.getItem('companyId')}).then((response)=>{
          setJobPosted(response.jobsPosted);
          console.log(response.jobsPosted);
         
        });
        
    },[]);

    console.log(jobsPosted.length);
    if(jobsPosted.length!=0){
        return(
            <div className='employerLanding'>
    <Navbar/>
    <EmpNav/>
    
    {displayJobs}
    <div className="joProp">
             <ReactPaginate
             
             previousLabel={"Previous"}
             nextLabel={"Next"}
             pageCount={totalPage}
             onPageChange={pageChange}
             containerClassName={"paginationButtons"}
             previousLinkClassName={"previousButton"}
             nextLinkClassName={"nextButton"}
             disabledClassName={"disabledButton"}
             activeClassName={"activeButton"}
             />
    </div>
            </div>
        )
       
    
    }else{
        return(
            <div className='employerLandingNoJob'>
            <Navbar/>
            <div className="row">
                <div className="column1">
                    <p><h1 style={{fontSize:"520%"}}>You're here to hire.</h1></p>
                    <p><h1 style={{fontSize:"520%"}}>We're here to help.</h1></p>
                    <p style={{fontSize:"170%"}}>Post your job, interview candidates, and make offers all on Indeed. Start hiring today.</p>
                    <Link to={"/PostJob"}><button className="btnpostJob" >Post a Job</button></Link>
                </div>
                <div className="column2">
    <img src={image} alt="img" style={{height:"400px", width:"400px"}}/>
                </div>
    
            </div>
            </div>
        );
   
}
}

export default EmployerLanding;