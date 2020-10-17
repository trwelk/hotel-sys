//importing docs & default component
import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

//Import CRUD Operation for Salary Management
import {updateSalary} from '../../../redux/actions/financeActions/PayrollActions'
import {insertSalary} from '../../../redux/actions/financeActions/PayrollActions'
import {deleteSalary} from '../../../redux/actions/financeActions/PayrollActions'

 function SalaryMgmt(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Salary Rep No', field: 'id' },
        { title: 'Attendance ID', field: 'attendanceID' },
        { title: 'Basic Salary', field: 'basicSalary', type:'numeric' },
        { title: 'No Pay', field: 'noPay', type:'numeric' },
        { title: 'OT Pay', field: 'otPay', type:'numeric' },
        { title: 'Allowances', field: 'allowances' , type:'numeric' },
        { title: 'Service Charges', field: 'serCharges', type:'numeric' },
        { title: 'Loan Deduction', field: 'loan', type:'numeric' },
        { title: 'EPF', field: 'epf', type:'numeric' },
        { title: 'Net Salary', field: 'netSalary', editable:'never'},
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

    //Validations Begins
    const validateData___  = (data) => {
    
      if(data.id == null || data.id === ""){
        return "Assign a Value, Payroll ID Cannot be Null"
      }

      else if(data.id.length !== 5 || data.id.length > 5 ){
        return "Invalid Length, accepted length -> 'SM000'"
      }

      if(data.attendanceID == null || data.attendanceID === ""){
        return "Assign a Value, Attendance ID Cannot be Null"
      }

      else if(data.attendanceID.length !== 5 || data.attendanceID.length > 5 ){
        return "Invalid Length, accepted length -> 'AL000'"
      }

      else if(data.basicSalary == null || data.basicSalary === ""){
        return "Basic Salary Cannot be Null"
      }
      
      else if(data.basicSalary <= 0){
          return "Basic Salary should be Greater than 0"
      }
      
      else if(data.noPay == null || data.noPay === ""){
        return "No Pay Cannot be Null"
      }
    
      else if(data.otPay == null || data.otPay === ""){
        return "OT Pay Cannot be Null"
      }
      
      else if(data.allowances == null || data.allowances === ""){
        return "Allowances Cannot be Null"
      }
      
      else if(data.serCharges == null || data.serCharges === ""){
        return "Service Charges Cannot be Null"
      }
      
      else if(data.loan == null || data.loan === ""){
        return "Loan Cannot be Null"
      }
            
      else if(data.epf == null || data.epf === ""){
        return "EPF Cannot be Null"
      }
      

      else
      return null;
    } //Validaions Ends here

  /*const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };*/

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  //To insert Demo Data
  const handleDemoData = () => {
    props.insertSalary({
      id:"SM001",
      attendanceID:"AL002",
      basicSalary:"3800.00",
      noPay:"1000.00",
      otPay:"300.00",
      allowances:"500.00",
      serCharges:"1000.00",
      loan:"500.00",
      epf:"750.00"
    });
  }
    const salmg = useSelector(state => state.firestore.ordered.salaryMgmt)
    const data = salmg ? (salmg.map(salmg => ({...salmg,
      //Calculation for Salary
    netSalary : parseFloat(salmg.basicSalary) + parseFloat(salmg.otPay) + parseFloat(salmg.allowances)
  + parseFloat(salmg.serCharges) - parseFloat(salmg.noPay) - parseFloat(salmg.loan)
- parseFloat(salmg.epf) }))) : (null)
    
      //Salary Management Table
    const table = data ? (
        <MaterialTable

        //For reports, pivot and data filter
        options={{
          exportButton: true,
          grouping: true,
          filtering: true
        }}

        title="Staff Payroll"
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
                  props.insertSalary(newData);
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
                  props.updateSalary(newData)
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
                props.deleteSalary(oldData.id)
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

  //CRUD Operations for Salary Management Table
const mapDispatchToProps = (dispatch) => {
    return {
        updateSalary: (payload) => dispatch(updateSalary(payload)),
        insertSalary: (payload) => dispatch(insertSalary(payload)),
        deleteSalary: (salaryID) => dispatch(deleteSalary(salaryID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
     //Database for Salary Management
    {collection: 'salaryMgmt'}
  ])) (SalaryMgmt)
  
