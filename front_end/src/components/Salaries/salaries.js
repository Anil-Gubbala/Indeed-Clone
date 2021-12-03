import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import HelpIcon from '@mui/icons-material/Help';


import SearchIcon from '@material-ui/icons/Search';

// import { searchCompany, getCompanyReviews } from '../../Redux/CompanyReviews/action';
import { SearchButton, useStyles } from '../reviews/companyreviewstyles';
import './salaries.css';
import SalaryBox from '../layout/SalariesBox';
import DashLoginNav from '../navbar/DashLoginNav';
import { get, post } from '../../utils/serverCall';

function Salaries() {
  console.log('Entered');
  const classes = useStyles();
  const [companies, setCompanies] = useState([]);
  const [avgsalary, setavg] = useState('');
  const history = useHistory();
  const defaultValues = {
    title: '',
    location: '',
  };
  const [details, setDetails] = useState(defaultValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      get('/jobsearch', { title: details.title, location: details.location })
      .then((res) => {
        console.log(res);
        setavg(res.averagesalary[0].avg);
        setCompanies(res.top5companies);
      });
  };

  //   const handleCompanyClick = (id) => {
  //     history.push(`/reviews?id=${id}`);
  //   };

  return (
    <div>
       <DashLoginNav/>
      <div className="head">
        <div className="picoutline">
          <img style={{height: '500px'}}
            src="https://d3hbwax96mbv6t.cloudfront.net/title-webapp/_next/static/images/salaries-8d20dc14bdeae8889387e0fb40e0d546.png"
            className="css-1yijzqt e183knr21 ls-is-cached lazyloaded"
            alt=""
          />
        </div>

        <div className="line1">
          <div className="line2">
            <div className="line3">
              <h1 className="body1">
                <span className="css9wd">Find a career you'll love</span>
              </h1>
              <span className="css-1w7">
                Explore which careers have the highest job satisfaction, best salaries, and more
              </span>
            </div>
            <div className="css-zwr" />
            <form className="css-12h" onSubmit={handleSubmit}>
              <div className="what">
                <div className="css-150">
                  <div className="what-input">
                    <span className="span-what">What</span>
                  </div>
                  <div className="css-vtz">
                    <div>
                      <span className="css-e7">
                        <input
                          id="title"
                          type="text"
                          className="title"
                          placeholder="title"
                          onChange={(e) => {
                            setDetails({ ...details, title: e.target.value });
                          }}
                        />
                        <SearchIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="what" style={{ paddingLeft: '20px' }}>
                <div className="css-150">
                  <div className="what-input">
                    <span className="span-what">Where</span>
                  </div>
                  <div className="css-vtz">
                    <div>
                      <span className="css-e7">
                        <input
                          id="title"
                          type="text"
                          className="title"
                          placeholder="location"
                          onChange={(e) => {
                            setDetails({ ...details, location: e.target.value });
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="what">
                <div className="css-150">
                  <div className="what-input">
                    <span className="span-what" />
                  </div>
                  <div className="css-vtz">
                    <div>
                      <SearchButton type="submit" variant="contained">
                        Search
                      </SearchButton>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="main">
              <div className="sal">
                <div className="content">
                  <h1 className="sal-agg">Software Engineer salary in United States</h1>
                  <h2 className="css-jmm">
                    How much does a Software Engineer make in the United States?
                  </h2>
                </div>
              </div>
              <div className="content-element">
                <div className="focus">
                  <div className="panel">
                    <div className="base">
                      <h2 className="avgbase"> Average base salary</h2>
                      <HelpIcon />
                    </div>
                    <div className="average-salary">
                      <div className="salaryvalue ">${avgsalary}</div>
                      <div className="salarytype ">per year</div>
                      <h3 className="info">
                        The average salary for a {details.title} is ${avgsalary} per year in{' '}
                        {details.location}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="toppaying" style={{height: '500px'}}>
        <div>
          <h2 className="toppaying_header">
            Top companies for Software Engineers in United States
          </h2>
        </div>
        {/* <div className="companies">
          {companies.map((item) => (
            <SalaryBox
              key={item._id}
              // logo={item.logo}
              // name={item.name}
              // description={item.description}
              // rating={item.ratings}
              id={item._id}
            />
          ))}
        </div> */}
        <div className="companies">
          {companies.map((item) => (
            <SalaryBox
              key={item.results._id}
              id={item.results._id}
              name={item.results.name}
              avg={item.results.avg}
              count={item.count}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Salaries;
