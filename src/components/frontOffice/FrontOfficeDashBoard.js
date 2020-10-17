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
  } from './overview/ChartOptions';
  import jsPDF from 'jspdf';
  import html2canvas from "html2canvas";

function FrontOfficeDashboard(props){
///////////////////////////////////////////////////////////////
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

//------------------------------------CHART 1 Details-------------------------------------------------------------------------
const reservations = props.reservation
const MonthlyReservationsData = reservations ? (reservations.map(reservation => ({...reservation,month:reservation.startDay.toDate().getMonth()}))) : (null)
var monthlyData = new Array();
if(MonthlyReservationsData){
    for (let a = 0 ; a < 12 ; a++){
        monthlyData[a] = MonthlyReservationsData.filter(reservation => reservation.month == a).length;
    }
}
console.log(monthlyData)

  const chart1 = canvas => {
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
              data: monthlyData
            }
          ]
        };
      }

    //--------------------------------------overall Reservations of Reservation Type chart-----------------------------------------

   
    const overallReservationsOfRoomTypeData = reservations ? (reservations.map(reservation => ({...reservation}))) : (null)
    var room = [0,1,2,3,4,5]
    room[0] = overallReservationsOfRoomTypeData ? overallReservationsOfRoomTypeData.filter(res => res.roomType == 'EXKINGSUITE').length : null
    room[1] = overallReservationsOfRoomTypeData ? overallReservationsOfRoomTypeData.filter(res => res.roomType == 'FAMSTUDIO').length : null
    room[2] = overallReservationsOfRoomTypeData ? overallReservationsOfRoomTypeData.filter(res => res.roomType == 'PRESSUITE').length : null
    room[3] = overallReservationsOfRoomTypeData ? overallReservationsOfRoomTypeData.filter(res => res.roomType == 'SEAKING').length : null
    room[4] = overallReservationsOfRoomTypeData ? overallReservationsOfRoomTypeData.filter(res => res.roomType == 'CMASTER').length : null
    room[5] = overallReservationsOfRoomTypeData ? overallReservationsOfRoomTypeData.filter(res => res.roomType == 'SEASINGLE').length : null

    const chartReservationsOfRoomType = canvas => {
          let ctx = canvas.getContext("2d");
      
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      
          gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
          gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
          gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
      
          return {
            labels: ["EXKINGSUITE", "FAMSTUDIO", "PRESSUITE", "SEAKING", "CMASTER", "SEASINGLE"],
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
                data: [room[0],room[1],room[2],room[3],room[4],room[5]]
              }
            ]
          };
        }

    ///----------------------------------------reservationPlatform-------------------------------------------------------

    const reservationPlatformData = reservations ? (reservations.map(reservation => ({...reservation,month:reservation.startDay.toDate().getMonth()}))) : (null)
    const BOOKINGCOM = reservationPlatformData ?  reservationPlatformData.filter(res => res.reservationType == "BOOKING.COM").length : null ;
    const INSTAGRAM = reservationPlatformData ? reservationPlatformData.filter(res => res.reservationType == "INSTAGRAM").length : null ;
    const WEBSITE = reservationPlatformData ? reservationPlatformData.filter(res => res.reservationType == "WEBSITE").length: null ;
    const OTHER =  reservationPlatformData ? reservationPlatformData.filter(res => res.reservationType == "OTHER").length : null ;
  

    const chartReservationPlatform = {
        data: canvas => {
          let ctx = canvas.getContext("2d");
      
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      
          gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
          gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
          gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
      
          return {
            labels: ["INSTA","WEB","BDOTCOM","OTHER"],
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
                data: [INSTAGRAM,WEBSITE,BOOKINGCOM,OTHER]
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
                  suggestedMax: 30,
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
    //---------------------------------------------Roomsavailable today ---------------------------------------------------
    const chartRoomsAvailTodayData = reservations ? (reservations.map(reservation => ({...reservation,date:reservation.startDay.toDate()}))) : (null)
    const today = new Date()
    today.setHours(0,0,0,0)
    var availableRooms = [5,5,5,5,5,5]
    availableRooms[0] -= chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'EXKINGSUITE' && res.date.getDate() == today. getDate() && res.date.getMonth() == today.getMonth()).length : null
    availableRooms[1] -= chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'FAMSTUDIO' && res.date.getDate() == today.getDate() && res.date.getMonth() == today.getMonth()).length : null
    availableRooms[2] -= chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'PRESSUITE'&& res.date.getDate() == today.getDate() && res.date.getMonth() == today.getMonth()).length : null
    availableRooms[3] -= chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'SEAKING' && res.date.getDate() == today.getDate() && res.date.getMonth() == today.getMonth()).length : null
    availableRooms[4] -= chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'CMASTER'&& res.date.getDate() == today.getDate() && res.date.getMonth() == today.getMonth()).length : null
    availableRooms[5] -= chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'SEASINGLE' && res.date.getDate() == today.getDate() && res.date.getMonth() == today.getMonth()).length : null
    
    console.log(chartRoomsAvailTodayData ? chartRoomsAvailTodayData.filter(res => res.roomType == 'EXKINGSUITE' && res.date.getDate() == today.getDate() && res.date.getMonth() == today.getMonth()) : null)
    const chartDataForRoomsAvailable = {
        data: canvas => {
          let ctx = canvas.getContext("2d");
      
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
      
          gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
          gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
          gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
      
          return {
            labels: [
                'EXKINGSUITE',
                'FAMSTUDIO',
                'PRESSUITE',
                'SEAKING',
                'CMASTER',
                'SEASINGLE'
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
                data: [availableRooms[0],availableRooms[1],availableRooms[2],availableRooms[3],availableRooms[4],availableRooms[5]],
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
   
   
    //-------------------------------------------Theme--------------------------------------------------------------------------
    const WhiteTextTypography = withStyles({
        root: {
          color: "#00f2c3 !important"
        }
      })(Typography);
    //----------------------------------------Return UI---------------------------------------------------------------------------
    const [bigChartData, setBigChartData] = useState("chart1")
    return(
        <>
        <div className="content">
          <Row style={{margin:"0px",marginTop:"20px"}}>
            <Col xs="12">
            <div className="divToPDF1">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Reservations</h5>
                      <CardTitle tag="h2">Yearly Reservation Overview</CardTitle>
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
                          onClick={() => console.log("ici") || demoFromHTML("divToPDF1","Reservations_Yearly")}
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
                      data={chart1}
                      options={chartOptions1}
                    />
                  </div>
                </CardBody>
              </Card>
              </div>
            </Col>
          </Row>
          <Row style={{margin:"0px"}}>
            <Col lg="4">
            <div className="divToPDF2">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Reservations</h5>
                      <CardTitle tag="h2">Reservations of Roomtype</CardTitle>
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
                          onClick={() => console.log("ici") || demoFromHTML("divToPDF2","Reservations_RoomType")}
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
                    data={chartReservationsOfRoomType}
                    options={chartOptions2}
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
                      <h5 className="card-category">Reservations</h5>
                      <CardTitle tag="h2">Reserved Platform</CardTitle>
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
                          onClick={() => console.log("ici") || demoFromHTML("divToPDF3","Reservations_Platform")}
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
                      data={chartReservationPlatform.data}
                      options={chartReservationPlatform.options}
                    />
                  </div>
                </CardBody>
              </Card>
              </div>
            </Col>
            <Col lg="4">
            <div className="divToPDF4">
              <Card className="card-chart" style={{boxShadow:"0px 1px 20px 2px rgb(0 0 0 / 79%)"}}>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Reservations</h5>
                      <CardTitle tag="h2">Rooms Available Today</CardTitle>
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
                          onClick={() => console.log("ici") || demoFromHTML("divToPDF4","RoomsAvailable")}
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
                      data={chartDataForRoomsAvailable.data}
                      options={chartDataForRoomsAvailable.options}
                      height={50}

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
        reservation:state.firestore.ordered.reservation
    }
}

export default compose(connect(mapStateToProps,null),firestoreConnect([
    {collection: 'reservation'}
  ]))(FrontOfficeDashboard)
