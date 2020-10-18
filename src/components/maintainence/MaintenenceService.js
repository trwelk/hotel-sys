import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updatemaintenanceServices} from '../../redux/actions/maintainanceActions/maintainanceServicesActions'
import {insertmaintenanceServices} from '../../redux/actions/maintainanceActions/maintainanceServicesActions'
import {deletemaintenanceServices} from '../../redux/actions/maintainanceActions/maintainanceServicesActions'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 function MaintenanceServices(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Maintenance Service ID', field: 'M_Service_id' },
      { title: 'Department', field: 'Department'},
      { title: 'Type of Service', field: 'Service_type'},
      { title: 'Machine ID Number', field: 'machine_ID'},
      { title: 'Type of Machine', field: 'machine_Type'},
      { title: 'Type of Payment made', field: 'payment_type'},
      { title: 'Amount Paid', field: 'paymentMade'},
      {
        title: 'Description',
        field: 'description',
      },
    ]); 
    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });

    const { vertical, horizontal, open ,error} = state;

    const handleClose = () => {
      setState({ ...state, open: false });
    };

    const validateData___  = (data,type) => {
      if(data.paymentMade == null || data.paymentMade == ""){
        return "Field paymentMade Cannot be null"

      }
      else if(data.payment_type == null || data.payment_type == ""){
        return "Field payment_type Name Cannot be null"
      }
      else if(data.machine_Type == null || data.machine_Type == ""){
        return "Field machine_Type Cannot be null"
      }
      else if(data.machine_ID == null || data.machine_ID == ""){
        return "Field Phone Cannot be null"
      }
      else if(data.machine_ID.toString().length != 5 ){
        return "Please enter a valid id ,Should contain 5 characters"
      }
      else if(data.Service_type == null || data.Service_type == ""){
        return "Field machine_Type Cannot be null"
      }
      else if(data.Department == null || data.Department == ""){
        return "Field Department Cannot be null"
      }
      else if(data.M_Service_id == null || data.M_Service_id == ""){
        return "Field M_Service_id Cannot be null"
      }
      else
      return null;
    }

    const maintainanceServices = useSelector(state => state.firestore.ordered.maintenanceServices)
console.log(maintainanceServices)
    const data = maintainanceServices ? (maintainanceServices.map(maintainanceService => ({...maintainanceService   }))) : (null)
   const table = data ? (
        <MaterialTable
        title="Maintenance Services Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData,"INSERT");
                if (error != null){
                  setState({ ...state, open: true,error:error });
                  reject();
                }
                else{
                  setTimeout(() => {
                    console.log(data)
                    props.insertmaintenanceServices(newData);
                    resolve();
                  }, 1000)
                }
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                //setData([...dataUpdate]);
                console.log(newData,oldData)
                props.updatemaintenanceServices(newData)
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                console.log(oldData)
                props.deletemaintenanceServices(oldData.id)
                resolve()
              }, 1000)
            }),
        }}
      />
    ) : (<div>Loading</div>)


    const feedBackToast =  (<Snackbar 
      autoHideDuration={2000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>)


  
    return(
        <div>
             {table}
             {feedBackToast}
        </div>
       
        )
  }
 
const mapDispatchToProps = (dispatch) => {
    return {
        updatemaintenanceServices: (payload) => dispatch(updatemaintenanceServices(payload)),
        insertmaintenanceServices: (payload) => dispatch(insertmaintenanceServices(payload)),
        deletemaintenanceServices: (roomId) => dispatch(deletemaintenanceServices(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'maintenanceServices'}
  ])) (MaintenanceServices)