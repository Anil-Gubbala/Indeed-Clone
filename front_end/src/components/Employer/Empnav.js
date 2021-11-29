import React from 'react';
import {Link} from 'react-router-dom';
import './EmployerLanding.css'

function Navbar(){


    function logOut(){
        localStorage.clear();
        window.open('../UserSign','_self');
    }

    return(
        <div className="EmpNav">
            
            <div className="leftside">
                
                <div className="links">
                <Link to={"/EmployerLanding"} className="a">Jobs</Link>
                <Link to={"/Candidates"} className="a">Candidates</Link>
                <Link to={"/"} className="a">Messages</Link>
                
            </div>
            </div>
            <div className="rightside">
                <div className="links">
                <Link to={"/PostJob"}><button className="btnpostJob" >Post a Job</button></Link>
            
            </div>
            </div>

        </div>
    );
}
export default Navbar;