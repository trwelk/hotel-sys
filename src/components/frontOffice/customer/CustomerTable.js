import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import {updateRoomType} from '../../../redux/actions/frontOfficeActions/RoomTypeActions'
import {insertRoomType} from '../../../redux/actions/frontOfficeActions/RoomTypeActions'
import {deleteRoomType} from '../../../redux/actions/frontOfficeActions/RoomTypeActions'
import NewReservationForm from '../reservation/forms/NewReservationForm';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomerTable(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'ID',field: 'id',},
      { title: 'First Name', field: 'firstName' ,},
      { title: 'Last Name', field: 'lastName' },
      { title: 'Phone Number', field: 'phone' },
      { title: 'Email', field: 'email'},
    ]); 

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;


    const customers = useSelector(state => state.firestore.ordered.customer)    
    const data = customers ? (customers.map(customer => ({...customer}))) : (null)
    

    //--------------------------------------------INTERNAL METHODS--------------------------------------------------------------------------------
    const validateData___  = (data) => {
      if(data.id == null || data.id == ""){
        return "Field ID Cannot be null"

      }
      else if(data.firstName == null || data.firstName == ""){
        return "Field First Name Cannot be null"
      }
      else if(data.lastName == null || data.lastName == ""){
        return "Field Last Name Cannot be null"
      }
      else if(data.phone == null || data.phone == ""){
        return "Field Phone Cannot be null"
      }
      else if(data.email == null || data.email == ""){
        return "Field Email Cannot be null"
      }
      else
      return null;
    }



  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

//--------------------------------------------------------UI-ELEMENTS-------------------------------------------------------------     
const table = data ? (
        <MaterialTable style={{padding:"0px"}}
        title="CustomerTable Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
                if (error != null){
                  setState({ ...state, open: true,error:error });
                  reject();
                }
                else{
                  setTimeout(() => {
                    console.log(data)
                    props.insertRoomType(newData);
                    resolve();
                  }, 1000)
                }
              
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
                if (error != null){
                  reject();
                  setState({ ...state, open: true,error:error });
                }
                else{
                  setTimeout(() => {
                    props.updateRoomType(newData)
                    resolve();
                  }, 1000)
                }
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                console.log(oldData)
                props.deleteRoomType(oldData.id)
                resolve()
              }, 1000)
            }),
        }}
        options={{
        headerStyle: {
          backgroundColor: '#01579b',
          color: '#FFF',
          borderBottom: '1px solid #333',
        width: '100px',
    /* height: 100px; */
        boxShadow: "0 10px 5px -2px #888"
        }
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
        <div style={{padding_left: "5px"}}>
             {table}
             {feedBackToast}
        </div>
       
        )
  }
 
  const mapDispatchToProps = (dispatch) => {
    return {
        updateRoomType: (payload) => dispatch(updateRoomType(payload)),
        insertRoomType: (payload) => dispatch(insertRoomType(payload)),
        deleteRoomType: (roomId) => dispatch(deleteRoomType(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'customer'}
  ])) (CustomerTable)