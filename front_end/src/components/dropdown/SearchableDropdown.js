import React, { useState, useEffect } from 'react'
import Input from './Input';
import ConditionalRenderedList from './ConditionalRenderedList';
import LocationRenderList from './LocationRenderList';
import { DashboardPopup } from '../dashboard/DashboardPopup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import DashNav from '../navbar/DashNav';
import $ from 'jquery';
import Popper from 'popper.js';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'bootstrap';
import { get, put, post } from "../../utils/serverCall";


export const SearchableDropdown = ({list, location}) => {
    const [value, setValue] = useState('');
    const [city, setCity] = useState('');
    const [avgrating, setAvgRating] = useState(0);
    const [countreviews, setCountReviews] = useState(0);
    const [toggle, setToggle] = useState('');
    const [citytoggle, setCityToggle] = useState('');
    const [cart, setCart] = useState([]);
    const [jobList, setJobList] = useState([]);
    const [joblocation, setLocation] = useState('');
    const [jobtitle, setJobTitle] = useState('');
    const [jobrole, setJobRole] = useState('');
    const [jobsarraydb, setJobsArrayDb] = useState([]);

    const [favorite, setFavorite] = useState([]);

      const handleClick = (id) => {
        if(favorite[id] === 0){
          favorite[id]=1;
        }
        else{
          favorite[id]=0;
        }
        
        //setFavorite([...favorite, id]);
        console.log(favorite);
        }

    const addToPopup = (el) => {

        setCart([el]);
        async function fetch() {
          console.log(el.companyId._id);
          var compid=JSON.stringify(el.companyId._id);

          await post('/empReviews/avgrating',{"companyId":el.companyId._id})
          .then((result) => {
            console.log(result);
            setAvgRating(result[0].avgrating);
          setCountReviews(result[0].totalreviews)
          console.log(result[0].avgrating);
          })
          .catch((error) => {
            console.log(error);
          });

          
        }
        fetch();
        
      }

      const savejob = async (a) => {
        console.log(a);
        console.log(localStorage.getItem("emailId"));

        await post('/addfav',{emailId: localStorage.getItem("emailId"),jobId:a})
        .then((result) => {
          console.log(result);
        if(result==="success"){
          alert("operaion successful");
        }
        else{
          console.log("operation failed");
        }
         console.log("We are in save job!");
        })
        .catch((error) => {
          console.log(error);
        });
        

      };

      const unsavejob = (b) => {
        console.log("We are in unsave job!");
     };
    
      let details = cart.map((jobdetails,index) => {
        return (
          <body>
          <div class="Header">
          <img src="https://d2q79iu7y748jz.cloudfront.net/s/_headerimage/1960x400/8af1f1544e551bf42990ae60c8e5ccd8" alt="company" width="670" height="100"/>
            <p>{jobdetails.role}</p>
            <p><Link to={"/companyHomes?id="+jobdetails.companyId._id}>{jobdetails.companyId.name} </Link> &nbsp; {avgrating} &nbsp; {countreviews}</p>

            <Rating name="half-rating-read" defaultValue={2.0} precision={0.5} readOnly />

            <a><button type="button" class="btn btn-primary">Apply Now</button></a>
            <button type="button" class="btn btn-primary lovesymbol">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg>
            </button>
            
        </div>
        
        <div class="Content">
        
            <div class="Wrapper">
                
                <div class="LeftContent">
                <hr/>
                    
                    <p>{jobdetails.work}</p>
                    <p>{jobdetails.why}</p>
                    <p>{jobdetails.need}</p>

                </div>
            </div>
        </div>
        </body>
        )
      })

      useEffect(() => {
        async function fetchData() {

       await post('/filterjob',{role:"",location:""})
       .then((result) => {
        console.log(result);
        setJobList(result);
        setJobsArrayDb(result);
      })
      .catch((error) => {
        console.log(error);
      });

        }
        fetchData();
    }, [])


    

    const onSubmit = async e => {
        e.preventDefault();
        console.log(value+" "+city);
        await post('/filterjob',{role:value,location:city})
        .then((result) => {
          if (value == "" && city == "") {
            console.log("reached if");
            setJobList(result);
          }
          else{
            console.log("reached else");
        let arra = [];
        arra = jobsarraydb.filter((salary) => {
          return (
            (salary.role == value || salary.companyId.name == value ||
              value == "") &&
            (salary.location.city == city ||
              city == "")
          );
        });
        setJobList(arra);
          }
        })
        .catch((error) => {
          console.log(error);
        });
        
        




        //console.log(r.data);
       // setJobList(r.data);
    }
    return (
        <>
            
            <div style={{display: 'flex', flexDirection: 'column', padding: '1rem', alignItems:'center',position:'relative'}}>
                <form onSubmit={e => onSubmit(e)} class="form-inline">



                {/* <Input class="form-control" onChange={(inputValue) =>{setValue(inputValue); setToggle(true)}}
                value={value}
                />
                <Input onChange={(inputValue) =>{setCity(inputValue); setCityToggle(true)}}
                value={city}
                /> */}

         <div class="form-text">
        <div class="input-box">
      <Input class="dashboardinput" onChange={(inputValue) =>{setValue(inputValue); setToggle(true)}} value={value} autofocus="autofocus"/>
       <span class="unit">What</span>
          </div>
        </div>

      <div>
        <div class="input-box">
      <Input class="dashboardinput" onChange={(inputValue) =>{setCity(inputValue); setCityToggle(true)}} value={city} autofocus="autofocus"/>
       <span class="unit">Where</span>
          </div>
          </div>
                
                    <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Find Jobs</button>
                    
                </form>
                
                <ConditionalRenderedList 
                value={value}
                list={list}
                setValue={setValue}
                toggle={toggle}
                setToggle={setToggle}
                />

                <LocationRenderList
                city={city}
                list={location}
                setCity={setCity}
                citytoggle={citytoggle}
                setCityToggle={setCityToggle}
                />
                <hr></hr>
            </div>
            <div class="row dashmargin">
        <div class="col-4">
      <ul class="dash-ul">
        {jobList.map((country,index) => (
          <div class="dash-button">

            <li class="col-5 stunt" key={country.role.trim()}  onClick={() => addToPopup(country)}>
              <div >
                <div class="maincard" >
    <div class="card yash">
                   

  <table>
  <tr>
    <th  style={{width:'95%'}}>{country.role}    &nbsp; &nbsp; {country.location.city}</th>
    <th class="innerDiv">
    
    
    <div className="row top-buffer">
        <div className="col">
            <div className="dropdown">
                <button 
                    className="btn btn-secondary dots3" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-toggle="dropdown" 
                    aria-haspopup="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" onClick={() => savejob(country._id)}>Save Job</a>
                    <a className="dropdown-item" href="#nogo">Not Interested</a>
                    <a className="dropdown-item" href="#nogo">Report Job</a>
                    <a className="dropdown-item" onClick={() => unsavejob(country._id)}>UnSave Job</a>
                    {/* <a><button button
                  key={index} 
                 onClick={()=>handleClick(index)}
                  color={favorite.indexOf(index) > 0 ? 'red' : 'blue'}>save</button>
                  </a> */}
                </div>
            </div>
        </div>
    </div>


    </th>

 
    
  </tr>
  <tr>
    <td>{country.companyId.name}</td>
    <td></td>
    
  </tr>
  <tr>
    <td>{country.location.city}</td>
    <td></td>
    
  </tr>
  <tr>
    <td>{country.location.state}, {country.location.zip}</td>
    <td></td>
    
  </tr>
  <tr>
    <td>$18 an hour</td>
  </tr>
  <tr>
    <table>
    <tr>
    <td>Easy Apply &nbsp; &nbsp;</td>
    <td>Urgently hiring</td>
    </tr>
    </table>
    
  </tr>
  <tr>
    <ul>
      <li class="dashli">You’ll take care of our guests, including check in/check out, billing, ensuring we collect correct guest data, and communicating any guest issues that arise.</li>
      <li class="dashli">You’ll take care of our guests, including check in/check out</li>
    </ul>
  </tr>
</table>



                    

                  </div>
                </div>
              </div>



            </li>

          </div>

        ))}




      </ul>

      
      </div>
      <div class="col-6 popupdet">
        <div class="dash-details">

        <div class="Container">
        {details}
    </div>
         
      
      </div>
      </div>
      </div>
        </>
    )
}

export default SearchableDropdown;