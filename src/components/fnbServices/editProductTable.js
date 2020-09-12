import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import { updateOrderType } from '../../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
import { insertOrderType } from '../../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
import { deleteOrderType } from '../../../redux/actions/FnBServiceActions/FoodOrderTypeActions'

function editProductTable(props) {

  const { useState } = React;
  const [columns, setColumns] = useState([
    { title: 'ProductID', field: 'id' }, // defaultGroupOrder: 0 
    { title: 'ProductName', field: 'ProName' },
    { title: 'Quntity', field: 'quntity'/*, type :'numeric'*/, filtering: false },
    { title: 'Amount', field: 'amount'/*, type :'numeric'*/, filtering: false },

  ]);
  const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
  const data = OrderPro ? (OrderPro.map(OrderPro => ({ ...OrderPro }))) : (null)
  const table = data ? (
    <MaterialTable style={{ padding: "0px" }}
      title="Editable Preview"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              //setData([...data, newData]);
              props.insertOrderType(newData);
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
              console.log(newData, oldData)
              props.updateOrderType(newData)
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
              props.deleteOrderType(oldData.id)
              resolve()
            }, 1000)
          }),
      }}
    />
  ) : (<div>Loading</div>)





  return (
    <div style={{ padding_left: "5px" }}>
      {table}
    </div>

  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrderType: (payload) => dispatch(updateOrderType(payload)),
    insertOrderType: (payload) => dispatch(insertOrderType(payload)),
    deleteOrderType: (orderId) => dispatch(deleteOrderType(orderId))


  }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  { collection: 'orderProducts' }
]))(editProductTable)