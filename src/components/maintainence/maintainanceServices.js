import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import {updatemaintainanceServices} from '../../redux/actions/maintenanceActions/maintainanceServicesActions'
import {insertmaintainanceServices} from '../../redux/actions/maintenanceActions/maintainanceServicesActions'
import {deletemaintainanceServices} from '../../redux/actions/maintenanceActions/maintainanceServicesActions'

 function maintainanceServices(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Maintenance Service ID', field: 'M_Service_id' },
      { title: 'Date Of Arrival', field: 'DateOfArrival'},
      { title: 'Date Of Next Arrival', field: 'NextArrival'},
      { title: 'Department', field: 'Department'},
      { title: 'Type of Service', field: 'Service_type'},
      { title: 'Machine ID Number', field: 'machine_ID'},
      { title: 'Type of Machine', field: 'machine_Type'},
      { title: 'Type of Payment made', field: 'payment_type'},
      { title: 'Amount Paid', field: 'paymentMade'},
      {
        title: 'Description',
        field: 'descriptions',
      },
    ]); 
    const maintainanceServices = useSelector(state => state.firestore.ordered.maintainanceServices)
    const data = maintainanceServices ? (maintainanceServices.map(maintainanceServices => ({...maintainanceServices}))) : (null)
    const table = data ? (
        <MaterialTable
        title="Maintenance Services Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertmaintainanceServices(newData);
                
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
                props.insertmaintainanceServices(newData);
                props.update(newData)
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
                props.insertmaintainanceServices(newData);
                props.delete(oldData.id)
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
        updatemaintenanceServices: (payload) => dispatch(updatemaintencaneServices(payload)),
        insertmaintenanceServices: (payload) => dispatch(insertmaintenanceServices(payload)),
        deletemaintenanceServices: (roomId) => dispatch(deletemaintenanceServices(roomId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'maintenanceServices'}
  ])) (maintenanceServices)