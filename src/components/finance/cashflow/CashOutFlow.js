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

//Import CRUD Operation for CashOutflow
import {updateCashOut} from '../../../redux/actions/financeActions/CashOutActions'
import {insertCashOut} from '../../../redux/actions/financeActions/CashOutActions'
import {deleteCashOut} from '../../../redux/actions/financeActions/CashOutActions'

 function CashOutFlow(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Outflow No', field: 'id' },
        { title: 'Date', field: 'date', type:'date' },
        { title: 'Department', field: 'department', lookup : 
        {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
        { title: 'Description', field: 'description'},
        { title: 'Category', field: 'category', lookup : {30: 'Administration', 31: 'Operations', 33: 'Financial', 34: 'Other'}},
        { title: 'Sub Category', field: 'subCategory', lookup :{30: 'Payable', 31: 'Investment', 32: 'Other'}},
        { title: 'Inoivce Amount', field: 'invoiceAmount', type:'numeric' },
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
        return "Assign a Value, Cash Outflow ID Cannot be Null"
      }

      else if(data.id.length !== 5 || data.id.length > 5 ){
        return "Invalid Length, accepted length -> 'AL000'"
      }

      else if(data.date == null || data.date === ""){
        return "Select a Date"
      }

      else if(data.category == null || data.category === ""){
        return "Select a Category"
      }

      else if(data.subCategory == null || data.subCategory === ""){
        return "Select a Category"
      }

      else if(data.department == null || data.department === ""){
        return "Select a Category"
      }

      else if(data.invoiceAmount == null || data.invoiceAmount === ""){
        return "Enter a valid Value"
      }

      else if(data.invoiceAmount <= 0){
        return "Invoice Amount should be Greater than 0"
      }

      else if(data.description == null || data.description === ""){
        return "Description cannot be Null"
      }

      else if(data.description.length <= 5){
        return "Description Length is not sufficient"
      }

      else
      return null;
    } //Validations Ends here

  /*const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };*/

  const handleClose = () => {
    setState({ ...state, open: false });
  };

   //To insert Demo Data
   const handleDemoData = () => {
    props.insertCashOut({
      id:"CO001",
      date:"Tue Sep 15 2020",
      department:"35",
      description:"Service to Provider",
      category:"30",
      subCategory:"30",
      invoiceAmount:"2500.00"
    });
  }

    const cashout = useSelector(state => state.firestore.ordered.cashOutflow)
    const data = cashout ? (cashout.map(cashout => ({...cashout}))) : (null)
    
    //Cash Outflow Table
    const table = data ? (
        <MaterialTable

         //For reports, pivot and data filter
        options={{
          exportButton: true,
          grouping: true,
          filtering: true
        }}

        title="Cash Outflows"
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
                  props.insertCashOut(newData);
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
                  props.updateCashOut(newData)
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
                props.deleteCashOut(oldData.id)
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

  //CRUD Operations for Cash Outflow Table
const mapDispatchToProps = (dispatch) => {
    return {
        updateCashOut: (payload) => dispatch(updateCashOut(payload)),
        insertCashOut: (payload) => dispatch(insertCashOut(payload)),
        deleteCashOut: (outflowID) => dispatch(deleteCashOut(outflowID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    //Database for Cash Outflow
    {collection: 'cashOutflow'}
  ])) (CashOutFlow)

