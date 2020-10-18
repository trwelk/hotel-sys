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
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import CircularProgress from '@material-ui/core/CircularProgress';

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
 
function CustomerOverview(props){
///////////----------------------------pdf generator-----------------------------------------------------------------------------
const demoFromHTML = (className,name) => {
  let input = window.document.getElementsByClassName(className)[0];
  const divHeight = input.clientHeight
  const divWidth = input.clientWidth
  const ratio = divHeight / divWidth;
  html2canvas(input)
  .then(canvas => {
    console.log(canvas);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "a0");

    const width = pdf.internal.pageSize.getWidth();
    let height = pdf.internal.pageSize.getHeight();
    height = ratio * width;
    pdf.addImage(imgData, "JPEG", 0, 0, width - 20, height + 10)
    pdf.save(name+".pdf");
  })
    .catch(err => console.log(err.message));
}
    //-------------------------------------------Theme--------------------------------------------------------------------------
 const WhiteTextTypography = withStyles({
         root: {
        color: "#00f2c3 !important"
      }
    })(Typography);
    
  
 
const customer = props.customer
const reservations = props.reservations

////////////////////////////////////////////////MONTHLY IN HOUSE GUESTS/////////////////////////////////////////////////////////
const MonthlyReservationsData = reservations ? (reservations.map(reservation => ({...reservation,month:reservation.startDay.toDate().getMonth()}))) : (null)
var monthlyData = [[],[],[],[],[],[],[],[],[],[],[],[]]
let monthlyCustomers = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (let a = 0 ; a < 12 ; a++){
        monthlyData[a] = MonthlyReservationsData ? MonthlyReservationsData.filter(reservation => reservation.month == a) : [];
        monthlyData[a].forEach((item) => {
            console.log(parseInt(monthlyData[a]))
            monthlyCustomers[a] += item.numberOfPacks ? parseInt(item.numberOfPacks) : 0
        })
    }

    const chartForRatingsOnDepartments = monthlyCustomers ? (canvas => {
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
              label: "Number of people",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#d048b6",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#d048b6",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: monthlyCustomers
            }
          ]
        };
      }) : (  <CircularProgress style={{color:"#1f8ef1",marginTop:"5px"}}/>      )
//////////////////////////////////////////////////////////////////inhouse guests this month////////////////////////////////////
const InhouseReservations = reservations ? (reservations.map(reservation => ({...reservation,month:reservation.startDay.toDate().getMonth(),day:reservation.startDay.toDate().getDate(),date:reservation.startDay.toDate().setHours(0,0,0,0)}))) : (null)
var inHouseData = [[],[],[],[],[],[],[],[],[],[],[],[]]
let days = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
let labels = []
    for (let a = 0 ; a < 31 ; a++){
        inHouseData[a] = InhouseReservations ? InhouseReservations.filter(reservation => reservation.day == a && reservation.month ==new Date().getMonth()) : [];
        inHouseData[a].forEach((item) => {
            days[a] += item.numberOfPacks ? parseInt(item.numberOfPacks) : 0
            console.log(days[a])

        })
        labels[a] = a.toString()

    }

const inhouseGuestsTodayArray = InhouseReservations ? InhouseReservations.filter(data => data.date == new Date().setHours(0,0,0,0)) : null
let inhouseGuestsToday  = 0;
if(inhouseGuestsTodayArray){
  inhouseGuestsTodayArray.forEach((data) => {
    console.log(data.numberOfPacks)
    inhouseGuestsToday += data.numberOfPacks ? parseInt(data.numberOfPacks) : 0
  });
}
console.log(inhouseGuestsToday)
const inHouseGuestsTodayUi = inhouseGuestsToday ? (
                    <WhiteTextTypography variant="h1" component="h1" gutterBottom style={{display: "flex",alignItems: "center"}}>
                        {inhouseGuestsToday}
                    </WhiteTextTypography>  
) : (
  <CircularProgress style={{color:"#00f2c3",marginTop:"5px"}}/>
)
    const chartForInhouseGuestsForMonth = 
      days ?  (canvas => {
        let ctx = canvas.getContext("2d");
    
        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    
        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
    
        return {
            labels: labels,
          datasets: [
            {
              label: "Number of people",
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
              data: days
            }
          ]
        };
      }) : (  <CircularProgress style={{color:"#1f8ef1",marginTop:"5px"}}/>      )

  /////////---------------------------------------SUBSCRIPTIONS PER YEAR----------------------------------------------------------------
  const emailSubscriptions = props.emailSubscriptions
  const MonthlyEmailSubscriptions = emailSubscriptions ? (emailSubscriptions.map(sub => ({...sub,month:sub.date.toDate().getMonth()}))) : (null)
  var monthlyData //= new Array();
  if(MonthlyEmailSubscriptions){
      for (let a = 0 ; a < 12 ; a++){
          monthlyData[a] = MonthlyEmailSubscriptions.filter(sub => sub.month == a).length;
      }
  }
  console.log("TTT")
  console.log(monthlyData)
  const subscriptionsPerMonthChart = monthlyData ? (canvas => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    
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
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#00f2c3",
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
          data: monthlyData
        }
      ]
    };
  }) : (  <CircularProgress style={{color:"#1f8ef1",marginTop:"5px"}}/>      )


    //----------------------------------------Return UI---------------------------------------------------------------------------
    const [bigChartData, setBigChartData] = useState("chart1")
    return(
        <>
        <div className="content">
      
        <Row style={{margin:"0px",marginTop:"15px"}}>
            <Col lg="3">
            <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)",height:"332px"}}>
                <CardHeader>
                  <h4 className="card-category" style={{color:"white",fontSize: "medium"}}>In House guests</h4>
                </CardHeader>
                <CardBody style={{display: "flex",justifyContent: "center",padding: "2px"}}>
                  {inHouseGuestsTodayUi}
                </CardBody>
              </Card>
            </Col>
            <Col lg="9">
            <div className="divToPDF1">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Email Subscriptions</h5>
                      <CardTitle tag="h2">Monthly Email Subscriptions</CardTitle>
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
                          onClick={() => console.log("ici") || demoFromHTML("divToPDF1","Email_Subs")}
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
                      data={subscriptionsPerMonthChart}
                      options={chartOptions2}
                    />
                  </div>
                </CardBody>
              </Card>
              </div>
            </Col>
          </Row>
          <Row style={{margin:"0px",marginTop:"20px"}}>
            <Col xs="12">
            <div className="divToPDF2">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Guests</h5>
                      <CardTitle tag="h2">In house guests this month</CardTitle>
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
                          onClick={() => console.log("ici") || demoFromHTML("divToPDF2","Month_Inhouse")}
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
                     data={chartForInhouseGuestsForMonth}
                     options={chartOptions1}
                 />
                  </div>
                </CardBody>
              </Card>
              </div>
            </Col>
            <Col xs="12">
            <div className="divToPDF3">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Guests</h5>
                      <CardTitle tag="h2">Yearly in house guests</CardTitle>
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
                          onClick={() => console.log("ici") || demoFromHTML("divToPDF3","Year_Inhouse")}
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
        customer:state.firestore.ordered.customer,
        reservations:state.firestore.ordered.reservation,
        emailSubscriptions:state.firestore.ordered.emailSubscriptions

    }
}

export default compose(connect(mapStateToProps,null),firestoreConnect([
    {collection: 'customer'},
    {collection: 'reservation'},
    {collection: 'emailSubscriptions'}

  ]))(CustomerOverview)
