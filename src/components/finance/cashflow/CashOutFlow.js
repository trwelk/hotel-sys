import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {updateCashOut} from '../../../redux/actions/financeActions/CashOutActions'
import {insertCashOut} from '../../../redux/actions/financeActions/CashOutActions'
import {deleteCashOut} from '../../../redux/actions/financeActions/CashOutActions'

 function CashOutFlow(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Outflow No', field: 'outflowID' },
        //{ title: 'Date', field: 'date' },
        { title: 'Department', field: 'department', lookup : 
        {33:'Front-Office', 34: 'Finance', 35: 'Housekeeping', 36: 'Purchases', 37: 'HR', 38: 'F&B Service', 39: 'F&B Production', 40: 'Maintenance'}},
        { title: 'Description', field: 'description'},
        { title: 'Category', field: 'category', lookup : {30: 'Administration', 31: 'Operations', 33: 'Financial', 34: 'Other'}},
        { title: 'Sub Category', field: 'subCategory', lookup :{30: 'Payable', 31: 'Investment', 32: 'Other'}},
        { title: 'Inoivce Amount', field: 'invoiceAmount' },
        //{ title: 'OT Pay', field: 'otPay'},
        //{ title: 'Allowances', field: 'allowances' },
        //{ title: 'Service Charges', field: 'serCharges'},
        //{ title: 'Loan Deduction', field: 'loan'},
        //{ title: 'EPF', field: 'epf'},
        //{ title: 'Net Salary', field: 'netSalary'},
        //{ title: 'Allowances', field: 'allowances'},
        //{ title: 'Total Amount', field: 'totalAmount'},
        //{ title: 'On Loan', field: 'loan'},
    ]); 
    const cashout = useSelector(state => state.firestore.ordered.cashOutflow)
    const data = cashout ? (cashout.map(cashout => ({...cashout}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Cash Outflows"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertCashOut(newData);
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
                props.updateCashOut(newData)
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
                props.deleteCashOut(oldData.id)
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
        updateCashOut: (payload) => dispatch(updateCashOut(payload)),
        insertCashOut: (payload) => dispatch(insertCashOut(payload)),
        deleteCashOut: (outflowID) => dispatch(deleteCashOut(outflowID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'cashOutflow'}
  ])) (CashOutFlow)


 // export default CashOutFlow