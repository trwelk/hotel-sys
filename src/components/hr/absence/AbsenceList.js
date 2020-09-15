import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {insertAbsence, updateAbsence, deleteAbsence} from '../../../redux/actions/hrActions/AbsenceTypeActions'
function AbsenceList(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Absence Id', field: 'id'},
      { title: 'Employee Name', field: 'id'},
      { title: 'From Date', field: 'id'},
      { title: 'To Date', field: 'id'},
      { title: 'Total Days', field: 'description' },
      { title: 'Absence Reason', field: 'limit'},
      { title: 'Status', field: 'id'},
      
    ]);
    const absencetypes = useSelector(state => state.firestore.ordered.absencetype)
    const data = absencetypes ? (absencetypes.map(absencetype => ({...absencetype}))) : (null)
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
                props.insertAbsence(newData)
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
                props.updateAbsence(newData)
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
                props.deleteAbsence(oldData.id)
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
        insertAbsence: (payload) => dispatch(insertAbsence(payload)),
        updateAbsence: (payload) => dispatch(updateAbsence(payload)),
        deleteAbsence: (abId) => dispatch(deleteAbsence(abId))
    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'absence'}
  ])) (AbsenceList)