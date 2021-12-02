import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';

import RoomIcon from '@mui/icons-material/Room';
import { Container, FormHelperText, Grid, InputAdornment, Typography } from '@material-ui/core';
import { TextField } from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import CompanyBox from '../layout/CompanyBox';
// import { searchCompany, getCompanyReviews } from '../../Redux/CompanyReviews/action';
import { SearchButton, useStyles } from './companyreviewstyles';
import ReviewBox from '../layout/reviewsBox';

function CompanyReviews() {
  const classes = useStyles();
  const [companies, setCompanies] = useState([]);
  const history = useHistory();
  const defaultValues = {
    name: '',
    location: '',
  };
  const [details, setDetails] = useState(defaultValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get('/companySearch', { params: { name: details.name, location: details.location } })
      .then((res) => {
        console.log(res);
        setCompanies(res.data);
      });
  };

  const handleCompanyClick = (id) => {
    history.push(`/reviews?id=${id}`);
  };

  return (
    <Container className={classes.container} maxWidth="xl">
      <Grid container className={classes.boxSearch}>
        <Grid
          item
          container
          className={classes.outerSearchGrid}
          xs={12}
          sm={12}
          md={9}
          lg={8}
          xl={8}
        >
          <Grid item>
            <Typography className={classes.h3} variant="h3">
              Find great places to work
            </Typography>
            <Typography className={classes.h5} variant="h5">
              Discover millions of company reviews
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
            <Grid item direction="column">
              <TextField
                className={classes.outlinedInput}
                type="text"
                variant="outlined"
                placeholder="Company name"
                onChange={(e) => {
                  setDetails({ ...details, name: e.target.value });
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.outlinedInput}
                type="text"
                variant="outlined"
                placeholder="location"
                onChange={(e) => {
                  setDetails({ ...details, location: e.target.value });
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <RoomIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText className={classes.formhelperText}>
                Do you want to search for salaries?
              </FormHelperText>
            </Grid>
            <Grid item>
              <SearchButton type="submit" variant="contained">
                Find Companies
              </SearchButton>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Grid className={classes.companiesHiring} item container xl={9} lg={9} md={9} sm={11} xs={12}>
        <Grid item container>
          <Grid item>
            <Typography style={{ paddingTop: '15px' }} variant="h4">
              Popular Companies
            </Typography>
            <div>Based on reviews and recent job openings on Indeed</div>
          </Grid>
        </Grid>
        <Grid container style={{ maxWidth: '1000px' }}>
          <div>
            {companies.map((item) => (
              <ReviewBox
                key={item._id}
                // logo={item.logo}
                name={item.name}
                description={item.description}
                // rating={item.ratings}
                id={item._id}
                // handleClick={handleCompanyClick}
              />
            ))}
          </div>
        </Grid>
      </Grid>
      <Grid
        className={classes.companiesHiring}
        style={{
          borderTop: '10px solid #ff5a1f',
          padding: '25px',
          justifyContent: 'space-between',
        }}
        container
        item
        xl={9}
        lg={9}
        md={9}
        sm={11}
        xs={12}
      >
        <Grid item>
          <Typography variant="h5">Rate your recent company:</Typography>
        </Grid>
        <Grid item style={{ backgroundColor: '#f2f2f2', padding: '0 5px', borderRadius: '50px' }}>
          <Rating name="pristine" size="large" style={{ color: 'blue' }} />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        style={{
          fontSize: '14px',
          backgroundColor: 'white',
          padding: '15px 10px',
          margin: '0 -20px ',
        }}
      >
        <Grid item style={{ cursor: 'pointer' }}>
          © 2021 Indeed
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: 'pointer' }}>
          Accessibility at Indeed
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: 'pointer' }}>
          Privacy Center
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: 'pointer' }}>
          Cookies
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: 'pointer' }}>
          Privacy
        </Grid>
        <Grid item>-</Grid>
        <Grid item style={{ cursor: 'pointer' }}>
          Terms
        </Grid>
      </Grid>
    </Container>
  );
}

export default CompanyReviews;
