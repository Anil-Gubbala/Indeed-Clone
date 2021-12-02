import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'
import { register } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import { isJobSeeker } from '../../utils/checkLogin';

export const Register = ({register,  isAuthenticated}) => {
    const [formData, setFormData] = useState({
        emailId: '',
        password: '',
        accountType: ''
    })
    const { emailId, password, accountType } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log(emailId+" "+password+" "+accountType);
        //register(formData);
        register({ emailId, password, accountType });
        //await axios.post('/user',formData);
    }

    if (isAuthenticated) {
        if(localStorage.getItem("role")==="employer"){
            return <Redirect to="/landing" />;
            }
            else{
                return <Redirect to="/company" />;
            }
      }

    return (
         
        <body>
            
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto mainbox">
                        <div class="card border-0 shadow rounded-3 my-5 cardbox">
                            <div class="card-body p-4 p-sm-5">
                                <h5 class="card-title text-left mb-5 fs-5 signincss"><b>Create an Account (it's free)</b></h5>
                                <p class="consent">By signing in to your account, you agree to Indeed's Terms of Service and consent to our Cookie Policy and Privacy Policy.</p>
                                <form className="signup-form" onSubmit={e => onSubmit(e)}>
                                    <div class="form-floating mb-3">
                                    <div className="form-group">
                                        <label htmlFor="emailId"><b>Email</b></label>
                                        <input className='form-control' 
                                            type="text" 
                                            placeholder="Enter Email"
                                            name='emailId'
                                            value={emailId}
                                            onChange={e => onChange(e)}
                                            required
                                        />   
                                    </div>
                                    </div>
                                    <div class="form-floating mb-3">
                                    <div className="form-group">
                                        <label htmlFor="password"><b>Password</b></label>
                                        <input className='form-control' 
                                            type="password" 
                                            placeholder="Enter Password"
                                            name='password'
                                            value={password}
                                            onChange={e => onChange(e)}
                                            required
                                        />   
                                    </div>
                                    </div>
                                    <div class="form-floating mb-3">
                                    <div className="form-group" value={accountType} onChange={e => onChange(e)}>
                                        <label htmlFor="accountType"><b>Account Type</b></label>
                                        <div className="form-control typeform">
                                        <input 
                                            type="radio"
                                            name='accountType'
                                            value='employer'
                                        />  Employer
                                        </div>
                                        <div className="form-control">
                                        <input
                                            type="radio"
                                            name='accountType'
                                            value='jobseeker'
                                        /> Job Seeker
                                        </div>
                                    </div>
                                    </div>
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                                        <label class="form-check-label" for="rememberPasswordCheck">
                                            Remember password
                                        </label>
                                    </div>
                                    <div class="d-grid">
                                        <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                            in</button>
                                    </div>
                                    <hr class="my-4" />
                                    <div class="d-grid ">
                                        <button class="btn btngoogle " type="button">
                                            Sign in with Google
                                        </button>
                                    </div>
                                    <div class="d-grid ">
                                        <button class="btn btngoogle " type="button">
                                             Sign in with Apple
                                        </button>
                                    </div>
                                    <div class="d-grid">
                                        <button class="btn btngoogle " type="button">
                                             Sign in with Facebook
                                        </button>
                                    </div>
                                </form>
                                <Link to='/login'>Have an account? Sign in</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                
            </div>
        </body>

    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(mapStateToProps,{register})(Register);
