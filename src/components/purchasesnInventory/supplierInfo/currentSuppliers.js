import React from 'react'
import MaterialTable from 'material-table'
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';
import { firestoreConnect } from 'react-redux-firebase';
import { Alert } from '@material-ui/lab';
import { insertSupplierInfo, updateSupplierInfo, deleteSupplierInfo} from '../../../redux/actions/PnIActions/SupplierList';
// import headerPnI from '../headerPnI';

 function AddSuppliers(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Supplier ID', field: 'sId' },
      { title: 'First Name', field: 'firstName' },
      { title: 'Last Name', field: 'lastName' },
      { title: 'Email', field: 'email' },
      { title: 'Phone', field: 'phone' },
      { title: 'Supplier Item Type', field: 'itemtype'},
      {title: 'Unit Price', field: 'unitprice'},
      { title: 'Location', field: 'location'},
      { title: 'Department', field: 'department'},
      { title: 'Date', field: 'date'},
    ]); 

    const validateData___ = (data) => {
      if (data.sId == null || data.sId == "") {
        return "ID field Cannot be null"
      }
      else if (data.sId.length != 5) {
        return "Field ID should contain 5 characters"
      }
      else if (data.firstName == null || data.firstName == "") {
        return "First Name Cannot be null"
      }
      else if (data.lastName == null || data.lastName == "") {
        return "Last Name cannot be  null"
      }
      else if (data.email == null || data.email == "") {
        return "Email field cannot be null"
      }
      else
        return null
    }

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });

    const { vertical, horizontal, open ,error} = state;
      
        const handleClose = () => {
          setState({ ...state, open: false });
        };
      
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

    const supplier = useSelector(state => state.firestore.ordered.supplier)
    const data = supplier ? (supplier.map(sup => ({...sup}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Current Suppliers"
        columns={columns}
        data={data}
        editable={{
          // onRowAdd: newData =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       props.insertSupplierInfo(newData)  
          //       resolve();
          //     }, 1000)
          //   }),
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
                const index = oldData.tableData.sId;
                dataUpdate[index] = newData;
                console.log(newData,oldData)
                props.updateSupplierInfo(newData)
                resolve();
              }, 1000)}
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.sId;
                dataDelete.splice(index, 1);
                console.log(oldData)
                props.deleteSupplierInfo(oldData.sId)
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
        updateSupplierInfo: (payload) => dispatch(updateSupplierInfo(payload)),
        insertSupplierInfo: (payload) => dispatch(insertSupplierInfo(payload)),
        deleteSupplierInfo: (supplierId) => dispatch(deleteSupplierInfo(supplierId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'supplier'}
  ])) (AddSuppliers)