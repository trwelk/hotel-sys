import React,{useState,useEffect} from 'react'
import classNames from "classnames";
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography';
// react plugin used to create charts
import { Line, Bar ,Pie } from "react-chartjs-2";
import { withStyles } from "@material-ui/core/styles";
import html2canvas from "html2canvas";
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

  const div2PDF = e => {

    const but = e.target;
    but.style.display = "none";
    let input = window.document.getElementsByClassName("div2PDF")[0];

    html2canvas(input).then(canvas => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "px");
      pdf.addImage(
        img,
        "png",
        input.offsetLeft,
        input.offsetTop,
        input.clientWidth,
        input.clientHeight
      );
      pdf.save("chart.pdf");
      but.style.display = "block";
    });
  };
function CustomerOverview(props){

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
            <Col lg="3">
              <Card className="card-chart" style={{height: "165px",border: "#1d8cf8 solid"}}>
                <CardHeader>
                  <h4 className="card-category" style={{color:"white",fontSize: "medium"}}>Total Shipments</h4>
                </CardHeader>
                <CardBody style={{display: "flex",justifyContent: "center",padding: "2px"}}>
                  <div style={{width: "150px",height: "93px",}}>
                    <WhiteTextTypography variant="h1" component="h2" gutterBottom>
        76
                    </WhiteTextTypography>             
                 </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <h5 className="card-category">Overall</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                     Monthly Email Subscriptions
                  </CardTitle>
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
            </Col>
          </Row>
          <Row style={{margin:"0px",marginTop:"20px"}}>
            <Col xs="12">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Complaints</h5>
                      <CardTitle tag="h2">In house guests this month</CardTitle>
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
            </Col>
            <Col xs="12">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Complaints</h5>
                      <CardTitle tag="h2">Yearly in house guests</CardTitle>
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
