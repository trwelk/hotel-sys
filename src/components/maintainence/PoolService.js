import React from 'react'
import Button from '@material-ui/core/Button';
import MaterialTable, { MTableToolbar } from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updatepoolService} from '../../redux/actions/maintainanceActions/PoolServiceActions'
import {deletepoolService} from '../../redux/actions/maintainanceActions/PoolServiceActions'
import {insertpoolService} from '../../redux/actions/maintainanceActions/PoolServiceActions'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 function PoolService(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'ID', field: 'id' },
      { title: 'Payment', field: 'paymentMade' },
      { title: 'Compapny', field: 'company'},
      { title: 'Agent', field: 'agent'},
      { title: 'Service Type', field: 'sType',lookup: { Chlorification: 'Chlorification', Cleaning: 'Cleaning'}},
      {
        title: 'Description',
        field: 'descriptions',
      },
    ]); 

    const handleDemo = () => {
      props.insertpoolService ({
        id:"demo@demo.com",
        paymentMade:"123",
        company:"demoCompany",
        agent:"agent007",
        descriptions:"GUEST",
        sType:'Cleaning',
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
      if(data.descriptions == null || data.descriptions == ""){
        return "Field descriptions Cannot be null"

      }
      else if(data.company == null || data.company == ""){
        return "Field company Name Cannot be null"
      }
      else if(data.paymentMade == null || data.paymentMade == ""){
        return "Field Last Name Cannot be null"
      }
      else if(data.id == null || data.id == ""){
        return "Field Phone Cannot be null"
      }
      else if(data.agent == null || data.agent == ""){
        return "Field agent Cannot be null"
      }
      else if(data.id.toString().length != 5 ){
        return "Please enter a valid id ,Should contain 5 characters"
      }
      else
      return null;
    }

    const poolService = useSelector(state => state.firestore.ordered.poolService)
    const data = poolService ? (poolService.map(poolService => ({...poolService}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Pool Service Preview"
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
                    props.insertpoolService(newData);
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
                props.updatepoolService(newData)
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
                props.deletepoolService(oldData.id)
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
        updatepoolService: (payload) => dispatch(updatepoolService(payload)),
        insertpoolService: (payload) => dispatch(insertpoolService(payload)),
        deletepoolService: (roomId) => dispatch(deletepoolService(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'poolService'}
  ])) (PoolService)