import React from 'react'
import {MaterialTable, MTableToolbar }  from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import EmployeeForm from '../employee/EmployeeForm'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import {insertEmployee, updateEmployee, deleteEmployee} from '../../../redux/actions/hrActions/EmployeeActions'

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function EmployeeList(props) {
 
    const classes = useStyles();
    const { useState } = React;
    
 
    const [columns, setColumns] = useState([
      { title: 'Employee ID', field: 'id' },
      { title: 'Employee Name', field: 'name' },
      { title: 'Employee Type', field: 'emptype' , lookup:{PERMANENT : 'Permanent', TEMPORARY: 'Temporary'}},
      { title: 'Department', field: 'department', lookup:{FINANCE:'Finance',FRONTOFFICE:'Front Office',FNBPRODUCTION:'FnB Production',FNBSERVICES:'FnB Services',MAINTENANCE:'Maintenance',PURCHASES:'Purchases n Inventory',HR:'Human Resources',HOUSEKEEPING:'HouseKeeping'} },
      { title: 'Designation', field: 'designation' },
      { title: 'Reports To', field: 'reportsto', lookup:{40:'GM', 41:'FM', 42:'F&B-PM', 43:'F&B-SM', 44:'HKM', 45:'HRM', 47:'MM',48:'PIM' }},
      { title: 'Contact Number', field: 'contactnumber' },
      { title: 'Address', field: 'address' } 
    ]);
    
    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });

    const { vertical, horizontal, open ,error} = state;
    
    //Demo Button Styles
    // const useStyles = makeStyles({
    //   root: {
    //     background: 'white',
    //     border: 0,
    //     borderRadius: 6,
    //     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    //     color: '#000080',
    //     height: 48,
    //     padding: '0 30px',
    //   },
    // });

    const employees = useSelector(state => state.firestore.ordered.employee)
    const data = employees ? (employees.map(employee => ({...employee}))) : (null)
    const employeeTypes = useSelector(state => state.firestore.ordered.employeetype)    
    const Typedata = employeeTypes ? (employeeTypes.map(employeetype => ({...employeetype}))) : (null)
    //const CardList = Typedata ? Typedata.map((employeetype) => (<EmployeeTypeCard employeeType={employeetype} />)): (null)
    const permanent = employees ? employees.filter(data => data.emptype == 'PERMANENT').length: 0
    const temporary = employees ? employees.filter(data => data.emptype == 'TEMPORARY').length: 0
    console.log(data);

    const validateData___  = (data) => {
      if(data.id == null || data.id == ""){
        return "Field ID Cannot be null"
      }
      else if(data.id.length !== 5 || data.id.length > 5 ){
        return "Invalid Length, Length => EM000 "
      }
      else if(data.name == null || data.name == ""){
        return "Field NAME Cannot be null"
      }
      else if(data.emptype == null || data.emptype == ""){
        return "Field EMPLOYEE TYPE Cannot be null"
      }
      else if(data.department == null || data.department == ""){
        return "Field DEPARTMENT Cannot be null"
      }
      else if(data.designation == null || data.designation == ""){
        return "Field DESIGNATION Cannot be null"
      }
      else if(data.reportsto == null || data.reportsto == ""){
        return "Select a manager, Employee must report to a manager!"
      }
      else if(data.contactnumber == null || data.contactnumber == ""){
        return "Field CONTACT NUMBER Cannot be null"
      }
      else if(data.contactnumber.length != 10 ){
        return "Please enter a valid contact number with 10 digits"
      }
      else if(data.designation == null || data.designation == ""){
        return "Field ADDRESS Cannot be null"
      }
      else
      return null;
    }

    const handleClick = (newState) => () => {
      setState({ open: true, ...newState });
    };
  
    const handleClose = () => {
      setState({ ...state, open: false });
    };

    const handleDemoData = () => {
      props.insertEmployee({
        id:"EM005",
        name: "Tharusha Perera",
        emptype: "PERMANENT",
        department:"FINANCE",
        designation:"Accountant",
        reportsto:"41",
        contactnumber:"0712345678",
        address:"No.1, First Lane, Hikkaduwa"
      });
    }

    const table = data ? (
        <MaterialTable
        options={{
        exportButton: true
      }}
        title="Employee List Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
                if (error != null){
                  reject();
                  setState({ ...state, open: true,error:error });
                }
                else{
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertEmployee(newData)
                resolve();
              }, 1000)}
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
                if (error != null){
                  reject();
                  setState({ ...state, open: true,error:error });
                }
                else{
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                //setData([...dataUpdate]);
                console.log(newData,oldData)
                props.updateEmployee(newData)
                resolve();
              }, 1000)}
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                console.log(oldData)
                props.deleteEmployee(oldData.id)
                resolve()
              }, 1000)
            }),
        }}
        options = {{exportButton: true}}
        components={{
        Toolbar: props => (
          <div>
            <MTableToolbar {...props} />
            <div style={{padding: '0px 10px'}}>
              <Button onClick={handleDemoData}>Demo</Button>
          </div>
          </div>
        ),
      }}
      />
    ) : (<div>Loading</div>)

    const feedBackToast =  (<Snackbar 
      autoHideDuration={200000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
      >
          <div className={classes.root}>

        <Alert variant="filled" severity="error" style={{display: "flex",alignItems: "center"}}>
        <h3>{error}</h3>
        
        </Alert>
        </div>
      </Snackbar>)
  
  const WhiteTextTypography = withStyles({
    root: {
      color: "#00f2c3 !important"
    }
  })(Typography);
  
    return(
        <div>
             {/* {CardList} */}
             <Row style={{margin:"0px",marginTop:"15px"}}>
            <Col lg="3">
              <Card className="card-chart" style={{height: "165px",border: "#1d8cf8 solid"}}>
                <CardHeader>
                  <h4 className="card-category" style={{color:"white",fontSize: "medium"}}>Permanent</h4>
                </CardHeader>
                <CardBody style={{display: "flex",justifyContent: "center",padding: "2px"}}>
                  <div style={{width: "150px",height: "93px",}}>
                    <WhiteTextTypography variant="h1" component="h2" gutterBottom>
                        {permanent}
                    </WhiteTextTypography>             
                 </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3">
              <Card className="card-chart" style={{height: "165px",border: "#1d8cf8 solid"}}>
                <CardHeader>
                  <h4 className="card-category" style={{color:"white",fontSize: "medium"}}>Temporary</h4>
                </CardHeader>
                <CardBody style={{display: "flex",justifyContent: "center",padding: "2px"}}>
                  <div style={{width: "150px",height: "93px",}}>
                    <WhiteTextTypography variant="h1" component="h2" gutterBottom>
                        {temporary}
                    </WhiteTextTypography>             
                 </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

             {employees ? table : <div>Loading</div>}
             {feedBackToast}
        </div>
       
        )
  }

 
const mapDispatchToProps = (dispatch) => {
    return {
        insertEmployee: (payload) => dispatch(insertEmployee(payload)),
        updateEmployee: (payload) => dispatch(updateEmployee(payload)),
        deleteEmployee: (empId) => dispatch(deleteEmployee(empId))
    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'employee'},
    {collection: 'employeetype'},
    {collection: 'department'}
  ])) (EmployeeList)