import React, { Fragment, useEffect, useState } from 'react'
import Navbar from '../layout/Navbar';
import SearchableDropdown from '../dropdown/SearchableDropdown';
import './Dashboard.css'
import { DashboardPopup } from './DashboardPopup';

import axios from 'axios';


const list = [
  { id: 1, data: 'amazon' },
  { id: 2, data: 'google' },
  { id: 3, data: 'linkedin' },
  { id: 4, data: 'arizon' },
  { id: 5, data: 'paypal' },
  { id: 6, data: 'Roblox' }
]

var list2=[{role: 'SDE'}]

// const location = [
//   { id: 1, data: 'Texas' },
//   { id: 2, data: 'San Jose' },
//   { id: 3, data: 'Santa Clara' },
//   { id: 4, data: 'Milpitas' }
// ]


export const Dashboard = (props) => {

  const [cart, setCart] = useState([]);
  const [roles, setRoles] = useState([]);
  const [location, setLocation] = useState([]);
  const [card, setCard] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const req = await axios.get('/getjobinsearch');
        
        //console.log(req.data);
        const result = req.data.map(
          ({details, ...rest}) => details.map(o => Object.assign({}, rest, o))
        ).flat();

        result.forEach((item) => {
          var myObj = {
            "role" : item.role
          };
          var myObj2 = {
            "role" : item.companyName
          };
        
          list2.push( myObj );
          list2.push( myObj2 );
        });

        console.log(list2);
        console.log(result);
        list2 = list2.filter((li, idx, self) => self.map(itm => itm.role).indexOf(li.role) === idx)
        setRoles(list2);
        setLocation(result);
      }

      fetchData();
    }, [])

  

  return (
    <body>
      <Navbar />
      
      <div>
        <SearchableDropdown list={roles} location={location} />
      </div>
      
    </body>
  )
}
