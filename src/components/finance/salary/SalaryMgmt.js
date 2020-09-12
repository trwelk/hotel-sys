import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {updateSalary} from '../../../redux/actions/financeActions/PayrollActions'
import {insertSalary} from '../../../redux/actions/financeActions/PayrollActions'
import {deleteSalary} from '../../../redux/actions/financeActions/PayrollActions'

 function SalaryMgmt(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'Salary Rep No', field: 'salaryID' },
        { title: 'Attendance ID', field: 'attendanceID' },
        { title: 'Basic Salary', field: 'basicSalary' },
        { title: 'No Pay', field: 'noPay'},
        { title: 'OT Pay', field: 'otPay'},
        { title: 'Allowances', field: 'allowances' },
        { title: 'Service Charges', field: 'serCharges'},
        { title: 'Loan Deduction', field: 'loan'},
        { title: 'EPF', field: 'epf'},
        { title: 'Net Salary', field: 'netSalary'},
        //{ title: 'Allowances', field: 'allowances'},
        //{ title: 'Total Amount', field: 'totalAmount'},
        //{ title: 'On Loan', field: 'loan'},
    ]); 
    const room = useSelector(state => state.firestore.ordered.salaryMgmt)
    const data = room ? (room.map(room => ({...room}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Staff Payroll"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertSalary(newData);
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
                props.updateSalary(newData)
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
                props.deleteSalary(oldData.id)
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
        updateSalary: (payload) => dispatch(updateSalary(payload)),
        insertSalary: (payload) => dispatch(insertSalary(payload)),
        deleteSalary: (roomId) => dispatch(deleteSalary(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'salaryMgmt'}
  ])) (SalaryMgmt)
  

  //export default SalaryMgmt