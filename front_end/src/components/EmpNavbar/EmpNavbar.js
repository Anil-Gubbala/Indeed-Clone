import React from 'react';
import {Link} from 'react-router-dom';
import './Employer.css'

function Navbar(){


    function logOut(){
        localStorage.clear();
        window.open('../UserSign','_self');
    }

    return(
        <div className="Nav">
            
            <div className="leftside">
                
                <div className="links">
                <Link to={"/EmployerLanding"} className="a" style={{fontSize:"20px"}}>indeed</Link>
                <Link to={"/EmployerLanding"} className="a">Dashboard</Link>
                
                
                <Link to={"/"} className="a">Reviews</Link>
                 <button>Open</button>
            </div>
            </div>
            <div className="rightside">
                <div className="links">
                <Link to={"/LogOut"} className="a">Log Out</Link>
            
            </div>
            </div>

        </div>
    );
}
export default Navbar;