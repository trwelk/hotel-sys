import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';



import {updateUser} from '../../redux/actions/authActions/AuthActions'
import {insertUser} from '../../redux/actions/authActions/AuthActions'
import {deleteUser} from '../../redux/actions/authActions/AuthActions'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function UserTable(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'ID',field: 'id', editable:false},
      { title: 'Email', field: 'email' ,},
      { title: 'Name', field: 'name' },
      { title: 'password', field: 'pass', },
      { title: 'User Type', field: 'userType',
      lookup: { ADMIN: 'ADMIN', BASIC: 'BASIC'}},
    ]); 

    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state;


    const users = useSelector(state => state.firestore.ordered.user)    
    const data = users ? (users.map(u => ({...u,
                                            pass:"**********"}))) : (null)
    const datacopy = data
    //--------------------------------------------INTERNAL METHODS--------------------------------------------------------------------------------
    const validateData___  = (data,type) => {
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
      else if(data.phone.toString().length != 10 ){
        return "Please enter a valid phone number,Should contain 10 digits"
      }
      else if(data.email == null || data.email == ""){
        return "Field Email Cannot be null"
      }
      else if( !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)) && type == 'INSERT'){
        return "Field Email is invalid"
      }
      else if(datacopy.filter(dat => dat.id == data.id).length > 0 && type == 'INSERT'){
        console.log("some",datacopy.filter(dat => dat.id == data.id) )
        return "The User Id is already existing"
      }
      else if(datacopy.filter(dat => dat.email == data.email).length > 0 && type == 'INSERT'){
        console.log("some")
        return "The Email is already existing"
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

  const handleDemo = () => {
    props.insertUser({
      id:"demo@demo.com",
      email:"demo@demo.com",
      phone:parseInt("0771231231"),
      lastName:"lastDemo",
      firstName:"firstDemo"
    });
  }


//--------------------------------------------------------UI-ELEMENTS-------------------------------------------------------------     
const table = data ? (
        <MaterialTable style={{padding:"0px",boxShadow: "0 0 2px 2px black"}}
        title={"Users"}
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
            //   const error = validateData___(newData,"INSERT");
                if (error != null){
                  setState({ ...state, open: true,error:error });
                  reject();
                }
                else{
                  setTimeout(() => {
                    console.log(data)
                    props.insertUser({...newData,password:newData.pass});
                    resolve();
                  }, 1000)
                }
              
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData,"UPDATE");
                if (error != null){
                  reject();
                  setState({ ...state, open: true,error:error });
                }
                else{
                  setTimeout(() => {
                    props.updateUser(newData)
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
                props.deleteUser(oldData.id)
                resolve()
              }, 1000)
            }),
        }}
        options={{
          pageSize:10,
        exportButton: true,
                filtering: true,
        headerStyle: {
          backgroundColor: 'rgb(35 47 62) ',
          color: '#FFF',
          borderBottom: '1px solid #333',
        width: '100px',
    /* height: 100px; */
        boxShadow: "0 10px 5px -2px #888"
        }
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
    ) : (<div><CircularProgress style={{marginTop:"200px"}} /></div>)


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
        <div style={{padding: "20px"}}>
             {table}
             {feedBackToast}
        </div>
       
        )
  }
 
  const mapDispatchToProps = (dispatch) => {
    return {
      updateUser: (payload) => dispatch(updateUser(payload)),
      insertUser: (payload) => dispatch(insertUser(payload)),
      deleteUser: (UserId) => dispatch(deleteUser(UserId))

    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'user'}
  ])) (UserTable)