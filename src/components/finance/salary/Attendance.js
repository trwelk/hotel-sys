//importing docs & default components
import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

//Import CRUD Operation for Atendance
import {updateAttendance} from '../../../redux/actions/financeActions/AttendanceActions'
import {insertAttendance} from '../../../redux/actions/financeActions/AttendanceActions'
import {deleteAttendance} from '../../../redux/actions/financeActions/AttendanceActions'

 function Attendance(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Attendance ID', field: 'id' },
        { title: 'Employee ID', field: 'employeeID' },
        { title: 'Department', field: 'department', lookup: 
        {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
        { title: 'Month', field: 'month', lookup:{1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun',7:'Jul', 8:'Aug',
        9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec'}},
        { title: 'Year', field: 'year' },
        { title: 'Total Working Days', field: 'totWDays', type:'numeric'},
        { title: 'Total Working Hours', field: 'totWHours', type:'numeric'},
        { title: 'Actual Working Days', field: 'actWDays', type:'numeric'},
        { title: 'Actual Working Hours', field: 'actWHours', type:'numeric'},
        { title: 'Allowances', field: 'allowances', lookup:{30:'Full', 31:'Mobile', 32:'Transport'}},
        //{ title: 'Total Amount', field: 'totalAmount', editable:'never'},
        { title: 'On Loan', field: 'loan', lookup: {30:'Yes', 31:'No'}},
    ]); 

    //Constant Variables
    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });

    const { vertical, horizontal, open ,error} = state;

    //Demo Button Style
    const useStyles = makeStyles({
      root: {
        background: 'white',
        border: 0,
        borderRadius: 6,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: '#000080',
        height: 48,
        padding: '0 30px',
      },
    });

    const classes = useStyles();

    const validateData___  = (data) => {
    
      if(data.id == null || data.id === ""){
        return "Assign a Value, Attendance ID Cannot be Null"
      }

      else if(data.id.length !== 5 || data.id.length > 5 ){
        return "Invalid Length, accepted length -> 'AL000'"
      }

      if(data.employeeID == null || data.employeeID === ""){
        return "Assign a Value, Request ID Cannot be Null"
      }

      else if(data.employeeID.length !== 5 || data.employeeID.length > 5 ){
        return "Invalid Length, accepted length -> 'EM000'"
      }

      else if(data.totWDays == null || data.totWDays === ""){
        return "Total Working Days Cannot be Null"
      }
      
      else if(data.totWDays <= 0){
          return "Total Working Days should be Greater than 0"
      }
      
      else if(data.totWHours == null || data.totWHours === ""){
        return "Total Working Hours Cannot be Null"
      }
      
      else if(data.totWHours <= 0){
          return "Total Working Hours should be Greater than 0"
      }

      else if(data.actWDays == null || data.actWDays === ""){
        return "Actual Working Days Cannot be Null"
      }

      else if(data.department == null || data.department  === ""){
        return "Select Department"
      }

      else if(data.allowances == null || data.allowances  === ""){
        return "Select Allowance Type"
      }

      else if(data.loan == null || data.loan  === ""){
        return "Select Loan Status"
      }

      else if(data.month == null || data.month  === ""){
        return "Select Month"
      }
      
      else if(data.year == null || data.year  === ""){
        return "Select Year"
      }

      else if(data.actWDays <= 0){
          return "Actual Working Days should be Greater than 0"
      }
      
      else if(data.actWHours == null || data.totWHours === ""){
        return "Actual Working Hours Cannot be Null"
      }
      
      else if(data.actWHours <= 0){
          return "Actual Working Hours should be Greater than 0"
      }

      else
      return null;
    } //Validation Ends here

  /*const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };*/

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  //To insert Demo Data
  const handleDemoData = () => {
    props.insertAttendance({
      id:"AL001",
      employeeID:"EM002",
      department:"38",
      month:"1",
      year:"2020",
      totWDays:"10",
      totWHours:"100",
      actWDays:"3",
      actWHours: "30",
      allowances:"30",
      loan:"30"
    });
  }


    const atten = useSelector(state => state.firestore.ordered.attendanceFin)
    const data = atten ? (atten.map(atten => ({...atten}))) : (null)
    
    //Atendance Table
    const table = data ? (
        <MaterialTable

         //For reports, pivot and data filter
         options={{
          exportButton: true,
          grouping: true,
          filtering: true
        }}

        title="Attendance Information"
        columns={columns}
        data={data}

        editable={{

          //add new record
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
              if (error != null) {
               setState({ ...state, open: true,error:error });
              reject();
              }
              else{
                setTimeout(() => {
                  props.insertAttendance(newData);
                  resolve();
                }, 1000)
              }
              
            }),

          //update existing record
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
              if (error != null) {
               setState({ ...state, open: true,error:error });
              reject();
              }
              else{
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  console.log(newData,oldData)
                  props.updateAttendance(newData)
                  resolve();
                }, 1000)
              }
             
            }),

          //delete existing record
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                console.log(oldData)
                props.deleteAttendance(oldData.id)
                resolve()
              }, 1000)
            }),
        }}

   //Button to Insert Demo Data
   components={{
    Toolbar: props => (
      <div>
        <MTableToolbar {...props} />
        <div>
          <Button className={classes.root} onClick={handleDemoData}>Click to Insert Demo Data </Button>
        </div>
      </div>
    ),
  }}

      />
    ) : (<div>Loading</div>)

    //Custom Toasts for Validations
    const feedBackToast =  (<Snackbar 
      autoHideDuration={200000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
      >
          <div >

        <Alert variant="filled" severity="error" style={{display: "flex",alignItems: "center"}}>
        <h3>{error}</h3>
        
        </Alert>
        </div>
      </Snackbar>)
  

  
    return(
        <div>
             {table}
             {feedBackToast}
        </div>
       
        )
  }

//CRUD Operations for Attendance Table
const mapDispatchToProps = (dispatch) => {
    return {
        updateAttendance: (payload) => dispatch(updateAttendance(payload)),
        insertAttendance: (payload) => dispatch(insertAttendance(payload)),
        deleteAttendance: (attendanceID) => dispatch(deleteAttendance(attendanceID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    //Database for Attendance
    {collection: 'attendanceFin'}
  ])) (Attendance)
  

 