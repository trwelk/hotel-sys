import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {updateLoanIssue} from '../../../redux/actions/financeActions/LoanListActions'
import {insertLoanIssue} from '../../../redux/actions/financeActions/LoanListActions'
import {deleteLoanIssue} from '../../../redux/actions/financeActions/LoanListActions'

 function LoanIssue(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Loan ID', field: 'loanID' },
        { title: 'Loan Request ID', field: 'loanRequestID' },
        //{ title: 'Request Date', field: 'reqDate' },
        //{ title: 'Issue Date', field: 'issueDate' },
        { title: 'Duration', field: 'duration'},
        //{ title: 'Final Date', field: 'finalDate' },
        { title: 'Loan Limit', field: 'loanLimit'},
        { title: 'Loan Amount', field: 'loanAmount' },
        { title: 'Amount Paid', field: 'amountPaid' },
        { title: 'Pending', field: 'pending' },

        //{ title: 'Payment Type', field: 'paymentType'},
        //{ title: 'Tax %', field: 'tax'},
        //{ title: 'Total Amount', field: 'totalAmount'},
        //{ title: 'Status', field: 'status' },
    ]); 
    const room = useSelector(state => state.firestore.ordered.loanIssue)
    const data = room ? (room.map(room => ({...room}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Loan List"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertLoanIssue(newData);
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
                props.updateLoanIssue(newData)
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
                props.deleteLoanIssue(oldData.id)
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
        updateLoanIssue: (payload) => dispatch(updateLoanIssue(payload)),
        insertLoanIssue: (payload) => dispatch(insertLoanIssue(payload)),
        deleteLoanIssue: (roomId) => dispatch(deleteLoanIssue(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'loanIssue'}
  ])) (LoanIssue)

  //export default LoanIssue