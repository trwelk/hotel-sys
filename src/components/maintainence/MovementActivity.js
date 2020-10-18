import React from 'react'
import Button from '@material-ui/core/Button';
import MaterialTable, { MTableToolbar } from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updatemovementActivity} from '../../redux/actions/maintainanceActions/movementActivityActions'
import {insertmovementActivity} from '../../redux/actions/maintainanceActions/movementActivityActions'
import {deletemovementActivity} from '../../redux/actions/maintainanceActions/movementActivityActions'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 function MovementActivity(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'ID', field: 'Visit_id' },
        { title: 'Name', field: 'Name'},
        { title: 'National ID number', field: 'Nic_no'},
        { title: 'Contact Number', field: 'Contact_no'},
        { title: 'Guest Type', field: 'guest_type', lookup: { GUEST: 'GUEST', VISITOR: 'VISITOR'}},
        { title: 'Number of Guests', field: 'no_of_guests'},
        { title: 'Vehicle Number', field: 'vehicle_no'},
      {
        title: 'Description',
        field: 'descriptions',
      },
    ]); 
    const handleDemo = () => {
      props.insertmovementActivity({
        Visit_id:"demo@demo.com",
        Name:"demoName",
        Nic_no:"1542809v",
        Contact_no:"0123123123",
        guest_type:"GUEST",
        no_of_guests:2,
        descriptions:"descdemo"
      });
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

    const validateData___  = (data,type) => {
      if(data.vehicle_no == null || data.vehicle_no == ""){
        return "Field vehicle_no Cannot be null"

      }
      else if(data.no_of_guests == null || data.no_of_guests == ""){
        return "Field no_of_guests Name Cannot be null"
      }
      else if(data.guest_type == null || data.guest_type == ""){
        return "Field guest_type Cannot be null"
      }
      else if(data.Contact_no == null || data.Contact_no == ""){
        return "Field Phone Cannot be null"
      }
      else if(data.Contact_no.toString().length != 10){
        return "Please provide a valid contact number"
      }
      else if(data.Nic_no == null || data.Nic_no == ""){
        return "Field no_of_guests Name Cannot be null"
      }
      else if(data.Nic_no.toString().length != 10){
        return "Please provide a valid nic number"
      }
      else if(data.Name == null || data.Name == ""){
        return "Field guest_type Cannot be null"
      }
      else if(data.Visit_id == null || data.Visit_id == ""){
        return "Field Phone Cannot be null"
      }
      else if(data.Visit_id.toString().length != 5 ){
        return "Please enter a valid id ,Should contain 5 characters"
      }

      else
      return null;
    }
    const movementActivity = useSelector(state => state.firestore.ordered.movementActivity)
    const data = movementActivity ? (movementActivity.map(movementActivity => ({...movementActivity}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Movement Activity Preview"
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
                    props.insertmovementActivity(newData);
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
                props.updatemovementActivity(newData)
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
                props.deletemovementActivity(oldData.id)
                resolve()
              }, 1000)
            }),
        }}
      components={{
        Toolbar: props => (
          <div>
            <MTableToolbar {...props} />
            <div style={{padding: '0px 10px'}}>
              <Button onClick={handleDemo}>Demo</Button>
          </div>
          </div>
        ),
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
        updatemovementActivity: (payload) => dispatch(updatemovementActivity(payload)),
        insertmovementActivity: (payload) => dispatch(insertmovementActivity(payload)),
        deletemovementActivity: (roomId) => dispatch(deletemovementActivity(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'movementActivity'}
  ])) (MovementActivity)