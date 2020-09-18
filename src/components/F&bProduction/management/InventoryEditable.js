import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { insertInvRec, deleteInvRec, updateInvRec } from '../../../redux/actions/fnbProductionActions/fnbInventoryActions';

    function InventoryEditable(props) {

        const { useState } = React;
        const [columns, setColumns] = useState([
          { title: 'ID', field: 'id' },
          { title: 'Item Name', field: 'itemName' },
          { title: 'Price (LKR)', field: 'price'},
          { title: 'Quantity', field: 'qty'},
          { title: 'Expiry Date', field: 'expDate', type:'date'},
          { title: 'Last Modified', field: 'lastModified' , type:'date', editable:'never'},
          { title: 'Stock Status', field: 'stkStatus', lookup: { 1: 'Out of Stock', 2: 'Low', 3: 'Adequate', 4: 'High' }},

        ]); 
        const fnbInv = useSelector(state => state.firestore.ordered.fnbInventory)
        const data = fnbInv ? (fnbInv.map(fnb_Inv => ({...fnb_Inv}))) : (null)
        const table = data ? (
            <MaterialTable
            title="Inventory List"
            columns={columns}
            data={data}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    // setData([...data, newData]);
                    props.insertInvRec(newData);
                    
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
                    props.updateInvRec(newData)
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
                    props.deleteInvRec(oldData.id)
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
            updateInvRec: (payload) => dispatch(updateInvRec(payload)),
            insertInvRec: (payload) => dispatch(insertInvRec(payload)),
            deleteInvRec: (InventoryId) => dispatch(deleteInvRec(InventoryId))    
        }
    }
      export default compose(connect(null,mapDispatchToProps),firestoreConnect([
        {collection: 'fnbInventory'}
      ])) (InventoryEditable)
