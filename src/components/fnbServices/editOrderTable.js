import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updateOrderType,insertOrderType,deleteOrderType} from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
import {updateOrderType1,insertOrderType1,deleteOrderType1} from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
// import {insertOrderType} from '../../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
// import {deleteOrderType} from '../../../redux/actions/FnBServiceActions/FoodOrderTypeActions'


 function EditOrderTable(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
     
      { title: 'ID', field: 'orId'},
      { title: 'TableNO', field: 'tableNO',   filtering: false},
      {
        title: 'RoomNO',
        field: 'room',
      },
      {
        title: 'Description',
        field: 'descriptions',
        filtering: false,
      },
      {
        title: 'Status',
        field: 'status',
        lookup: { 1: 'done', 2: 'in pogress' },
      },
      // { title: 'DateAndTime', field: 'dateAndTime', type :'datetime',  filtering: false},
      // { title: 'TotalAmount', field: 'totalAmount',  type :'numeric' , filtering: false},
      // { title: 'ID', field: 'Proid'}, //defaultGroupOrder: 0 
      // { title: 'Name', field: 'ProName'},
      // { title: 'Quntity', field: 'quntity'/*, type :'numeric'*/, filtering: false },
      // { title: 'Amount', field: 'Amount'/*, type :'numeric'*/ , filtering: false},
    ]); 
    
    const Order = useSelector(state => state.firestore.ordered.foodOrder)
    const data = Order ? (Order.map(order => ({...order}))) : (null)
    const table = data ? (
        <MaterialTable
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
                console.log(newData,oldData)
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
        options={{
            filtering: true

          }}
      />

      
    ) : (<div>Loading</div>)


    // const { useState } = React;
    const [columns1, setColumns1] = useState([
     
      { title: 'ID', field: 'orId'},
     
      { title: 'DateAndTime', field: 'dateAndTime', type :'datetime',  filtering: false},
      // { title: 'TotalAmount', field: 'totalAmount',  type :'numeric' , filtering: false},
      { title: 'ProductID', field: 'Proid'}, //defaultGroupOrder: 0 
      { title: 'ProductName', field: 'ProName'},
      { title: 'Quntity', field: 'quntity'/*, type :'numeric'*/, filtering: false },
      { title: 'Amount', field: 'Amount'/*, type :'numeric'*/ , filtering: false},
    ]); 
    
    const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
    const data1 = OrderPro ? (OrderPro.map(OrderPro => ({...OrderPro}))) : (null)
    const table1 = data1 ? (
        <MaterialTable
        title="Editable Preview"
        columns={columns1}
        data={data1}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertOrderType1(newData);
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
                 props.updateOrderType1(newData)
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
                 props.deleteOrderType1(oldData.id)
                resolve()
              }, 1000)
            }),
        }}
        options={{
            filtering: true

          }}
      />

      
    ) : (<div>Loading</div>)

  
    return(
        <div>
             {table}
             {table1}
        </div>
       
        )
  }
 
const mapDispatchToProps = (dispatch) => {
    return {
         updateOrderType: (payload) => dispatch(updateOrderType(payload)),
         insertOrderType: (payload) => dispatch(insertOrderType(payload)),
         deleteOrderType: (payload) => dispatch(deleteOrderType(payload)),
         updateOrderType1: (payload1) => dispatch(updateOrderType1(payload1)),
         insertOrderType1: (payload1) => dispatch(insertOrderType1(payload1)),
         deleteOrderType1: (payload1) => dispatch(deleteOrderType1(payload1))
    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'foodOrder'},
    {collection: 'orderProducts'}
  ])) (EditOrderTable)