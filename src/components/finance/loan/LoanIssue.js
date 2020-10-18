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

//Import CRUD Operation for Loan Issue
import {updateLoanIssue} from '../../../redux/actions/financeActions/LoanListActions'
import {insertLoanIssue} from '../../../redux/actions/financeActions/LoanListActions'
import {deleteLoanIssue} from '../../../redux/actions/financeActions/LoanListActions'

 function LoanIssue(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Loan ID', field: 'id' },
        { title: 'Loan Request ID', field: 'loanRequestID' },
        //{ title: 'Request Date', field: 'reqDate', type:'date' },
        //{ title: 'Issue Date', field: 'issueDate', type:'date' },
        { title: 'Duration', field: 'duration', lookup: {30:'3 Months', 31: '6 Months', 32:'1 Year'}},
        //{ title: 'Final Date', field: 'finalDate', type:'date' },
        { title: 'Loan Limit', field: 'loanLimit', type:'numeric'},
        { title: 'Loan Amount', field: 'loanAmount', type:'numeric' },
        { title: 'Amount Paid', field: 'amountPaid' , type:'numeric' },
        { title: 'Pending', field: 'pending', type:'numeric', editable:'never' },
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
        return "Assign a Value,Loan Issue ID Cannot be Null"
      }

      else if(data.id.length !== 5 || data.id.length > 5 ){
        return "Invalid Length, accepted length -> 'LI000'"
      }

      if(data.loanRequestID == null || data.loanRequestID === ""){
        return "Assign a Value,Loan Request ID Cannot be Null"
      }

      else if(data.id.loanRequestID !== 5 || data.id.loanRequestID > 5 ){
        return "Invalid Length, accepted length -> 'LR000'"
      }

      if(data.loanLimit == null || data.loanLimit === ""){
        return "Loan Limit Cannot be Null"
      }
      
      else if(data.loanLimit <= 0){
          return "Loan Limit should be Greater than 0"
      }

      else if(data.loanAmount == null || data.loanAmount === ""){
        return "Loan Amount Cannot be Null"
      }
      
      else if(data.loanAmount <= 0){
          return "Loan Amount should be Greater than 0"
      }

      else if(data.amountPaid == null || data.amountPaid === ""){
        return "Loan Amount Cannot be Null"
      }

      else if(data.duration == null || data.duration === ""){
        return "Select Duration"
      }

      else
      return null;
    }//Validations Ends here

  /*const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };*/

  const handleClose = () => {
    setState({ ...state, open: false });
  };

     //To insert Demo Data
     const handleDemoData = () => {
      props.insertLoanIssue({
        id:"LI001",
        loanRequestID:"LR001",
        //reqDate:"Sat Oct 17 2020",
        //issueDate:"Sat Oct 17 2020",
        duration:"30",
        //finalDate:"",
        loanLimit:"20000.00",
        loanAmount:"13500.00",
        amountPaid:"2000.00"
      });
    }

    
    const loanis = useSelector(state => state.firestore.ordered.loanIssue)
    const data = loanis ? (loanis.map(loanis => ({...loanis,
      //Loan Pending Calculation
    pending: parseFloat(loanis.loanAmount) - parseFloat(loanis.amountPaid) }))) : (null)
    
    //Asset Loan Issue
    const table = data ? (
        <MaterialTable

         //For reports, pivot and data filter
         options={{
          exportButton: true,
          grouping: true,
          filtering: true
        }}

        title="Loan List"
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
                  
                  props.insertLoanIssue(newData);
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
                  props.updateLoanIssue(newData)
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
                props.deleteLoanIssue(oldData.id)
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

  //CRUD Operations for Loan Issue
const mapDispatchToProps = (dispatch) => {
    return {
        updateLoanIssue: (payload) => dispatch(updateLoanIssue(payload)),
        insertLoanIssue: (payload) => dispatch(insertLoanIssue(payload)),
        deleteLoanIssue: (loanID) => dispatch(deleteLoanIssue(loanID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    //Database for Loan Issue
    {collection: 'loanIssue'}
  ])) (LoanIssue)
