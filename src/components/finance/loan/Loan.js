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
        { title: 'Department', field: 'department' , lookup : 
        {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
        { title: 'Loan Amount', field: 'loanAmount' },
        { title: 'Duration', field: 'duration', lookup: {30:'3 Months', 31: '6 Months', 32:'1 Year'}},
        //{ title: 'Payment Type', field: 'paymentType'},
        //{ title: 'Tax %', field: 'tax'},
        //{ title: 'Total Amount', field: 'totalAmount'},
        { title: 'Status', field: 'status', lookup: { 33: 'Requested', 34: 'Pending', 35: 'Rejected', 36: 'Accepted', 37: 'Issued' } },
    ]); 
    const loanrq = useSelector(state => state.firestore.ordered.loanRequest)
    const data = loanrq ? (loanrq.map(loanrq => ({...loanrq}))) : (null)
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
        deleteLoanRequest: (loanReques) => dispatch(deleteLoanRequest(loanReques))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'loanRequest'}
  ])) (Loan)

  //export default Loan