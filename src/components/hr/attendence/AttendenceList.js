import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {insertAttendence, updateAttendence, deleteAttendence} from '../../../redux/actions/hrActions/AttendenceActions'
function AttendenceList(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Attendence Id', field: 'id'},
      { title: 'Date', field: 'id'},
      { title: 'Employee Id', field: 'id'},
      { title: 'Clock In', field: 'id'},
      { title: 'Clock Out', field: 'description' },
      { title: 'Total Working Hours', field: 'limit'}
      
    ]);
    const attendences = useSelector(state => state.firestore.ordered.attendence)
    const data = attendences ? (attendences.map(attendence => ({...attendence}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Absence Types"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertAttendence(newData)
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
                props.updateAttendence(newData)
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
                props.deleteAttendence(oldData.id)
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
        insertAttendence: (payload) => dispatch(insertAttendence(payload)),
        updateAttendence: (payload) => dispatch(updateAttendence(payload)),
        deleteAttendence: (attId) => dispatch(deleteAttendence(attId))
    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'attendence'}
  ])) (AttendenceList)