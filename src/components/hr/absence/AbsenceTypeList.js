import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {insertAbsenceType, updateAbsenceType, deleteAbsenceType} from '../../../redux/actions/hrActions/AbsenceTypeActions'
function AbsenceTypeList(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Absence Type Id', field: 'id'
    },
      { title: 'Description', field: 'description' },
      { title: 'Limit', field: 'limit'},
      
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
                props.insertAbsenceType(newData)
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
                props.updateAbsenceType(newData)
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
                props.deleteAbsenceType(oldData.id)
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
        insertAbsenceType: (payload) => dispatch(insertAbsenceType(payload)),
        updateAbsenceType: (payload) => dispatch(updateAbsenceType(payload)),
        deleteAbsenceType: (abTypeId) => dispatch(deleteAbsenceType(abTypeId))
    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'absencetype'}
  ])) (AbsenceTypeList)