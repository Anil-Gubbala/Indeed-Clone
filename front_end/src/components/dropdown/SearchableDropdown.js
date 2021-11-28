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
export const SearchableDropdown = ({list, location}) => {
    const [value, setValue] = useState('');
    const [city, setCity] = useState('');
    const [toggle, setToggle] = useState('');
    const [citytoggle, setCityToggle] = useState('');
    const [cart, setCart] = useState([]);
    const [jobList, setJobList] = useState([]);
    const addToPopup = (el) => {

        setCart([el]);
    
      }
    
      let details = cart.map(book => {
        return (
          <>
          <div class="Header">
            <p>The Header div height is not fixed (But he can be if you want it to)</p>
            <p>This Layout has been tested on: IE10, IE9, IE8, FireFox, Chrome, Safari, Opera. using Pure CSS 2.1 only</p>
           
        </div>
        
        <div class="Content">
        
            <div class="Wrapper">
                
                <div class="LeftContent">
                <hr/>
                    <p>
                    {book.work}
                    </p>
                    <p>{book.why}</p>
                    <p>{book.need}</p>
                </div>
            </div>
        </div>
        </>
        )
      })

      useEffect(() => {
        async function fetchData() {
       var re = await axios.post('/filterjob',{role:"",location:""});
        console.log(re.data);
        // const res = re.data.map(
        //     ({details, ...rest}) => details.map(o => Object.assign({}, rest, o))
        //   ).flat();
        
        setJobList(re.data);
        }
        fetchData();
    }, [])

    const onSubmit = async e => {
        e.preventDefault();
        console.log(value+" "+city);
        var r = await axios.post('/filterjob',{role:value,location:city});
        // const result = r.data.map(
        //     ({details, ...rest}) => details.map(o => Object.assign({}, rest, o))
        //   ).flat();
        console.log(r.data);
        setJobList(r.data);
    }
    return (
        <body>
            
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
      <Input onChange={(inputValue) =>{setValue(inputValue); setToggle(true)}} value={value} autofocus="autofocus"/>
       <span class="unit">What</span>
          </div>
        </div>

      <div>
        <div class="input-box">
      <Input onChange={(inputValue) =>{setCity(inputValue); setCityToggle(true)}} value={city} autofocus="autofocus"/>
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
            <div class="row">
        <div class="col-4">
      <ul class="dash-ul">
        {jobList.map(country => (
          <div class="dash-button" >

            <li class="col-5 stunt" key={country.role.trim()}>
              <div >
                <div class="maincard">
                  <div class="card yash">
                   

  <table>
  <tr>
    <th onClick={() => addToPopup(country)} style={{width:'95%'}}>{country.role}    &nbsp; &nbsp; Guest Service Worker, California</th>
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
                    <a className="dropdown-item" href="#nogo">Save Job</a>
                    <a className="dropdown-item" href="#nogo">Not Interested</a>
                    <a className="dropdown-item" href="#nogo">Report Job</a>
                </div>
            </div>
        </div>
    </div>


    </th>

 
    
  </tr>
  <tr>
    <td>{country.location.city}</td>
    <td></td>
    
  </tr>
  <tr>
    <td>California, CA 95126</td>
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
      <div class="col-6">
        <div class="dash-details">

        <div class="Container">
        {details}
    </div>
         
      
      </div>
      </div>
      </div>
        </body>
    )
}

export default SearchableDropdown;