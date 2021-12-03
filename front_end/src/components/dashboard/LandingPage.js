import React, { Fragment, useEffect, useState } from 'react'
import Navbar from '../navbar/navbar'
import SearchableDropdown from '../dropdown/SearchableDropdown';
import './Dashboard.css'
import { DashboardPopup } from './DashboardPopup';

import axios from 'axios';
import DashNav from '../navbar/DashNav';
import DashLoginNav from '../navbar/DashLoginNav';
import { get, put, post } from "../../utils/serverCall";


var list2=[{role: 'SDE'}];
var locat=[{city: 'San Jose'}];



export const LandingPage = (props) => {

  const [cart, setCart] = useState([]);
  const [roles, setRoles] = useState([]);
  const [location, setLocation] = useState([]);
  const [card, setCard] = useState([]);

    useEffect(() => {
      async function fetchData() {
        //const req = await axios.get('/getjobinsearch');
        
        var r = await axios.post('/filterjob',{role:"",location:""});
        setCart(r.data);

        //console.log(req.data);
        const result = r.data;

        console.log(result);

        result.forEach((item) => {
          var myObj = {
            "role" : item.role
          };
          var myObj2 = {
            "role" : item.companyId.name
          };
          var loc = {
            "city": item.location.city
          };
        
          if (!list2.includes(myObj)){
          list2.push( myObj );
          }
          if (!list2.includes(myObj2)){
          list2.push( myObj2 );
          }
          if (!locat.includes(loc)){
            locat.push( loc );
            }
        
        });

        console.log(list2);
        console.log(result);
        list2 = list2.filter((li, idx, self) => self.map(itm => itm.role).indexOf(li.role) === idx)
        locat = locat.filter((li, idx, self) => self.map(itm => itm.city).indexOf(li.city) === idx)
        setRoles(list2);
        setLocation(locat);
      }

      fetchData();
    }, [])

  

  return (
    <body>
     
      <DashLoginNav/>
      <div>
        <SearchableDropdown list={roles} location={location} />
      </div>
      
    </body>
  )
}
