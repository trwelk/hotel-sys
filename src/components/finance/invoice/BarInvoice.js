import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {updateBarInvoice} from '../../../redux/actions/financeActions/BarInvoiceActions'
import {insertBarInvoice} from '../../../redux/actions/financeActions/BarInvoiceActions'
import {deleteBarInvoice} from '../../../redux/actions/financeActions/BarInvoiceActions'

 function BarInvoice(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Invoice No', field: 'barInvoice' },
        //{ title: 'Date', field: 'date' },
        { title: 'Prepared BY', field: 'preparedBy' },
        { title: 'Customer Type', field: 'customerType'},
        { title: 'Invoice Amount', field: 'invoiceAmount' },
        { title: 'Service Charges', field: 'serviceCharges'},
        { title: 'Payment Type', field: 'paymentType'},
        { title: 'Tax %', field: 'tax'},
        { title: 'Total Amount', field: 'totalAmount'},
       
    ]); 
    const room = useSelector(state => state.firestore.ordered.barInvoice)
    const data = room ? (room.map(room => ({...room}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Bar Invoices"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertBarInvoice(newData);
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
                props.updateBarInvoice(newData)
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
                props.deleteBarInvoice(oldData.id)
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
        updateBarInvoice: (payload) => dispatch(updateBarInvoice(payload)),
        insertBarInvoice: (payload) => dispatch(insertBarInvoice(payload)),
        deleteBarInvoice: (roomId) => dispatch(deleteBarInvoice(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'barInvoice'}
  ])) (BarInvoice)


 // export default BarInvoice