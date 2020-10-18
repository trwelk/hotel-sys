//importing docs & default components
import React from 'react';
import MaterialTable, { MTableToolbar }  from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";

//Import CRUD Operation for Asset List
import {updateAssetList} from '../../../redux/actions/financeActions/AssetMgmtActions'
import {insertAssetList} from '../../../redux/actions/financeActions/AssetMgmtActions'
import {deleteAssetList} from '../../../redux/actions/financeActions/AssetMgmtActions'

 function AssetList(props) { 
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Asset ID', field: 'id'},
        { title: 'Request ID', field: 'requestID'},
        { title: 'Department', field: 'department', lookup : 
        {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
        {title: 'Purchase Date', field: 'purchaseDate', type:'date'},
        { title: 'Expected Life Years', field: 'lifeYears', lookup:{30:'<=5 Years', 31:'<=10 Years', 32:'<=15 Years', 33:'>15 Years'}},
        { title: 'Purchased Value', field: 'purchaseValue', type:'numeric'},
        { title: 'Amount Depriciated', field: 'depriciation', type:'numeric'},
        { title: 'Asset Value', field: 'assetValue', type:'numeric', editable:'never'},
        { title: 'Asset Status', field: 'assetStatus', lookup: {33:'Active', 34:'Inactive', 35:'Discontinued'}},
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
        return "Assign a Value, Asset ID Cannot be Null"
      }

      else if(data.id.length !== 5 || data.id.length > 5 ){
        return "Invalid Length, accepted length -> 'AL000'"
      }

      if(data.requestID == null || data.requestID === ""){
        return "Assign a Value, Request ID Cannot be Null"
      }

      else if(data.requestID.length !== 5 || data.requestID.length > 5 ){
        return "Invalid Length, accepted length -> 'AR000'"
      }

      else if(data.purchaseValue == null || data.purchaseValue === ""){
        return "Enter a valid Value"
      }

      else if(data.purchaseValue <= 0){
        return "Purchase Value should be Greater than 0"
      }
        
      else if(data.department == null || data.department === ""){
        return "Select a Department"
      }
      
      else if(data.purchaseDate == null || data.purchaseDate === ""){
        return "Select Purchase Date"
      }

      else if(data.lifeYears == null || data.lifeYears === ""){
        return "Select Expected Life Years"
      }

      else if(data.purchaseValue == null || data.purchaseValue === ""){
        return "Enter a valid Value"
      }

      else if(data.purchaseValue <= 0){
        return "Purchase Value should be Greater than 0"
      }

      else if(data.depriciation == null || data.depriciation === ""){
        return "Enter a valid Value"
      }

      else if(data.assetStatus == null || data.assetStatus === ""){
        return "Select Asset Status"
      }

      else
      return null;
 } //Validations Ends here

    /*const handleClick = (newState) => () => {
      setState({ open: true, ...newState });
    }; 'Not Required */

    const handleClose = () => {
      setState({ ...state, open: false });
    };

    //To insert Demo Data
    const handleDemoData = () => {
      props.insertAssetList({
        id:"AL001",
        requestID:"AR002",
        department:"38",
        purchaseDate:"Tue Sep 15 2020",
        lifeYears:"30",
        purchaseValue:"13500.00",
        depriciation:"100",
        assetStatus:"33"
      });
    }
    
    const asslist = useSelector(state => state.firestore.ordered.assetList)
    const data = asslist ? (asslist.map(asslist => ({...asslist,
    //Calculation of Asset Value
    assetValue : parseFloat(asslist.purchaseValue) - parseFloat(asslist.depriciation)}))) : (null)

    /*const userType = useSelector(state => state.auth.userType)    
    if(userType !== "ADMIN"){
    return <Redirect to="/error" />}*/

    //Asset List Table
     const table = data ? (
         <MaterialTable

         //For reports, pivot and data filter
         options={{
            exportButton: true,
            grouping: true,
            filtering: true
          }}
         
         title="Assets List"
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
                   props.insertAssetList(newData);
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
                   props.updateAssetList(newData)
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
                 props.deleteAssetList(oldData.id)
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
     ) : (<div>Loading Data</div>)
     
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
      insertAssetList: (payload) => dispatch(insertAssetList(payload)),
      updateAssetList: (payload) => dispatch(updateAssetList(payload)),
      deleteAssetList: (id) => dispatch(deleteAssetList(id))
    }
}

  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    //Database for Asset List
    {collection: 'assetList'},
  ])) (AssetList)