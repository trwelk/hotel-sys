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

//Import CRUD Operation for Petty Cahs Management
import {updatePettyCash} from '../../../redux/actions/financeActions/PettyCashManagementActions'
import {insertPettyCash} from '../../../redux/actions/financeActions/PettyCashManagementActions'
import {deletePettyCash} from '../../../redux/actions/financeActions/PettyCashManagementActions'

 function PettyCashManagement(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'PCash ID', field: 'id' },
      { title: 'Voucher No', field: 'voucherNo' },
      { title: 'Date', field: 'date', type:'date' },
      { title: 'Requested Amount', field: 'requestedAmount', type:'numeric'},
      { title: 'Issued Amount', field: 'issuedAmount', type:'numeric'},
      { title: 'Balance Received', field: 'balanceAmount', type:'numeric'},
      { title: 'Variance', field: 'variance', lookup: {33: 'Budget', 34: 'Short', 35: 'Over'}},
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
        return "Assign a Value, PCash ID Cannot be Null"
      }

      else if(data.id.length !== 5 || data.id.length > 5 ){
        return "Invalid Length, accepted length -> 'PC000'"
      }
      if(data.voucherNo == null || data.voucherNo === ""){
        return "Voucher No Cannot be Null"
      }

      else if(data.voucherNo.length !== 5 || data.voucherNo.length > 5 ){
        return "Invalid Length, accepted length -> 'PR000'"
      }

      else if(data.requestedAmount == null || data.requestedAmount === ""){
        return "Requested Amount Cannot be Null"
      }
      
      else if(data.requestedAmount <= 0){
          return "Requested Amount should be Greater than 0"
      }

      else if(data.date == null || data.date === ""){
        return "Select a Date"
      }
      
      else if(data.variance == null || data.variance === ""){
        return "Select a Value"
      }

      else if(data.issuedAmount == null || data.issuedAmount === ""){
        return "Issued Amount Cannot be Null"
      }
      
      else if(data.issuedAmount <= 0){
          return "Issued Amount should be Greater than 0"
      }

      
      else if(data.balanceAmount == null || data.balanceAmount === ""){
        return "Balance Amount Cannot be Null"
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
      props.insertPettyCash({
        id:"PC001",
        voucherNo:"PR002",
        date:"Tue Sep 15 2020",
        requestedAmount:"2500.00",
        issuedAmount:"2500.00",
        balanceAmount:"0",
        variance:"33"
      });
    }

    const petmg = useSelector(state => state.firestore.ordered.pettycashManagement)
    const data = petmg ? (petmg.map(petmg => ({...petmg}))) : (null)
    
    //Petty Cash Management
    const table = data ? (
        <MaterialTable

         //For reports, pivot and data filter
         options={{
          exportButton: true,
          grouping: true,
          filtering: true
        }}

        title="Petty Cash Management"
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
                  props.insertPettyCash(newData);
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
                  props.updatePettyCash(newData)
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
                props.deletePettyCash(oldData.id)
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

  //CRUD Operations for Petty Cash Management
  const mapDispatchToProps = (dispatch) => {
    return {
        updatePettyCash: (payload) => dispatch(updatePettyCash(payload)),
        insertPettyCash: (payload) => dispatch(insertPettyCash(payload)),
        deletePettyCash: (voucherNo) => dispatch(deletePettyCash(voucherNo))


    }
}

  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    //Database for Petty Cash Management
    {collection: 'pettycashManagement'}
  ])) (PettyCashManagement)

  