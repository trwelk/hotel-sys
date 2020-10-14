// import React from 'react'
// import MaterialTable from 'material-table'
// import { useSelector, connect } from 'react-redux';
// import { compose } from 'redux';
// import { firestoreConnect } from 'react-redux-firebase';


//  function contractDetails(props) {
 
//     const { useState } = React;
//     const [columns, setColumns] = useState([
//       { title: 'Contract ID', field: 'cId' },
//       { title: 'Supplier Name', field: 'supName' },
//       { title: 'Department', field: 'department' },
//       { title: 'Date', field: 'date' },
//       { title: 'Contract Period', field: 'conPeriod' },
//       { title: 'Description', field: 'description'},
      
//     ]); 


//     const addCon = <div><addContract/></div>
//     const contract = useSelector(state => state.firestore.ordered.Contract)
//     const data = Contract ? (contract.map(sup => ({...sup}))) : (null)
//     const table = data ? (
//         <MaterialTable
//         title="Current Suppliers"
//         columns={columns}
//         data={data}
//         editable={{
//           // onRowAdd: newData =>
//           //   new Promise((resolve, reject) => {
//           //     setTimeout(() => {
//           //       props.insertSupplierInfo(newData)  
//           //       resolve();
//           //     }, 1000)
//           //   }),
//           onRowUpdate: (newData, oldData) =>
//             new Promise((resolve, reject) => {
//               setTimeout(() => {
//                 const dataUpdate = [...data];
//                 const index = oldData.tableData.sId;
//                 dataUpdate[index] = newData;
//                 console.log(newData,oldData)
//                 props.updateSupplierInfo(newData)
//                 resolve();
//               }, 1000)
//             }),
//           onRowDelete: oldData =>
//             new Promise((resolve, reject) => {
//               setTimeout(() => {
//                 const dataDelete = [...data];
//                 const index = oldData.tableData.sId;
//                 dataDelete.splice(index, 1);
//                 console.log(oldData)
//                 props.deleteSupplierInfo(oldData.sId)
//                 resolve()
//               }, 1000)
//             }),
//         }}
//       />
//     ) : (<div>Loading</div>)


  

  
//     return(
//         <div>
//              {table}
//         </div>
       
//         )
//   }
 
// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateContractInfo: (payload) => dispatch(updateContractInfo(payload)),
//         insertContractInfo: (payload) => dispatch(insertContractInfo(payload)),
//         deleteContractInfo: (supplierId) => dispatch(deleteContractInfo(supplierId))


//     }
// }
//   export default compose(connect(null,mapDispatchToProps),firestoreConnect([
//     {collection: 'contract'}
//   ])) (contractDetails)