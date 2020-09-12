import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {updatePettyRequest} from '../../../redux/actions/financeActions/PettyRequestActions'
import {insertPettyRequest} from '../../../redux/actions/financeActions/PettyRequestActions'
import {deletePettyRequest} from '../../../redux/actions/financeActions/PettyRequestActions'

 function PettyRequest(props) {
 
    const { useState } = React;
    /*const [columns, setColumns] = useState([
      { title: 'Voucher No', field: 'voucherNo' },
      //{ title: 'Date', field: 'date' },
      { title: 'Requested By', field: 'requestedBy'},
      { title: 'Department', field: 'department'},
      { title: 'Description', field: 'description' },
      { title: 'Requested Amount', field: 'requestedAmount'},
      { title: 'Status', field: 'status'},
    ]); */
    const [columns, setColumns] = useState([
      { title: 'Voucher No', field: 'voucherNo' },
      //{ title: 'Date', field: 'date' },
      { title: 'Requested By', field: 'requestedBy'},
      { title: 'Department', field: 'department', lookup: 
      {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
      { title: 'Description', field: 'description' },
      { title: 'Requested Amount', field: 'requestedAmount'},
      { title: 'Status', field: 'status', lookup: { 33: 'Requested', 34: 'Pending', 35: 'Rejected', 36: 'Accepted', 37: 'Issued' }},
    ]);
    const room = useSelector(state => state.firestore.ordered.pettycashRequest)
    const data = room ? (room.map(room => ({...room}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Petty Cash Requests"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertPettyRequest(newData);
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                //setData([...dataUpdate]);
                console.log(newData,oldData)
                props.updatePettyRequest(newData)
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
                props.deletePettyRequest(oldData.id)
                resolve()
              }, 1000)
            }),
        }}
      />
    ) : (<div>Loading</div>)


  

  
    return(
        <div>
             {table}
        </div>
       
        )
  }

  
const mapDispatchToProps = (dispatch) => {
    return {
        updatePettyRequest: (payload) => dispatch(updatePettyRequest(payload)),
        insertPettyRequest: (payload) => dispatch(insertPettyRequest(payload)),
        deletePettyRequest: (voucherNo) => dispatch(deletePettyRequest(voucherNo))


    }
}

  export default compose(connect(null, mapDispatchToProps),firestoreConnect([
    {collection: 'pettycashRequest'}
  ])) (PettyRequest)

  //export default PettyRequest