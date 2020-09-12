import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {updateFrontInvoice} from '../../../redux/actions/financeActions/FrontInvoiceActions'
import {insertFrontInvoice} from '../../../redux/actions/financeActions/FrontInvoiceActions'
import {deleteFrontInvoice} from '../../../redux/actions/financeActions/FrontInvoiceActions'

 function FrontInvoice(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Invoice No', field: 'frontInvoice' },
        //{ title: 'Date', field: 'date' },
        { title: 'Prepared BY', field: 'preparedBy' },
        { title: 'Customer Type', field: 'customerType'},
        { title: 'Reservation ID', field: 'reservationID'},
        { title: 'Guest ID', field: 'guestID' },
        { title: 'Room Charges', field: 'roomCharges'},
        { title: 'Housekeeping Charges', field: 'houseCharges'},
        { title: 'F&B Charges', field: 'fnbCharges'},
        { title: 'Shuttle Charges', field: 'shuttleCharges'},
        { title: 'Service Charges', field: 'serviceCharges'},
        { title: 'Other Charges', field: 'otherCharges'},
        { title: 'Payment Type', field: 'paymentType'},
        { title: 'Tax %', field: 'tax'},
        { title: 'Total Amount', field: 'totalAmount'},
       
    ]); 
    const room = useSelector(state => state.firestore.ordered.frontInvoice)
    const data = room ? (room.map(room => ({...room}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Front-Office Invoices"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertFrontInvoice(newData);
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
                props.updateFrontInvoice(newData)
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
                props.deleteFrontInvoice(oldData.id)
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
        updateFrontInvoice: (payload) => dispatch(updateFrontInvoice(payload)),
        insertFrontInvoice: (payload) => dispatch(insertFrontInvoice(payload)),
        deleteFrontInvoice: (roomId) => dispatch(deleteFrontInvoice(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'frontInvoice'}
  ])) (FrontInvoice)


 /// export default FrontInvoice