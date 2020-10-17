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

//Import CRUD Operation for Asset Request
import {updateAssetRequest} from '../../../redux/actions/financeActions/AssetRequestActions'
import {insertAssetRequest} from '../../../redux/actions/financeActions/AssetRequestActions'
import {deleteAssetRequest} from '../../../redux/actions/financeActions/AssetRequestActions'

 function AssetRequest(props) {
     
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Request ID', field: 'id' },
      { title: 'Request Date', field: 'date', type: 'date'},
      { title: 'Asset Type', field: 'assetType', 
      lookup: { 33: 'Machinery', 34: 'Investments', 35: 'Inventory', 36: 'Furniture', 37: 'Vehicle', 38: 'Buidling' }},
      { title: 'Description', field: 'description' },
      { title: 'Quantity', field: 'quantity'},
      { title: 'Unit Price', field: 'unitPrice'},
      { title: 'Total Amount', field: 'totalAmount',editable: 'never'},
      { title: 'Status', field: 'status', lookup: { 33: 'Requested', 34: 'Pending', 35: 'Rejected', 36: 'Accepted', 37: 'Purchased' }},
      {title : 'Last Update', field: 'lastUpdate', type:'date'},
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
        return "Invalid Length, accepted length -> 'AR000'"
      }

      else if(data.date == null || data.date === ""){
        return "Select Request Date"
      }

      else if(data.assetType == null || data.assetType === ""){
        return "Select Asset Status"
      }

      else if(data.quantity == null || data.quantity === ""){
        return "Enter a valid Value"
      }
      
      else if(data.quantity <= 0){
          return "Quantity Value should be Greater than 0"
      }

      else if(data.unitPrice == null || data.unitPrice === "" || data.unitPrice <= 0){
        return "Unit Price Cannot be null"
      }

      else if(data.unitPrice <= 0){
        return "Unit Price should be Greater than 0"
      }

      else if(data.description == null || data.description === ""){
        return "Description cannot be Null"
      }

      else if(data.description.length <= 5){
        return "Description Length is Short"
      }

      else if(data.status == null || data.status === ""){
        return "Select Request Status"
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
    props.insertAssetRequest({
      id:"AR001",
      date:"Tue Sep 15 2020",
      assetType: "36",
      description:"Chairs",
      quantity:"10",
      unitPrice:"1500.00",
      status:"33",
      lastUpdate:"Tue Sep 15 2020"
    });
  }

    const assreq = useSelector(state => state.firestore.ordered.assetRequest)
    const data = assreq ? (assreq.map(assreq => ({...assreq,
    //Calculation of Asset Value
    totalAmount: parseFloat(assreq.unitPrice) * parseFloat(assreq.quantity)}))) : (null)
    

    //Asset Request Table
    const table = data ? (
        <MaterialTable
        
        //For reports, pivot and data filter
         options={{
            exportButton: true,
            grouping: true,
            filtering: true
          }}

        title="Asset Requests"
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
                props.insertAssetRequest(newData);
                resolve();
              }, 1000)}
              
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
                  props.updateAssetRequest(newData)
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
                props.deleteAssetRequest(oldData.id)
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

//CRUD Operations for Asset List Table
const mapDispatchToProps = (dispatch) => {
    return {
        updateAssetRequest: (payload) => dispatch(updateAssetRequest(payload)),
        insertAssetRequest: (payload) => dispatch(insertAssetRequest(payload)),
        deleteAssetRequest: (requestID) => dispatch(deleteAssetRequest(requestID))

    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
     //Database for Asset List
    {collection: 'assetRequest'}
  ])) (AssetRequest)

