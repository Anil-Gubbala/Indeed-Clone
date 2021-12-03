import React, { Children, Component, useEffect, useState } from "react";
import { get } from "../../utils/serverCall";
import { post } from "../../utils/serverCall";
import { put } from "../../utils/serverCall";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Tabs } from "antd";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminNavbar from "../admin/AdminNavbar";
import { isAdmin, isSignedIn } from "../../utils/checkLogin";
import { Redirect } from "react-router-dom";
import { Pagination, Stack, TablePagination } from "@mui/material";

const { TabPane } = Tabs;

function AdminReviews(props) {
  const [allReviews, setAllReviews] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({});
  const [stats, setStats] = useState({});

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(-1);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  console.log(props);

  useEffect(() => {
    console.log(props.location.state.id);
    setCompanyDetails(props.location.state.id);
    get("/admincompanyreviews", { id: props.location.state.id._id, page })
      .then((response) => {
        console.log(response);
        setAllReviews(response);
      })
      .catch((err) => {
        console.log(err);
      });

    get("/admincompanyreviewsCount", { id: props.location.state.id._id })
      .then((response) => {
        console.log(response);
        setTotalPages(response[0].total);
      })
      .catch((err) => {
        console.log(err);
      });

    get("/getCompanyStatistics", { id: props.location.state.id._id })
      .then((response) => {
        console.log(response);
        let data = [];
        response.forEach((each) => {
          console.log(each);
          if (each._id !== "Saved") {
            data.push(each);
          }
        });
        console.log(data);
        setStats(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const statistics = (
    <BarChart
      width={500}
      height={300}
      data={stats}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 30,
      }}
    >
      <CartesianGrid vertical />
      <XAxis
        dataKey="_id"
        textAnchor="end"
        sclaeToFit="true"
        verticalAnchor="start"
        interval={0}
        angle="-30"
        // label={{ value: 'random text', position: 'bottom', offset: 15 }}
      />
      <YAxis
        label={{
          value: "Count",
          angle: -90,
          position: "insideBottomLeft",
          textAnchor: "middle",
        }}
      />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#82ca9d" />
    </BarChart>
  );

  const renderReviews = (
    <>
      <div style={{ margintop: "20px", padding: "25px" }}>
        <div>
          {allReviews == [] ? (
            "No Reviews to Display"
          ) : (
            <>
              {allReviews.map((review) => {
                return (
                  <>
                    <div>
                      <div style={{ display: "flex", marginBottom: "25px" }}>
                        <div className="col-md-2">
                          <div
                            style={{
                              fontSize: "24px",
                              fontWeight: "bold",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              {review.rating}.0
                            </div>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <Rating
                              name="read-only"
                              value={review.rating}
                              readOnly
                              size="small"
                            />
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div
                            style={{
                              fontSize: "24px",
                              fontWeight: "bold",
                              marginBottom: "0px",
                              paddingBottom: "0px",
                            }}
                          >
                            {review.summary}
                          </div>
                          <label style={{ color: "#767676" }}>
                            {review.date}
                          </label>
                          <div style={{ marginTop: "10px" }}>
                            {review.review}
                          </div>
                          <div
                            style={{
                              marginTop: "10px",
                              display: "flex",
                              fontSize: "14px",
                              marginTop: "15px",
                            }}
                          >
                            <div>
                              {" "}
                              <svg
                                focusable="false"
                                role="img"
                                fill="currentColor"
                                viewBox="0 0 18 18"
                                aria-hidden="true"
                                class="iconyes"
                              >
                                <path d="M15.012 5.82a.5.5 0 000-.708L14.8 4.9a.5.5 0 00-.707 0l-7.069 7.07-2.971-2.973a.5.5 0 00-.707 0l-.212.212a.5.5 0 000 .707l3.538 3.538a.5.5 0 00.707 0l.566-.565-.001-.001 7.068-7.069z"></path>
                              </svg>
                            </div>
                            <div
                              className="prostxt"
                              style={{ fontweight: "600 !important" }}
                            >
                              Pros
                            </div>
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            {review.pros}
                          </div>
                          <div
                            style={{
                              marginTop: "10px",
                              display: "flex",
                              fontSize: "14px",
                              marginTop: "15px",
                            }}
                          >
                            <div>
                              <svg
                                focusable="false"
                                role="img"
                                fill="currentColor"
                                viewBox="0 0 18 18"
                                aria-hidden="true"
                                class="iconno"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16 8.948a7 7 0 11-14 0 7 7 0 0114 0zm-1.3 0a5.7 5.7 0 01-9.245 4.464l8.01-8.01A5.676 5.676 0 0114.7 8.949zM4.536 12.492l8.009-8.008a5.7 5.7 0 00-8.009 8.009z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </div>
                            <div className="prostxt">Cons</div>
                          </div>
                          <div style={{ marginLeft: "20px" }}>
                            {review.cons}
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
      <TablePagination
        component="div"
        count={totalPages}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]}
        rowsPerPage={10}
      />
      {/* <Stack spacing={2}>
        <Pagination count={totalPages/10} />
      </Stack> */}
    </>
  );
  if (!isSignedIn()) {
    return <Redirect push to="/login" />;
  }
  if (!isAdmin()) {
    return <Redirect push to="/invalid" />;
  }
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <div style={{ marginLeft: "20%", marginRight: "20%" }}>
        <div>
          <img
            src={companyDetails.companyPicture}
            alt="company Image"
            style={{ width: "1000px", height: "200px" }}
          ></img>
        </div>

        <div
          className="row"
          style={{ paddingBottom: "15px", marginTop: "20px" }}
        >
          {/* <div className="col-md-1" style={{ paddingLeft: "20px" }}>
                  <img
                    src={this.state.companyDetails.companyLogo}
                    className="companyLogo"
                    alt="Company Logo"
                  />
                </div> */}
          <Tabs
            defaultActiveKey="1"
            // indicatorColor="secondary"
            style={{ width: "100%" }}
          >
            <TabPane tab="Reviews" key="1">
              <div>{renderReviews}</div>
            </TabPane>
            <TabPane tab="Statistics" key="2">
              <div>{statistics}</div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}

// class AdminReviews extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { allReviews: [], companyDetails: {}, stats: {} };
//   }
//   // this.props.location.state.c.id)

//   componentDidMount() {
//     console.log(this.props.location.state.id);
//     this.setState({ companyDetails: this.props.location.state.id });
//     // this.props.location.state.id._id)
//     get("/admincompanyreviews?id=" + this.props.location.state.id._id)
//       .then((response) => {
//         console.log(response);
//         this.setState({
//           allReviews: response,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     get("/getCompanyStatistics", { id: this.props.location.state.id._id })
//       .then((response) => {
//         console.log(response);
//         let data = [];
//         response.forEach((each)=>{
//           console.log(each);
//           if(each._id !== "Saved"){
//             data.push(each);
//           }
//         });
//         // const data = response.filter((each)=>{
//         //   if(each._id !== "Saved"){
//         //     return each;
//         //   }
//         // })
//         console.log(data)
//         this.setState({
//           stats: data,
//         });
//         // this.setState({
//         //   allReviews: response,
//         // });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

// renderReviews = () => {
//   return (
//     <>

//       <div style={{ margintop: "20px", padding: "25px" }}>
//         <div>
//           {this.state.allReviews == [] ? (
//             "No Reviews to Display"
//           ) : (
//             <>
//               {this.state.allReviews.map((review) => {
//                 return (
//                   <>
//                     <div>
//                       <div style={{ display: "flex", marginBottom: "25px" }}>
//                         <div className="col-md-2">
//                           <div
//                             style={{
//                               fontSize: "24px",
//                               fontWeight: "bold",
//                             }}
//                           >
//                             <div style={{ textAlign: "center" }}>
//                               {review.rating}.0
//                             </div>
//                           </div>
//                           <div style={{ textAlign: "center" }}>
//                             <Rating
//                               name="read-only"
//                               value={review.rating}
//                               readOnly
//                               size="small"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-md-9">
//                           <div
//                             style={{
//                               fontSize: "24px",
//                               fontWeight: "bold",
//                               marginBottom: "0px",
//                               paddingBottom: "0px",
//                             }}
//                           >
//                             {review.summary}
//                           </div>
//                           <label style={{ color: "#767676" }}>
//                             {review.date}
//                           </label>
//                           <div style={{ marginTop: "10px" }}>
//                             {review.review}
//                           </div>
//                           <div
//                             style={{
//                               marginTop: "10px",
//                               display: "flex",
//                               fontSize: "14px",
//                               marginTop: "15px",
//                             }}
//                           >
//                             <div>
//                               {" "}
//                               <svg
//                                 focusable="false"
//                                 role="img"
//                                 fill="currentColor"
//                                 viewBox="0 0 18 18"
//                                 aria-hidden="true"
//                                 class="iconyes"
//                               >
//                                 <path d="M15.012 5.82a.5.5 0 000-.708L14.8 4.9a.5.5 0 00-.707 0l-7.069 7.07-2.971-2.973a.5.5 0 00-.707 0l-.212.212a.5.5 0 000 .707l3.538 3.538a.5.5 0 00.707 0l.566-.565-.001-.001 7.068-7.069z"></path>
//                               </svg>
//                             </div>
//                             <div
//                               className="prostxt"
//                               style={{ fontweight: "600 !important" }}
//                             >
//                               Pros
//                             </div>
//                           </div>
//                           <div style={{ marginLeft: "20px" }}>
//                             {review.pros}
//                           </div>
//                           <div
//                             style={{
//                               marginTop: "10px",
//                               display: "flex",
//                               fontSize: "14px",
//                               marginTop: "15px",
//                             }}
//                           >
//                             <div>
//                               <svg
//                                 focusable="false"
//                                 role="img"
//                                 fill="currentColor"
//                                 viewBox="0 0 18 18"
//                                 aria-hidden="true"
//                                 class="iconno"
//                               >
//                                 <path
//                                   fill-rule="evenodd"
//                                   d="M16 8.948a7 7 0 11-14 0 7 7 0 0114 0zm-1.3 0a5.7 5.7 0 01-9.245 4.464l8.01-8.01A5.676 5.676 0 0114.7 8.949zM4.536 12.492l8.009-8.008a5.7 5.7 0 00-8.009 8.009z"
//                                   clip-rule="evenodd"
//                                 ></path>
//                               </svg>
//                             </div>
//                             <div className="prostxt">Cons</div>
//                           </div>
//                           <div style={{ marginLeft: "20px" }}>
//                             {review.cons}
//                           </div>
//                         </div>
//                       </div>
//                       <hr></hr>
//                     </div>
//                   </>
//                 );
//               })}
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

//   tabChange = () => {};

//   statistics = () => {
//    return <BarChart
//       width={500}
//       height={300}
//       data={this.state.stats}
//       margin={{
//         top: 5,
//         right: 30,
//         left: 20,
//         bottom: 30,
//       }}
//     >
//       <CartesianGrid vertical />
//       <XAxis
//         dataKey="_id"
//         textAnchor="end"
//         sclaeToFit="true"
//         verticalAnchor="start"
//         interval={0}
//         angle="-30"
//         // label={{ value: 'random text', position: 'bottom', offset: 15 }}
//       />
//       <YAxis
//         label={{
//           value: "Count",
//           angle: -90,
//           position: "insideBottomLeft",
//           textAnchor: "middle",
//         }}
//       />
//       <Tooltip />
//       <Legend />
//       <Bar dataKey="count" fill="#82ca9d" />
//     </BarChart>;
//   };

//   render() {
//     if(! isSignedIn()){
//       return <Redirect push to="/login" />;
//     }
//     if(! isAdmin()){
//       return <Redirect push to="/invalid" />;
//     }
//     return (
//       <>
//       <AdminNavbar></AdminNavbar>
//         <div style={{ marginLeft: "20%", marginRight: "20%" }}>
//           <div>
//             <img
//               src={this.state.companyDetails.companyPicture}
//               alt="company Image"
//               style={{ width: "1000px", height: "200px" }}
//             ></img>
//           </div>

//           <div
//             className="row"
//             style={{ paddingBottom: "15px", marginTop: "20px" }}
//           >
//             {/* <div className="col-md-1" style={{ paddingLeft: "20px" }}>
//               <img
//                 src={this.state.companyDetails.companyLogo}
//                 className="companyLogo"
//                 alt="Company Logo"
//               />
//             </div> */}
//             <Tabs
//               defaultActiveKey="1"
//               onChange={this.tabChange}
//               // indicatorColor="secondary"
//               style={{ width: "100%" }}
//             >
//               <TabPane tab="Reviews" key="1">
//                 <div>{this.renderReviews()}</div>
//               </TabPane>
//               <TabPane tab="Statistics" key="2">
//                 <div>{this.statistics()}</div>
//               </TabPane>
//             </Tabs>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

export default AdminReviews;
