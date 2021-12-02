import React,{useState,useEffect} from "react";
import { get } from '../../utils/serverCall';
import {Row,Col} from "react-bootstrap"
import Rating from '@mui/material/Rating';
import MyReviews from "./empreview"
import NavBar from "./../EmpNavbar/EmpNavbar"

function employerReviews () {

const[featured,setFeatured] = useState("");
const[review,getReviews] = useState({});

useEffect(() => {
      get(`/empReviews/getCompanyReviews`)
        .then((result) =>{
        console.log("data for display",result.reviews);
          const allReviews= result.reviews;
          getReviews(allReviews)
      }).catch(err =>{
        console.log(err);
      })
    }, [])


    return(
      <>
      <NavBar/>
      <div>
      </div>
      {Array.from(review).map(function(d,idx){
        return(<div>
          <MyReviews d={d} />
        </div>
      )
      })}
      <div>
      <p style={{textAlign:"left",padding:"1%",fontSize:"0.9rem",color:"#9D9D9D"}}>Hiring   Lab   Career   Advice   Browse   Jobs   Browse   Companies   Salaries   Find Certifications   Browse Schools   Indeed Events   Work at Indeed Countries   About   Help   Center</p>
      <p style={{textAlign:"left",padding:"1%",fontSize:"0.9rem",color:"#9D9D9D"}}>© 2021 Indeed Do Not Sell My Personal Information Accessibility at Indeed Privacy Center Cookies Privacy Terms</p>
      </div>
      </>
    );
}

export default employerReviews;
