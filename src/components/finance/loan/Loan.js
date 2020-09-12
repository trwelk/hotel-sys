import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {updateLoanRequest} from '../../../redux/actions/financeActions/LoanRequestActions'
import {insertLoanRequest} from '../../../redux/actions/financeActions/LoanRequestActions'
import {deleteLoanRequest} from '../../../redux/actions/financeActions/LoanRequestActions'

 function Loan(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Loan Request ID', field: 'loanRequest' },
        //{ title: 'Date', field: 'date' },
        { title: 'Applied By', field: 'appliedBy' },
        { title: 'Department', field: 'department'},
        { title: 'Loan Amount', field: 'loanAmount' },
        { title: 'Duration', field: 'duration'},
        //{ title: 'Payment Type', field: 'paymentType'},
        //{ title: 'Tax %', field: 'tax'},
        //{ title: 'Total Amount', field: 'totalAmount'},
        { title: 'Status', field: 'status' },
    ]); 
    const room = useSelector(state => state.firestore.ordered.loanRequest)
    const data = room ? (room.map(room => ({...room}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Loan Requests"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertLoanRequest(newData);
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
                props.updateLoanRequest(newData)
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
                props.deleteLoanRequest(oldData.id)
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
        updateLoanRequest: (payload) => dispatch(updateLoanRequest(payload)),
        insertLoanRequest: (payload) => dispatch(insertLoanRequest(payload)),
        deleteLoanRequest: (roomId) => dispatch(deleteLoanRequest(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'loanRequest'}
  ])) (Loan)

  //export default Loan