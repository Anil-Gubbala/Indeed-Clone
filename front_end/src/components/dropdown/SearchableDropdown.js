import React, { useState, useEffect } from 'react'
import Input from './Input';
import ConditionalRenderedList from './ConditionalRenderedList';
import LocationRenderList from './LocationRenderList';
import { DashboardPopup } from '../dashboard/DashboardPopup';
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
          <tr>
            <tr>Role: &nbsp; {book.role}</tr>
            <tr>Location:       &nbsp;     {book.location}</tr>
            <tr>What: &nbsp;     {book.what}</tr>
            <tr>Why: &nbsp;     {book.why}</tr>
            <tr>Need: &nbsp;     {book.need}</tr>
          </tr>
        )
      })

      useEffect(() => {
        async function fetchData() {
       var re = await axios.post('/filterjob',{role:"",location:""});
        console.log(re.data);
        const res = re.data.map(
            ({details, ...rest}) => details.map(o => Object.assign({}, rest, o))
          ).flat();
        setJobList(res);
        }
        fetchData();
    }, [])

    const onSubmit = async e => {
        e.preventDefault();
        console.log(value+" "+city);
        var r = await axios.post('/filterjob',{role:value,location:city});
        const result = r.data.map(
            ({details, ...rest}) => details.map(o => Object.assign({}, rest, o))
          ).flat();
        console.log(result);
        setJobList(result);
    }
    return (
        <>
            
            <div style={{display: 'flex', flexDirection: 'column', padding: '1rem', alignItems:'center',position:'relative'}}>
                <form onSubmit={e => onSubmit(e)}>
                <Input onChange={(inputValue) =>{setValue(inputValue); setToggle(true)}}
                value={value}
                />
                <Input onChange={(inputValue) =>{setCity(inputValue); setCityToggle(true)}}
                value={city}
                />
                
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
        <div class="col-6">
      <ul class="dash-ul">
        {jobList.map(country => (
          <div class="dash-button" onClick={() => addToPopup(country)}>

            <li class="stunt" key={country.role.trim()}>
              <div >
                <div class="col-lg-4 maincard">
                  <div class="card yash">
                   
                    <div class="row card-body">
                      <h5 class="card-title">{country.role}</h5>
                      <p>{country.location}</p>
                      <p>{country.salaryDetails}</p>
                      <p>{country.what}</p>

                    </div>
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
      {details}
      <DashboardPopup ></DashboardPopup>
      </div>
      </div>
      </div>
        </>
    )
}

export default SearchableDropdown;