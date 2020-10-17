//importing docs & default components
import React from 'react'
import MaterialTable, { MTableToolbar }  from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

//Import CRUD Operation for Loan Request
import {updateLoanRequest} from '../../../redux/actions/financeActions/LoanRequestActions'
import {insertLoanRequest} from '../../../redux/actions/financeActions/LoanRequestActions'
import {deleteLoanRequest} from '../../../redux/actions/financeActions/LoanRequestActions'

 function Loan(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Loan Request ID', field: 'id' },
        { title: 'Date', field: 'date', type:'date' },
        { title: 'Applied By', field: 'appliedBy' },
        { title: 'Department', field: 'department' , lookup : 
        {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
        { title: 'Loan Amount', field: 'loanAmount', type:'numeric' },
        { title: 'Duration', field: 'duration', lookup: {30:'3 Months', 31: '6 Months', 32:'1 Year'}},
        { title: 'Status', field: 'status', lookup: { 33: 'Requested', 34: 'Pending', 35: 'Rejected', 36: 'Accepted', 37: 'Issued' } },
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
        return "Assign a Value, Request ID Cannot be Null"
      }

      else if(data.id.length !== 5 || data.id.length > 5 ){
        return "Invalid Length, accepted length -> 'LR000'"
      }

      else if(data.id.date !== 5 || data.id.date > 5 ){
        return "Select a Date"
      }

      else if(data.id.department !== 5 || data.id.department > 5 ){
        return "Select a Department"
      }

      else if(data.id.duration !== 5 || data.id.duration > 5 ){
        return "Select a Duration"
      }

      else if(data.id.status !== 5 || data.id.status > 5 ){
        return "Select a Status"
      }

      if(data.appliedBy == null || data.appliedBy === ""){
        return "Assign a Value, Request ID Cannot be Null"
      }

      else if(data.appliedBy.length !== 5 || data.appliedBy.length > 5 ){
        return "Invalid Length, accepted length -> 'EM000'"
      }

      else if(data.loanAmount == null || data.loanAmount === ""){
        return "Loan Amount Cannot be Null"
      }
      
      else if(data.loanAmount <= 0){
          return "Loan Amount should be Greater than 0"
      }


      else
      return null;
    }

  /*const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };*/

  const handleClose = () => {
    setState({ ...state, open: false });
  };

    //To insert Demo Data
    const handleDemoData = () => {
      props.insertLoanRequest({
        id:"LR001",
        date:"Tue Sep 15 2020",
        appliedBy:"EM002",
        department:"38",
        loanAmount:"13500.00",
        duration:"30",
        status:"33"
      });
    }

    const loanrq = useSelector(state => state.firestore.ordered.loanRequest)
    const data = loanrq ? (loanrq.map(loanrq => ({...loanrq}))) : (null)
    
    //Asset Loan Request
    const table = data ? (
        <MaterialTable

           //For reports, pivot and data filter
           options={{
            exportButton: true,
            grouping: true,
            filtering: true
          }}
         
        title="Loan Requests"
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
               else {
                setTimeout(() => {
              
                  props.insertLoanRequest(newData);
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
              else {
                setTimeout(() => {
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  
                  console.log(newData,oldData)
                  props.updateLoanRequest(newData)
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
                props.deleteLoanRequest(oldData.id)
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


  //CRUD Operations for Loan Request
const mapDispatchToProps = (dispatch) => {
    return {
        updateLoanRequest: (payload) => dispatch(updateLoanRequest(payload)),
        insertLoanRequest: (payload) => dispatch(insertLoanRequest(payload)),
        deleteLoanRequest: (loanReques) => dispatch(deleteLoanRequest(loanReques))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    //Database for Loan Request
    {collection: 'loanRequest'}
  ])) (Loan)

 