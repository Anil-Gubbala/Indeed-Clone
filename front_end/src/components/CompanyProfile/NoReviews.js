import React,{useState,useEffect} from "react";
import {Row,Col} from "react-bootstrap"
import Rating from '@mui/material/Rating';
import MyReviews from "./empreview"
import NavBar from "./../EmpNavbar/EmpNavbar"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function NoReviews () {

    return(
      <div style={{backgroundColor:"#EEEEEE"}}>
      <NavBar/>
      <div>
      </div>
      <div style={{justifyContent:"center",padding:"25%"}}>
      <h2><SentimentVeryDissatisfiedIcon style={{fontSize:"3rem"}}/> No Reviews recorded for your company yet</h2>
      </div>
      </div>
    );
}

export default NoReviews;
