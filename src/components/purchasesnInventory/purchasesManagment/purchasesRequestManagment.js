import React from 'react'
import MaterialTable from 'material-table'
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import { firestoreConnect } from 'react-redux-firebase';
import {insertPurchasesRequest, updatePurchasesRequest, deletePurchasesRequest} from '../../../redux/actions/PnIActions/requestHandler';

// import headerPnI from '../headerPnI';

 function PurchasesRequestManagement(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Product ID', field: 'pId'},
      { title: 'Product Name', field: 'pType' },
      { title: 'Department', field: 'department' },
      { title: 'Priority', field: 'priority' },
      { title: 'Quantity', field: 'qty'},
      { title: 'Date', field: 'date'}
    ]); 
    const validateData___= (data) => {
      if (data.pId.length != 5) {
        console.log(data.pId.length)
        return "Field ID should contain 5 characters"
      }
      else if (data.pId == null || data.pId == "") {
        console.log(data.pId)
        return "ID field Cannot be null"
      }
      else if (data.pType == null || data.pType == "") {
        return "Product Type Cannot be null"
      }
      else if(data.qty == 0 || data.qty < 0){
        return "Quantity shold be a postive value"
      }
  
      else 
        return null
    }
  
    const [state, setState] = React.useState({
      open: false,
      vertical: ' bottom',
      horizontal: 'right'
    });
  
    const { vertical, horizontal, open, error } = state;
  
    const handleClose = () => {
      setState({ ...state, open: false });
    }
   
    const feedBackToast = (<Snackbar
      autoHideDuration={200000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <div >
        <Alert variant="filled" severity="error" style={{ display: "flex", alignItems: "center" }}>
          <h3>{error}</h3>
        </Alert>
      </div>
    </Snackbar>)
    const Req = useSelector(state => state.firestore.ordered.request)
    const data = Req ? (Req.map(req => ({...req}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Purchases Request Management"
        columns={columns}
        data={data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
              if (error != null){
                setState({ ...state,open: true,error:error});
                reject();
              }
              else{
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.pId;
                dataUpdate[index] = newData;
                //setData([...dataUpdate]);
                console.log(newData,oldData)
                props.updatePurchasesRequest(newData)
                resolve();
              }, 1000)}
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.pId;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                console.log(oldData)
                props.deletePurchasesRequest(oldData.pId)
                resolve()
              }, 1000)
            }),
        }}
        options={{
          exportButton: true
        }      
        }
      />
    ) : (<div>Loading</div>)


  

  
    return(
        <div>
             {table}
             {feedBackToast}
        </div>
       
        )
  }
 
const mapDispatchToProps = (dispatch) => {
    return {
        insertPurchasesRequest: (payload) => dispatch(insertPurchasesRequest(payload)),
        updatePurchasesRequest: (payload) => dispatch(updatePurchasesRequest(payload)),
        deletePurchasesRequest: (purchaseId) => dispatch(deletePurchasesRequest(purchaseId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'request'}
  ])) (PurchasesRequestManagement)