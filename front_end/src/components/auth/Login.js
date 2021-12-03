import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { isAdmin, isEmployer, isJobSeeker } from "../../utils/checkLogin";

export const Login = ({ login, isAuthenticated, details, state }) => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
  const { emailId, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ emailId, password });
  };
  if (isAuthenticated) {
    console.log(details.accountType);
    if (isJobSeeker()) {
      return <Redirect to="/landing" />;
    } else if(isEmployer()){
      if (localStorage.getItem("companyId") === undefined) {
        return <Redirect to="/addcompany" />;
      } else {
        return <Redirect to="/EmployerLanding" />;
      }
    }else if(isAdmin()){
      return <Redirect to="/adminHome"></Redirect>
    }
  }
  return (
    <body>
      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto mainbox">
            <div class="card border-0 shadow rounded-3 my-5 cardbox">
              <div class="card-body p-4 p-sm-5">
                <h5 class="card-title text-left mb-5 fs-5 signincss">
                  <b>Sign In</b>
                </h5>
                <p class="consent">
                  By signing in to your account, you agree to Indeed's Terms of
                  Service and consent to our Cookie Policy and Privacy Policy.
                </p>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div class="form-floating mb-3">
                    <div className="form-group">
                      <label htmlFor="emailId">
                        <b>emailId</b>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter emailId"
                        name="emailId"
                        value={emailId}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div class="form-floating mb-3">
                    <div className="form-group">
                      <label htmlFor="password">
                        <b>Password</b>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div class="form-check mb-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberPasswordCheck"
                    />
                    <label class="form-check-label" for="rememberPasswordCheck">
                      Remember password
                    </label>
                  </div>
                  <Link to="/register">Register Here</Link>
                  <div class="d-grid">
                    <button
                      class="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                  <hr class="my-4" />
                  <div class="d-grid ">
                    <button class="btn btnlogin " type="button">
                      Sign in with Google
                    </button>
                  </div>
                  <div class="d-grid ">
                    <button class="btn btnlogin" type="button">
                      Sign in with Apple
                    </button>
                  </div>
                  <div class="d-grid">
                    <button class="btn btnlogin" type="button">
                      Sign in with Facebook
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  details: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
