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
    
  function EmployeeOverview(props){
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

    const employee = props.employee

    const dataForEmployeeTypes = employee ? (employee.map(data => ({...data}))):(null)
    const permanentEmployees = dataForEmployeeTypes ? dataForEmployeeTypes.filter(data => data.emptype == "PERMANENT").length:0
    const temporaryEmployees = dataForEmployeeTypes ? dataForEmployeeTypes.filter(data => data.emptype == "TEMPORARY").length:0

  }
  const mapStateToProps = (state) => {
    return{
        employee:state.firestore.ordered.employee

    }
}
  export default compose(connect(mapStateToProps,null),firestoreConnect([
    {collection: 'employee',
        storeAs: 'employee'}
  ]))(EmployeeOverview)