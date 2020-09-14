import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { insertBarInvRec, deleteBarInvRec, updateBarInvRec } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions';

    function BarInventory(props) {

        const { useState } = React;
        const [columns, setColumns] = useState([
          { title: 'ID', field: 'id' },
          { title: 'Item Name', field: 'itemName' },
          { title: 'Price (LKR)', field: 'price'},
          { title: 'Quantity', field: 'qty'},
          { title: 'Last Modified', field: 'lastModified' },
          { title: 'Stock Status', field: 'stkStatus'},

        ]); 
        const barInv = useSelector(state => state.firestore.ordered.barInventory)
        const data = barInv ? (barInv.map(barInv => ({...barInv}))) : (null)
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
                    props.insertBarInvRec(newData);
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
                    props.updateBarInvRec(newData)
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
                    props.deleteBarInvRec(oldData.id)
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
            updateBarInvRec: (payload) => dispatch(updateBarInvRec(payload)),
            insertBarInvRec: (payload) => dispatch(insertBarInvRec(payload)),
            deleteBarInvRec: (InventoryId) => dispatch(deleteBarInvRec(InventoryId))    
        }
    }
      export default compose(connect(null,mapDispatchToProps),firestoreConnect([
        {collection: 'barInventory'}
      ])) (BarInventory)
