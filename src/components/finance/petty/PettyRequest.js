//importing docs & default components
import React from 'react'
import MaterialTable, { MTableToolbar }from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

//Import CRUD Operation for Petty Cahs Management
import {updatePettyRequest} from '../../../redux/actions/financeActions/PettyRequestActions'
import {insertPettyRequest} from '../../../redux/actions/financeActions/PettyRequestActions'
import {deletePettyRequest} from '../../../redux/actions/financeActions/PettyRequestActions'

 function PettyRequest(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Voucher No', field: 'id' },
      { title: 'Date', field: 'date', type:'date' },
      { title: 'Requested By', field: 'requestedBy'},
      { title: 'Department', field: 'department', lookup: 
      {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
      { title: 'Description', field: 'description' },
      { title: 'Requested Amount', field: 'requestedAmount', type:'numeric'},
      { title: 'Status', field: 'status', lookup: { 33: 'Requested', 34: 'Pending', 35: 'Rejected', 36: 'Accepted', 37: 'Issued' }},
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
        return "Invalid Length, accepted length -> 'PR000'"
      }

      if(data.requestedBy.length !== 5 || data.requestedBy.length > 5 ){
        return "Assign a Value, Request ID Cannot be Null"
      }

      else if(data.requestedBy == null || data.requestedBy === ""){
        return "Invalid Length, accepted length -> 'EM000'"
      }

      else if(data.date == null || data.date === ""){
        return "Select a Date"
      }
      
      else if(data.department == null || data.department === ""){
        return "Select a Department"
      }
      
      else if(data.status == null || data.status === ""){
        return "Select a Status"
      }

      else if(data.description == null || data.description === ""){
        return "Description cannot be Null"
      }

      else if(data.description.length <= 5){
        return "Description Length is Short"
      }

      else if(data.requestedAmount == null || data.requestedAmount === "" || data.requestedAmount <= 0){
        return "Request Amount Cannot be null"
      }

      else if(data.requestedAmount <= 0){
        return "Request Amount should be Greater than 0"
      }

      else
      return null;
    }//Valildations Ends Here

  /*const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };*/

  const handleClose = () => {
    setState({ ...state, open: false });
  };

    //To insert Demo Data
    const handleDemoData = () => {
      props.insertPettyRequest({
        id:"PR001",
        date:"Tue Sep 15 2020",
        requestedBy:"EM001",
        department:"33",
        description:"To Buy Goods",
        requestedAmount:"2500.00",
        status:"33"
      });
    }

    const petrq = useSelector(state => state.firestore.ordered.pettycashRequest)
    const data = petrq ? (petrq.map(petrq => ({...petrq}))) : (null)
    
    //Petty Cash Request
    const table = data ? (
        <MaterialTable

        //For reports, pivot and data filter
        options={{
          exportButton: true,
          grouping: true,
          filtering: true
        }}

        title="Petty Cash Requests"
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
                 
                  props.insertPettyRequest(newData);
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
                  props.updatePettyRequest(newData)
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
                props.deletePettyRequest(oldData.id)
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

    //Custom Toasts for Validati
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

  //CRUD Operations for Petty Cash Requests
const mapDispatchToProps = (dispatch) => {
    return {
        updatePettyRequest: (payload) => dispatch(updatePettyRequest(payload)),
        insertPettyRequest: (payload) => dispatch(insertPettyRequest(payload)),
        deletePettyRequest: (voucherNo) => dispatch(deletePettyRequest(voucherNo))


    }
}

  export default compose(connect(null, mapDispatchToProps),firestoreConnect([
    //Database for Petty Cash Requests
    {collection: 'pettycashRequest'}
  ])) (PettyRequest)

  