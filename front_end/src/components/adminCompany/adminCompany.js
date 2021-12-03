import React, { Component, useEffect, useState } from "react";
import { get } from "../../utils/serverCall";
import { post } from "../../utils/serverCall";
import { put } from "../../utils/serverCall";
import { Link, Redirect } from "react-router-dom";
import "./adminCompany.css";

function AdminCompany() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [enteredSearch, setEnteredSearch] = useState("");
  const [companiesDB, setCompaniesDB] = useState([]);
  const [redirectToReviews, setRedirectToReviews] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("");

  const searchCompanies = () => {
    get("/admincompanies", { search: enteredSearch })
      .then((response) => {
        console.log(response.body);
        setAllCompanies(response.body);
        setCompaniesDB(response.body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    searchCompanies();
  }, []);

  const handleSearch = () => {
    searchCompanies();
    // if (enteredSearch == "") setAllCompanies(companiesDB);
    // else {
    //   let arr = allCompanies.filter((c) => {
    //     return c.name == enteredSearch;
    //   });
    //   setAllCompanies(arr);
    // }
  };

  const renderCompanies = (
    <>
      <div className="row" style={{ marginTop: "20px" }}>
        {allCompanies.map((c) => {
          return (
            <>
              <div
                className="companybx col-md-2"
                style={{
                  padding: "10px",
                  marginLeft: "20px",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedCompany(c);
                  setRedirectToReviews(true);
                }}
              >
                <div>
                  <div style={{ display: "flex" }}>
                    <div style={{ paddingBottom: "15px", marginTop: "20px" }}>
                      <div className="col-md-4" style={{ paddingLeft: "20px" }}>
                        <img
                          src={c.companyLogo}
                          className="companyLogo"
                          alt="Company Logo"
                        />
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>{c.name}</div>
                  </div>
                </div>
                {/* <div style={{ fontWeight: "600", fontSize: "16px" }}>
                    {c.name} - {c.companyType}
                  </div> */}
                <div style={{ textAlign: "right" }}>{c.location}</div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );

  if (redirectToReviews) {
    return (
      <Redirect push
        to={{
          pathname: "/adminreviews",
          state: { id: selectedCompany },
        }}
      />
    );
  }
  return (
    <>
      <div
        className="ma"
        style={{
          padding: "20px",
          marginTop: "0px",
        }}
      >
        <div className="ma20" style={{ display: "flex", margintop: "20px" }}>
          <input
            className="adinp"
            onChange={(e) => setEnteredSearch(e.target.value)}
          ></input>
          <button className="adminSearch" onClick={handleSearch}>
            Search Company
          </button>
        </div>
        <div>
          {allCompanies.length == 0 ? (
            <div>No companies to display.</div>
          ) : (
            renderCompanies
          )}
        </div>
      </div>
    </>
  );
}

// class AdminCompany extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       allCompanies: [],
//       enteredSearch: "",
//       companiesDB: [],
//       redirectToReviews: false,
//       selectedCompany: "",
//     };
//   }

//   componentDidMount() {
//     get("/admincompanies")
//       .then((response) => {
//         console.log(response.body);
//         this.setState({
//           allCompanies: response.body,
//           companiesDB: response.body,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   renderCompanies = () => {
//     return (
//       <>
//         <div className="row" style={{ marginTop: "20px" }}>
//           {this.state.allCompanies.map((c) => {
//             return (
//               <>
//                 <div
//                   className="companybx col-md-2"
//                   style={{
//                     padding: "10px",
//                     marginLeft: "20px",
//                     marginBottom: "20px",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => {
//                     this.setState({ selectedCompany: c });
//                     this.setState({ redirectToReviews: true });
//                   }}
//                 >
//                   <div>
//                     <div style={{ display: "flex" }}>
//                       <div style={{ paddingBottom: "15px", marginTop: "20px" }}>
//                         <div
//                           className="col-md-4"
//                           style={{ paddingLeft: "20px" }}
//                         >
//                           <img
//                             src={c.companyLogo}
//                             className="companyLogo"
//                             alt="Company Logo"
//                           />
//                         </div>
//                       </div>
//                       <div style={{ textAlign: "right" }}>{c.name}</div>
//                     </div>
//                   </div>
//                   {/* <div style={{ fontWeight: "600", fontSize: "16px" }}>
//                     {c.name} - {c.companyType}
//                   </div> */}
//                   <div style={{ textAlign: "right" }}>{c.location}</div>
//                 </div>
//               </>
//             );
//           })}
//         </div>
//       </>
//     );
//   };

//   handleSearch = () => {
//     if (this.state.enteredSearch == "")
//       this.setState({ allCompanies: this.state.companiesDB });
//     else {
//       let arr = this.state.allCompanies.filter((c) => {
//         return c.name == this.state.enteredSearch;
//       });
//       this.setState({ allCompanies: arr });
//     }
//   };

//   render() {
//     let redirectToReviews = null;
//     if (this.state.redirectToReviews)
//       redirectToReviews = (
//         <Redirect
//           to={{
//             pathname: "/adminreviews",
//             state: { id: this.state.selectedCompany },
//           }}
//         />
//       );
//     return (
//       <>
//         {redirectToReviews}
//         <div
//           className="ma"
//           style={{
//             padding: "20px",
//             marginTop: "0px",
//           }}
//         >
//           <div className="ma20" style={{ display: "flex", margintop: "20px" }}>
//             <input
//               className="adinp"
//               onChange={(e) => this.setState({ enteredSearch: e.target.value })}
//             ></input>
//             <button className="adminSearch" onClick={this.handleSearch}>
//               Search Company
//             </button>
//           </div>
//           <div>
//             {this.state.allCompanies.length == 0 ? (
//               <div>No companies to display.</div>
//             ) : (
//               this.renderCompanies()
//             )}
//           </div>
//         </div>
//       </>
//     );
//   }
// }

export default AdminCompany;
