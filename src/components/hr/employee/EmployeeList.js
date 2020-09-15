import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import EmployeeForm from '../employee/EmployeeForm'

import {insertEmployee, updateEmployee, deleteEmployee} from '../../../redux/actions/hrActions/EmployeeActions'
function EmployeeList(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Employee ID', field: 'id' },
      { title: 'Employee Name', field: 'name' },
      { title: 'Employee Type', field: 'emptype' },
      { title: 'Department', field: 'department' },
      { title: 'Designation', field: 'designation' },
      { title: 'Joined Date', field: 'joineddate'},
      { title: 'Reports To', field: 'reportsto'},
      { title: 'Contact Number', field: 'contactnumber' },
      { title: 'Address', field: 'address' },
      { title: 'Date of Birth', field: 'dob'}
      
    ]); 
    const employees = useSelector(state => state.firestore.ordered.employee)
    const data = employees ? (employees.map(employee => ({...employee}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Employee List Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertEmployee(newData)
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
                props.updateEmployee(newData)
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
                props.deleteEmployee(oldData.id)
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
        insertEmployee: (payload) => dispatch(insertEmployee(payload)),
        updateEmployee: (payload) => dispatch(updateEmployee(payload)),
        deleteEmployee: (empId) => dispatch(deleteEmployee(empId))
    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'employee'}
  ])) (EmployeeList)