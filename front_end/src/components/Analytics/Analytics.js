import React, {useState,useEffect} from 'react';
import './Analytics.css';
import Navbar from '../EmpNavbar/EmpNavbar';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import image from '../images/postjob.PNG'
import ReactPaginate from 'react-paginate';

function EmployerLanding(){
    const[jobsPosted,setJobPosted]=useState([]);
    const [pageNumber,setPageNumber]=useState(0);
    const jobPerPage =4;
    const pagesVisited= pageNumber*jobPerPage;
    const totalPage=(jobsPosted.length/jobPerPage);
    
        
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
        if(d.Date.slice(0,4)=="2020"){
           
    return (
        <div className="joProp">
            <Link to={"/Statistics"} 
            onClick={()=>{localStorage.setItem('jobId',d._id);
            localStorage.setItem('jobTitle',d.JobTitle);
        
        }}
            ><h5 style={{color:"steelblue", fontWeight:"bold"}}>{d.JobTitle}</h5></Link>
            <p>Date Posted: {d.Date.slice(0,10)}</p>
            
            
        </div>
    );
        }
    })
    

    useEffect(()=>{
        //Axios.defaults.headers.common.authorization = localStorage.getItem('token');
    
        Axios.post("http://localhost:8080/viewJobs",
        {companyId: localStorage.getItem('companyId')}).then((response)=>{
          setJobPosted(response.data.jobsPosted);
          console.log(response.data.jobsPosted);
         
        });
        
    },[]);

    console.log(jobsPosted.length);
    if(jobsPosted.length!=0){
        return(
            <div className='analytics'>
    <Navbar/>
        
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
            <div className='analyticsNoJob'>
            <Navbar/>
            <div className="row">
                <div className="column1">
                    <p><h1 style={{fontSize:"520%"}}>There aren't any jobs posted yet.</h1></p>
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