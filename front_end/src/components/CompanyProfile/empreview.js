import React from 'react'
import {Link} from "react-router-dom";
import {Row,Col} from "react-bootstrap"
import Rating from '@mui/material/Rating';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { post } from '../../utils/serverCall';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function empreview({d}){

  const handleMarkFeatured = (id) =>{
    post(`/empReviews/markAsFeatured`,{_id:id})
      .then((result) =>{
        console.log("id",id)
        console.log("Added to db!")
    }).catch(err =>{
      console.log(err);
    })
  }

return(
            <div className="body-review">
            <Row>
                <div className="d-flex">
                  <div className="content text-center">
                    <div className="ratings">
                    <Row>
                    <Col className="product-rating" style={{marginLeft:"20%"}}>
                     <div>
                     <h2>{d.rating}.0</h2>
                     <p><Rating name="half-rating-read" defaultValue={4} value={d.rating} precision={0.5} readOnly style={{color:"#AB47BC"}}/></p>
                     </div>
                    </Col>
                    <Col className="product-body text-left" style={{marginRight:"30%"}}>
                      <h2>{d.summary}</h2>
                      <div><p>{d.review}</p></div>
                      <div><h6><DoneIcon style={{color:"#43A047"}}/>Pros</h6></div>
                      <div>{d.pros}</div>
                      <div><h6><CloseIcon style={{color:"#D32F2F"}}/>Cons</h6></div>
                      <div>{d.cons}</div>
                      <span><ThumbUpIcon style={{color:"#DFD8CA"}}/>{d.upVotes}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><ThumbDownIcon style={{color:"#DFD8CA"}}/>{d.downVotes}</span>
                      <div><button type="button" className="btn btn-outline" onClick={()=>{handleMarkFeatured(d._id)}}><FavoriteIcon style={{color:"#D32F2F"}}/></button><span> Mark as featured</span></div>

                    </Col>
                    </Row>
                        </div>
                      <hr style={{size:"50%",color:"#BDBDBD"}}/>
                  </div>
                </div>
                </Row>
              </div>
    )
}

export default empreview;
