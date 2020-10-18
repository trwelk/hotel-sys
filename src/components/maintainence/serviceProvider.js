import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updateServiceProvider} from '../../redux/actions/maintainanceActions/serviceProviderActions'
import {insertServiceProvider} from '../../redux/actions/maintainanceActions/serviceProviderActions'
import {deleteServiceProvider} from '../../redux/actions/maintainanceActions/serviceProviderActions'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 function ServiceProvider(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Service Provider ID', field: 'Service_Pr_id' },
      { title: 'Company Name', field: 'Company_name' },
      { title: 'Date', field: 'date', type:'date' },
      {
        title: 'Description',
        field: 'descriptions',
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
      if(data.descriptions == null || data.descriptions == ""){
        return "Field descriptions Cannot be null"

      }
      else if(data.Company_name == null || data.Company_name == ""){
        return "Field Company_name Cannot be null"
      }
      else if(data.Service_Pr_id == null || data.Service_Pr_id == ""){
        return "Field Last Name Cannot be null"
      }
      else if(data.Service_Pr_id.toString().length != 5 ){
        return "Please enter a valid id ,Should contain 5 characters"
      }
      else
      return null;
    }
    const serviceProvider = useSelector(state => state.firestore.ordered.serviceProvider)
    const data = serviceProvider ? (serviceProvider.map(service => ({...service}))) : (null)
    const table = data ? (
        <MaterialTable
        title="service Provider Preview"
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
                    props.insertServiceProvider(newData);
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
                props.updateServiceProvider(newData)
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
                props.deleteServiceProvider(oldData.id)
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
        updateServiceProvider: (payload) => dispatch(updateServiceProvider(payload)),
        insertServiceProvider: (payload) => dispatch(insertServiceProvider(payload)),
        deleteServiceProvider: (roomId) => dispatch(deleteServiceProvider(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'serviceProvider'}
  ])) (ServiceProvider)