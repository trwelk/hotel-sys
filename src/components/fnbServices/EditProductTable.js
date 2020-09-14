
import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import { updateProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
import { insertProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
import { deleteProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'

function EditProductTable(props) {

  const { useState } = React;
  const [columns, setColumns] = useState([
    { title: 'ProductID', field: 'id' }, 
    { title: 'ID', field: 'orderNo' },
    { title: 'ProductName', field: 'ProName' },
    { title: 'Quantity', field: 'quantity', type :'numeric', filtering: false },
    { title: 'Amount', field: 'amount', type :'numeric', filtering: false },

  ]);
  const orderNo = props.orderNo
  const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
  const datacopy = OrderPro ? (OrderPro.map(OrderPro => ({ ...OrderPro }))) : (null)
  const data = datacopy ? (datacopy.filter(data => data.orderNo == orderNo)) : datacopy
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
              props.insertProductType(newData);
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
              props.updateProductType(newData)
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
              props.deleteProductType(oldData.id)
              resolve()
            }, 1000)
          }),
      }}
      options={{
          filtering: true
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
    updateProductType: (payload) => dispatch(updateProductType(payload)),
    insertProductType: (payload) => dispatch(insertProductType(payload)),
    deleteProductType: (orderId) => dispatch(deleteProductType(orderId))


  }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  { collection: 'orderProducts' }
]))(EditProductTable)
// ------------------------------------------------------------------------------
// import React from 'react'
// import MaterialTable from 'material-table'
// import { firestoreConnect } from 'react-redux-firebase';
// import { useSelector, connect } from 'react-redux';
// import { compose } from 'redux';

// import { updateProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
// import { insertProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
// import { deleteProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'

// function EditProductTable(props) {

//   const { useState } = React;
//   const [columns, setColumns] = useState([
//     { title: 'ProductID', field: 'id' }, // defaultGroupOrder: 0 
//     { title: 'ProductName', field: 'ProName' },
//     { title: 'Quntity', field: 'quntity', type :'numeric', filtering: false },
//     { title: 'Amount', field: 'amount', type :'numeric', filtering: false },

//   ]);
//   const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
//   const data = OrderPro ? (OrderPro.map(OrderPro => ({ ...OrderPro }))) : (null)
//   const table = data ? (
//     <MaterialTable style={{ padding: "0px" }}
//       title="Editable Preview"
//       columns={columns}
//       data={data}
//       editable={{
//         // onRowAdd: newData =>
//         //   new Promise((resolve, reject) => {
//         //     setTimeout(() => {
//         //       //setData([...data, newData]);
//         //       props.insertOrderType(newData);
//         //       resolve();
//         //     }, 1000)
//         //   }),
//         onRowUpdate: (newData, oldData) =>
//           new Promise((resolve, reject) => {
//             setTimeout(() => {
//               const dataUpdate = [...data];
//               const index = oldData.tableData.id;
//               dataUpdate[index] = newData;
//               //setData([...dataUpdate]);
//               console.log(newData, oldData)
//               props.updateProductType(newData)
//               resolve();
//             }, 1000)
//           }),
//         onRowDelete: oldData =>
//           new Promise((resolve, reject) => {
//             setTimeout(() => {
//               const dataDelete = [...data];
//               const index = oldData.tableData.id;
//               dataDelete.splice(index, 1);
//               //setData([...dataDelete]);
//               console.log(oldData)
//               props.deleteProductType(oldData.id)
//               resolve()
//             }, 1000)
//           }),
//       }}
//       options={{
//           filtering: true
//           }}
//     />
//   ) : (<div>Loading</div>)





//   return (
//     <div style={{ padding_left: "5px" }}>
//       {table}
//     </div>

//   )
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateProductType: (payload) => dispatch(updateProductType(payload)),
//     insertProductType: (payload) => dispatch(insertProductType(payload)),
//     deleteProductType: (orderId) => dispatch(deleteProductType(orderId))


//   }
// }
// export default compose(connect(null, mapDispatchToProps), firestoreConnect([
//   { collection: 'orderProducts' }
// ]))(EditProductTable)
