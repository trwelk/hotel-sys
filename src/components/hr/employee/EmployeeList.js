import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {insertEmployee, updateEmployee} from '../../../redux/actions/hrActions/EmployeeActions'
import { Card } from '@material-ui/core';
import EmployeeCard from './EmployeeCard';
function EmployeeList(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Employee ID', field: 'id' },
      { title: 'Employee Name', field: 'name' },
      { title: 'Employee Salary', field: 'Salary'},
      {
        title: 'Address',
        field: 'address',
      },
    ]); 
    const employees = useSelector(state => state.firestore.ordered.employee)
    const employeeTypes = useSelector(state => state.firestore.ordered.Type)
    const Typedata = employeeTypes ? (employeeTypes.map(type => ({...type}))) : (null)

    const data = employees ? (employees.map(employee => ({...employee}))) : (null)
    //const a,b,c ;
    const aCount =  data.filter(employee => employee.type == a).length
    const bCount =  data.filter(employee => employee.type == b).length
    const cCount =  data.filter(employee => employee.type == c).length

    const cardList = Typedata.map((type) => <EmployeeCard employeeType={type} />)   



    const table = data ? (
        <MaterialTable
        title="EmployeeList Preview"
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
                props.deleteRoomType(oldData.id)
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
    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'employee'},
    {collection: 'employeeType'}

  ])) (EmployeeList)