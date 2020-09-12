import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {updatePettyCash} from '../../../redux/actions/financeActions/PettyCashManagementActions'
import {insertPettyCash} from '../../../redux/actions/financeActions/PettyCashManagementActions'
import {deletePettyCash} from '../../../redux/actions/financeActions/PettyCashManagementActions'

 function PettyCashManagement(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'PCash ID', field: 'pcashID' },
      { title: 'Voucher No', field: 'voucherNo' },
      //{ title: 'Date', field: 'date' },
      { title: 'Requested Amount', field: 'requestedAmount'},
      { title: 'Issued Amount', field: 'issuedAmount'},
      { title: 'Balance Received', field: 'balanceAmount'},
      //{ title: 'Department', field: 'department'},
      //{ title: 'Description', field: 'description' },
      { title: 'Variance', field: 'variance', lookup: {33: 'Budget', 34: 'Short', 35: 'Over'}},
    ]); 
    const room = useSelector(state => state.firestore.ordered.pettycashManagement)
    const data = room ? (room.map(room => ({...room}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Petty Cash Management"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertPettyCash(newData);
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
                props.updatePettyCash(newData)
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
                props.deletePettyCash(oldData.id)
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
        updatePettyCash: (payload) => dispatch(updatePettyCash(payload)),
        insertPettyCash: (payload) => dispatch(insertPettyCash(payload)),
        deletePettyCash: (voucherNo) => dispatch(deletePettyCash(voucherNo))


    }
}

  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'pettycashManagement'}
  ])) (PettyCashManagement)

  //export default PettyCashManagement