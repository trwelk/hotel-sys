import React,{useState,useEffect} from 'react'
import classNames from "classnames";
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';
// react plugin used to create charts
import { Line, Bar ,Pie } from "react-chartjs-2";
import { withStyles } from "@material-ui/core/styles";
import ReactDOM from "react-dom";
import styles from './style.css'


// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import {
    chartOptions1,
    chartOptions2
  } from './ChartOptions';

  import jsPDF from 'jspdf';
  import html2canvas from "html2canvas";
  
function FeedbackOverview(props){
//////////////--------------------------------------pdf-generator------------------------------------------------
const demoFromHTML = (className) => {
  let input = window.document.getElementsByClassName(className)[0];
  html2canvas(input)
    .then(canvas => {
      console.log(canvas);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "pt");
      pdf.addImage(imgData, "JPEG", 15, 110, 800, 250);
      pdf.save("test.pdf");
    })
    .catch(err => console.log(err.message));
}

    
  
 
const feedback = props.feedback
const complaint = props.complaint
const compliment = props.compliment
//------------------------------------Complaints DepartmentWise-------------------------------------------------------------------------
const dataForComplaintOnDepartments = complaint ? (complaint.map(data => ({...data}))) : (null)
const hrComplaint= dataForComplaintOnDepartments ? dataForComplaintOnDepartments.filter(data => data.department == "HR").length : 0
const fbComplaint= dataForComplaintOnDepartments ? dataForComplaintOnDepartments.filter(data => data.department == "F&B").length : 0
const maintenanceComplaint= dataForComplaintOnDepartments ? dataForComplaintOnDepartments.filter(data => data.department == "MAINTENANCE").length : 0
const frontOfficeComplaint= dataForComplaintOnDepartments ? dataForComplaintOnDepartments.filter(data => data.department == "FRONTOFFICE").length : 0

const chartForComplaintOnDepartments = {
    data: canvas => {
      let ctx = canvas.getContext("2d");
  
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
      gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
  
      return {
        labels: [
            'HR',
            'F&B',
            'MAINTENANCE',
            'FRONTOFFICE',
                ],
        datasets: [
          {
            label: "Platforms",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#d048b6",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [hrComplaint,fbComplaint,maintenanceComplaint,frontOfficeComplaint],
        }
        ]
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 5,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    }
  };



//--------------------------------------------------Compliments on departments-----------------------------------------------
//------------------------------------Complaints DepartmentWise-------------------------------------------------------------------------
const dataForComplimentOnDepartments = compliment ? (compliment.map(data => ({...data}))) : (null)
const hrCompliment= dataForComplimentOnDepartments ? dataForComplimentOnDepartments.filter(data => data.department == "HR").length : 0
const fbCompliment= dataForComplimentOnDepartments ? dataForComplimentOnDepartments.filter(data => data.department == "F&B").length : 0
const maintenanceCompliment= dataForComplimentOnDepartments ? dataForComplimentOnDepartments.filter(data => data.department == "MAINTENANCE").length : 0
const frontOfficeCompliment= dataForComplimentOnDepartments ? dataForComplimentOnDepartments.filter(data => data.department == "FRONTOFFICE").length : 0

const chartForComplimentOnDepartments = {
    data: canvas => {
      let ctx = canvas.getContext("2d");
  
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
  
      return {
        labels: [
            'HR',
            'F&B',
            'MAINTENANCE',
            'FRONTOFFICE',
                ],
        datasets: [
          {
            label: "Platforms",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: "#00f2c3",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [hrCompliment,fbCompliment,maintenanceCompliment,frontOfficeCompliment],
        }
        ]
      };
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 5,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }
        ]
      }
    }
  };

  //-----------------------------------------------Ratings of Departments------------------------------------------------------
const dataForRatingsOnDepartments = feedback ? (feedback.map(data => ({...data}))) : (null)
const hr= dataForRatingsOnDepartments ? dataForRatingsOnDepartments.filter(data => data.department == "HR") : []
const fb= dataForRatingsOnDepartments ? dataForRatingsOnDepartments.filter(data => data.department == "F&B") : []
const maintenance= dataForRatingsOnDepartments ? dataForRatingsOnDepartments.filter(data => data.department == "MAINTENANCE") : []
const frontOffice= dataForRatingsOnDepartments ? dataForRatingsOnDepartments.filter(data => data.department == "FRONTOFFICE") : []
let hrRating = 0
let fbRating = 0
let maintenanceRating = 0
let frontOfficeRating = 0
hr.forEach((item) => {
    hrRating += parseInt(item.rating)

})
fb.forEach((item) => {

    fbRating += parseInt(item.rating)
})
maintenance.forEach((item) => {
    maintenanceRating += parseInt(item.rating)
})
frontOffice.forEach((item) => {
    frontOfficeRating += parseInt(item.rating)
})
  
  const chartForRatingsOnDepartments = canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: ['HR',
      'F&B',
      'MAINTENANCE',
      'FRONTOFFICE'
    ],
      datasets: [
        {
          label: "Reservations",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: [hrRating/(hr.length) == 0 ? 1 : hrRating/(hr.length),
                fbRating/(fb.length) == 0 ? 1 : fbRating/(fb.length),
                maintenanceRating/(maintenance.length) == 0 ? 1 : maintenanceRating/(maintenance.length),
                frontOfficeRating/(frontOffice.length) == 0 ? 1 : frontOfficeRating/(frontOffice.length)]
        }
      ]
    };
  }

//--------------------------------monthly complaints ----------------------------------------------------------------------

  const dataForMonthlyComplaints = complaint ? (complaint.map(data => ({...data,month:data.date.toDate().getMonth()}))) : (null)
  let monthlyComplaints = [0,0,0,0,0,0,0,0,0,0,0,0]
  console.log(monthlyComplaints)
  for(let a = 0 ; a < 12 ; a++){
    monthlyComplaints[a] = dataForMonthlyComplaints ? dataForMonthlyComplaints.filter(data => data.month == a).length : 0
  }
  console.log(monthlyComplaints)

    
    const chartForMonthlyComplaints = canvas => {
      let ctx = canvas.getContext("2d");
  
      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
      gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
      gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
  
      return {
        labels: [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
          ],
        datasets: [
          {
            label: "Reservations",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "#00f2c3 ",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#00f2c3",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#00f2c3",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: monthlyComplaints
          }
        ]
      };
    }

//--------------------------------monthly compliments ----------------------------------------------------------------------

const dataForMonthlyCompliments = compliment ? (compliment.map(data => ({...data,month:data.date.toDate().getMonth()}))) : (null)
let monthlyCompliments = [0,0,0,0,0,0,0,0,0,0,0,0]
console.log(monthlyComplaints)
for(let a = 0 ; a < 12 ; a++){
    monthlyCompliments[a] = dataForMonthlyCompliments ? dataForMonthlyCompliments.filter(data => data.month == a).length : 0
}

  
  const chartForMonthlyCompliments = canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC"
        ],
      datasets: [
        {
          label: "Reservations",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: monthlyCompliments
        }
      ]
    };
  }
    //----------------------------------------Return UI---------------------------------------------------------------------------
    const [bigChartData, setBigChartData] = useState("chart1")
    return(
        <>
        <div className="content">
            <Row style={{margin:"0px",marginTop:"20px"}}>
            <Col lg="4">
            <div className="divToPDF1">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Feedbacks</h5>
                      <CardTitle tag="h2">Department Compliments</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => console.log("ici") || demoFromHTML("divToPDF1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Download Pdf
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                <div className="chart-area">
                <Bar
                    data={chartForComplimentOnDepartments.data}
                    options={chartForComplimentOnDepartments.options}
                    />
                  </div>
                </CardBody>
              </Card>
              </div>
            </Col>
            <Col lg="4">
            <div className="divToPDF2">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Feedbacks</h5>
                      <CardTitle tag="h2">Complaints On Departments</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => console.log("ici") || demoFromHTML("divToPDF2")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Download Pdf
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                <div className="chart-area">
                <Bar
                      data={chartForComplaintOnDepartments.data}
                      options={chartForComplaintOnDepartments.options}
                  />
                  </div>
                </CardBody>
              </Card>
              </div>
            </Col>
            <Col lg="4">
            <div className="divToPDF3">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Feedbacks</h5>
                      <CardTitle tag="h2">Department Ratings</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => console.log("ici") || demoFromHTML("divToPDF3")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Download Pdf
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                <div className="chart-area">
                <Line 
                        data={chartForRatingsOnDepartments}
                        options={chartOptions2}
                    />
                  </div>
                </CardBody>
              </Card>
              </div>
            </Col>
          </Row>
          <Row style={{margin:"0px"}}>
            <Col xs="6">
            <div className="divToPDF4">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Feedbacks</h5>
                      <CardTitle tag="h2">Monthly Complaints</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => console.log("ici") || demoFromHTML("divToPDF4")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Download Pdf
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                <div className="chart-area">
                <Line 
                        data={chartForMonthlyComplaints}
                        options={chartOptions1}
                    />
                  </div>
                </CardBody>
              </Card>
              </div>
            </Col>
            <Col xs="6">
            <div className="divToPDF5">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Feedbacks</h5>
                      <CardTitle tag="h2">Monthly Compliments</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => console.log("ici") || demoFromHTML("divToPDF5")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Download Pdf
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                <div className="chart-area">
                <Line 
                        data={chartForMonthlyCompliments}
                        options={chartOptions1}
                    />
                  </div>
                </CardBody>
              </Card>
              </div>
            </Col>
          </Row>
        </div>
      </>
    )
}

const mapStateToProps = (state) => {
    return{
        feedback:state.firestore.ordered.feedback,
        compliment:state.firestore.ordered.compliment,
        complaint:state.firestore.ordered.complaint

    }
}

export default compose(connect(mapStateToProps,null),firestoreConnect([
    {collection: 'feedback',
    where: [['type', '==', 'COMPLAINT']],
    storeAs: 'complaint'},
    {collection: 'feedback',
    where: [['type', '==', 'COMPLIMENT']],
    storeAs: 'compliment'},
    {collection: 'feedback',
    storeAs: 'feedback'},
  ]))(FeedbackOverview)
