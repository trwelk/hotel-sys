import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {updateAssetList} from '../../../redux/actions/financeActions/AssetMgmtActions'
import {insertAssetList} from '../../../redux/actions/financeActions/AssetMgmtActions'
import {deleteAssetList} from '../../../redux/actions/financeActions/AssetMgmtActions'

 function AssetList(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Asset ID', field: 'assetID' },
        { title: 'Request ID', field: 'requestID' },
        { title: 'Department', field: 'department' },
        //{ title: 'Purchased Date', field: 'purchaseDate'},
        { title: 'Expected Life Years', field: 'lifeYears' },
        { title: 'Purchased Value', field: 'purchaseValue'},
        { title: 'Amount Depriciated', field: 'depriciation'},
        { title: 'Asset Value', field: 'assetValue'},
        //{ title: 'Total Amount', field: 'totalAmount'},
        { title: 'Asset Status', field: 'assetStatus'},
    ]); 
    const room = useSelector(state => state.firestore.ordered.assetList)
    const data = room ? (room.map(room => ({...room}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Assets List"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertAssetList(newData);
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
                props.updateAssetList(newData)
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
                props.deleteAssetList(oldData.id)
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
        updateAssetList: (payload) => dispatch(updateAssetList(payload)),
        insertAssetList: (payload) => dispatch(insertAssetList(payload)),
        deleteAssetList: (roomID) => dispatch(deleteAssetList(roomID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'assetList'}
  ])) (AssetList)


 // export default AssetList