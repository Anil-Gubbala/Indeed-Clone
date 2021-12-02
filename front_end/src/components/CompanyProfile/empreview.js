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
                    <Col className="product-rating">
                     <div>{d.rating}/5</div>
                     <div>
                     <Rating name="half-rating-read" defaultValue={4} value={d.rating} precision={0.5} readOnly />
                     </div>
                    </Col>
                    <Col className="product-body">
                      <h2>{d.summary}</h2>
                      <div>{d.review}</div>
                      <div><h6><DoneIcon style={{color:"#43A047"}}/>Pros</h6></div>
                      <div>{d.pros}</div>
                      <div><h6><CloseIcon style={{color:"#D32F2F"}}/>Cons</h6></div>
                      <div>{d.cons}</div>
                    </Col>
                    </Row>
                        </div>
                      <Row>
                      <Col>
                      </Col>
                      <Col>
                      <span><ThumbUpIcon style={{color:"#DFD8CA"}}/>{d.upVotes}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><ThumbDownIcon style={{color:"#DFD8CA"}}/>{d.downVotes}</span>
                      <div><button type="button" className="btn btn-outline" onClick={()=>{handleMarkFeatured(d._id)}}><FavoriteIcon style={{color:"#D32F2F"}}/></button><span> Mark as featured</span></div>
                      </Col>
                      </Row>
                      <hr style={{size:"50%",color:"#BDBDBD"}}/>
                  </div>
                </div>
                </Row>
              </div>
    )
}

export default empreview;
