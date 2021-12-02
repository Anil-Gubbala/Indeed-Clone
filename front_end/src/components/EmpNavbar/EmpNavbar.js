import React from 'react';
import {Link} from 'react-router-dom';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import './Employer.css'


    // <Link to={"/employerProfile"} className="icon"><PersonIcon/></Link>
function Navbar(){


    function logOut(){
        localStorage.clear();
        window.open('../UserSign','_self');
    }

    return(
      <>
        <div className="Nav">

            <div className="leftside">

                <div className="links">
                <Link to={"/EmployerLanding"} className="a"><span><img src="/images/indeedemployer.png" alt="indeed-employer" style={{width:"78%"}}/></span></Link>
                <button>Open</button>
                </div>
                <div className="links">
                <Link to={"/EmployerLanding"} className="a active">Dashboard</Link>
                <Link to={"/employerReviews"} className="a">Reviews</Link>
                  <Link to={"/Analytics"} className="a">Analytics</Link>
                 <button>Open</button>
            </div>
            </div>
            <div className="rightside">
                <div className="links">
                <Link to={"/EmployerLanding"} className="a active">Help Center<HelpIcon/></Link>
                </div>
                <div className="links">
                <NotificationsIcon className="icon-nav" style={{height:"30px",width:"100px",color:"white"}}/>
                </div>
                <div className="links">
                <Link to={"/Messages"}><QuestionAnswerIcon className="icon-nav" style={{height:"30px",width:"100px",color:"white"}}/></Link>
                </div>
                <div class="dropdown">
                <button class="btn btn-outline dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <PersonIcon className="icon-nav" style={{height:"30px",width:"100px",color:"white"}}/>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="http://localhost:3000/employerProfile"><span><ArticleIcon/></span>Profile</a>
                &nbsp;
                <a class="dropdown-item" href="http://localhost:3000/editCompany"><span><EditIcon/></span>Edit Your Company Profile</a>
                <hr/>
                <a class="dropdown-item" href="#"><span><LogoutIcon/></span>Logout</a>
                </div>
                </div>
            </div>
            </div>
</>
    );
}
export default Navbar;
