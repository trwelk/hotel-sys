import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {updateCashIn} from '../../../redux/actions/financeActions/CashInActions'
import {insertCashIn} from '../../../redux/actions/financeActions/CashInActions'
import {deleteCashIn} from '../../../redux/actions/financeActions/CashInActions'

 function CashInflow(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Inflow No', field: 'inflowID' },
        //{ title: 'Date', field: 'date' },
        { title: 'Description', field: 'description'},
        { title: 'Category', field: 'category', lookup : {33: 'Front-Office', 34: 'Bar', 35:'Other'}},
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
    const cashin = useSelector(state => state.firestore.ordered.cashInflow)
    const data = cashin ? (cashin.map(cashin  => ({...cashin }))) : (null)
    const table = data ? (
        <MaterialTable
        title="Cash Inflows"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertCashIn(newData);
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
                props.updateCashIn(newData)
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
                props.deleteCashIn(oldData.id)
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
        updateCashIn: (payload) => dispatch(updateCashIn(payload)),
        insertCashIn: (payload) => dispatch(insertCashIn(payload)),
        deleteCashIn: (inflowID) => dispatch(deleteCashIn(inflowID))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'cashInflow'}
  ])) (CashInflow)


  //export default CashInflow