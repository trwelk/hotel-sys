
import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import jsPdf from 'jspdf'
import 'jspdf-autotable'

import { updateProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
import { insertProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
import { deleteProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'

function EditProductTable(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open ,error} = state;

  // const productsDb = useSelector(state => state.firestore.ordered.product)
  //   const products = productsDb ? (productsDb.map(product => ({...product}))) : (null)
  // const productSelector = products ? (products.map((product,index) => {
  //   return   {index:product.ProName,}
  // })) :(null)

  // const customersDb = useSelector(state => state.firestore.ordered.customer )
  //   const customers = customersDb ? (customersDb.map(customer => ({...customer}))) : (null)
  // const customerSelector = customers ? (customers.map((customer,index) => {
  //   return  <MenuItem key={index} value={customer.id}>{customer.firstName + ' ' + customer.lastName}</MenuItem>
  // })) :(null)
  
  // .collection('product').get().then((snapshot) =>{
  //   console.log(snapshot.docs);
  // })
  const { useState } = React;
  const orderNo = props.orderNo
  // const products = useSelector(state => state.firestore.ordered.products)
  // const datacopy1 = products ? (products.map(products => ({ ...products }))) : (null)
 
  // db.collection('product').get().then((snapshot)=>{
    
  //   snapshot.docs.forEach(doc=>{
  //      console.log(doc.data());
    
  //   })
  // })

  // const item = useSelector(state => state.firestore.ordered.foodOrder)
  // const details = item ? (item.map(items => ({...items}))) : (null)

  //     // let name 
  //     let id 
     
  //     // var options= { };
  // if(details){
  //     for (let index = 0; index < details.length; index++) {
  //       // name.push(details[index].orderNo);
  //       //   id.push(details[index].id); 
  //       //   options={details.id:details.ProName};
  //         id=details[index].orderNo;
  //     }
  //     // let num =0006+1;
  //     // id='O'+num;
  //     const zeroPad = (num, places) => String(num).padStart(places, '0')
  //     id=id.substr(1,4);
  //     id=parseInt(id);
  //     id = id +1;
  //     // let no=id.length;
  //     id=zeroPad(id, 5)
  //     id='O'+id;
  //     // zeroPad(id, no);
  //     // id = id +1;
  //     alert(JSON.stringify(id));
  // }


  const [columns, setColumns] = useState([

    { title: 'orderProductID', field: 'OPId',editable: 'never'
    // initialEditValue: 'orderNo+id'
  },
  { title: 'ID', field: 'orderNo',initialEditValue:orderNo ,editable: 'never'},
    { title: 'ProductName', field: 'ProName'},//lookup:{productSelector}lookup:{}
    { title: 'ProductID', field: 'id' }, 
    { title: 'Quantity', field: 'quantity', type :'numeric', filtering: false },
    { title: 'Volume', field: 'volume', filtering: false ,initialEditValue:0},
    { title: 'Amount', field: 'amount', type :'numeric', filtering: false },
  ]);
  // const [column, setColumn] = useState([
  //   { title: 'ProductName', field: 'ProName'},
  //   { title: 'ProductID', field: 'id' }, 
  //   { title: 'Price', field: 'price' },
  //   // lookup: { 1: 'done', 2: 'in pogress' },
  // const OrderPros = useSelector(state => state.firestore.ordered.orderProducts)
  // const datacopy = OrderPros ? (OrderPros.map(OrderPros => ({ ...OrderPros }))) : (null)
  // const OrderPro = datacopy ? (datacopy.filter(data => data.orderNo == orderNo)) : datacopy
  
  // const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
  // const datacopy = OrderPro ? (OrderPro.map(OrderPro => ({ ...OrderPro }))) : (null)
  // const data = datacopy ? (datacopy.filter(data => data.orderNo == orderNo)) : datacopy
  
  // const  exportPdf = () =>{
  //   let doc = new jsPdf('p', 'pt');

  //   let Row=[];
  //   let A = [['product Name','quantity','amount']];
  //   let re = data;

  //   for(let item = 0;item < re.length;item++){
  //     A.push([re[item].ProName,re[item].quantity,re[item].amount])
  //   }

  //   for(let i=0; i<A.length; i++){
  //     if(i==0)
  //       Row.push(A[i].join(" "));
  //     else
  //     Row.push(A[i].join("    "));
  //   }

  //   doc.text(250,50,"bill  genarte");

  //   let y = 100;
  //   for(let j=0;j<Row.length;j++){
  //     doc.text(20,y,Row[j]);
  //     if(j==0)
  //       y = y + 20;
  //     y = y + 20;
  //   }

  //   doc.setFont('courier');
  //   doc.text(200,(y+50),"Generated By HotelSys");
  //   doc.save("bill.pdf");
    
  // }

  
  
  
  // alert(JSON.stringify(data));
  // const products = useSelector(state => state.firestore.ordered.product)
  // const producteSelector = products ? (products.map(products => ({ ...products }))) : (null)
  // alert(JSON.stringify(producteSelector));
  
//  const Products = product ?(): (null)
// const Products = useSelector(state => state.firestore.ordered.product )
// const ProductsSelector = Products ? (Products.map((C) => {
//   return  <MenuItem value={product.id}>{product.name}</MenuItem>
// })) :(null)
  // ------------------new ----------------

 
  const validateData___  = (data) => {
    if(data.id == null || data.id == ""){
      return "Field ID Cannot be null"

    }
    else if(data.orderNo == null || data.orderNo == ""){
      return "Field ID Cannot be null"

    }
    else if(data.id.length != 5 ){
      return "Field ID sould contain 5 characters"

    }
    else if(data.ProName == null || data.ProName == ""){
      return "Field Name Cannot be null"
    }
    else if((data.quantity == null || data.quantity == "") && (data.volume == null || data.volume == "") ){
      return "Field quantity Cannot be null"
    }
    else if(data.amount == null || data.amount == ""){
      return "Field amount Cannot be null"
    }
    else
    return null;
  }

  
  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
 
  
// const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
//   const data = OrderPro ? (OrderPro.map(OrderPro => ({ ...OrderPro }))) : (null)

  // const orderNo = props.orderNo
  const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
  const datacopy = OrderPro ? (OrderPro.map(OrderPro => ({ ...OrderPro }))) : (null)
  const data = datacopy ? (datacopy.filter(data => data.orderNo == orderNo)) : datacopy
  const table = data ? (
    
    <MaterialTable style={{ padding: "0px" }}
      title="Editable Preview"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
        
          new Promise((resolve, reject) => {
            data.OPId = data.id + data.orderNo;
            newData.OPId = newData.id + newData.orderNo;
            const error = validateData___(newData);
            if (error != null){
              setState({ ...state, open: true,error:error });
              reject();
            }
            else{
              setTimeout(() => {
                console.log(data)
                // alert(JSON.stringify(newData.OPId));
                props.insertProductType(newData);
                resolve();
              }, 1000)
            }
            // setTimeout(() => {
            //   //setData([...data, newData]);
            //   resolve();
            // }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            // newData.OPId = newData.id + newData.orderNo;
            const error = validateData___(newData);
            if (error != null){
              reject();
              setState({ ...state, open: true,error:error });
            }
            else{
              setTimeout(() => {
                const dataUpdate = [...data];
              const index = oldData.tableData.OPId;
              dataUpdate[index] = newData;
              //setData([...dataUpdate]);
              console.log(newData, oldData)
              props.updateProductType(newData)
              resolve();
              }, 1000)
            }


            // setTimeout(() => {
            //   const dataUpdate = [...data];
            //   const index = oldData.tableData.id;
            //   dataUpdate[index] = newData;
            //   //setData([...dataUpdate]);
            //   console.log(newData, oldData)
            //   props.updateProductType(newData)
            //   resolve();
            // }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.OPId;
              dataDelete.splice(index, 1);
              //setData([...dataDelete]);
              console.log(oldData)
              props.deleteProductType(oldData)
              resolve();
            }, 1000)
          }),
      }}
      options={{
          filtering: true,
          exportButton: true,
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
            borderBottom: '1px solid #333',
          width: '100px',
          boxShadow: "0 10px 5px -2px #888"
          }
          }}
    />
  ) : (<div>Loading</div>)

  const feedBackToast =  (<Snackbar 
    autoHideDuration={200000}
    anchorOrigin={{ vertical, horizontal }}
    open={open}
    onClose={handleClose}
    key={vertical + horizontal}
    >
        <div >

      <Alert variant="filled" severity="error" style={{display: "flex",alignItems: "center"}}>
      <h3>{error}</h3>
      
      </Alert>
      </div>
    </Snackbar>)





  return (
    <div style={{ padding_left: "5px" }}>
      {table}
      {feedBackToast}
      
    </div>

  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductType: (payload) => dispatch(updateProductType(payload)),
    insertProductType: (payload) => dispatch(insertProductType(payload)),
    deleteProductType: (orderId) => dispatch(deleteProductType(orderId))
  }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  { collection: 'orderProducts' }
]))(EditProductTable)
// ------------------------------------------------------------------------------
// import React from 'react'
// import MaterialTable from 'material-table'
// import { firestoreConnect } from 'react-redux-firebase';
// import { useSelector, connect } from 'react-redux';
// import { compose } from 'redux';

// import { updateProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
// import { insertProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'
// import { deleteProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'

// function EditProductTable(props) {

//   const { useState } = React;
//   const [columns, setColumns] = useState([
//     { title: 'ProductID', field: 'id' }, // defaultGroupOrder: 0 
//     { title: 'ProductName', field: 'ProName' },
//     { title: 'Quntity', field: 'quntity', type :'numeric', filtering: false },
//     { title: 'Amount', field: 'amount', type :'numeric', filtering: false },

//   ]);
//   const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
//   const data = OrderPro ? (OrderPro.map(OrderPro => ({ ...OrderPro }))) : (null)
//   const table = data ? (
//     <MaterialTable style={{ padding: "0px" }}
//       title="Editable Preview"
//       columns={columns}
//       data={data}
//       editable={{
//         // onRowAdd: newData =>
//         //   new Promise((resolve, reject) => {
//         //     setTimeout(() => {
//         //       //setData([...data, newData]);
//         //       props.insertOrderType(newData);
//         //       resolve();
//         //     }, 1000)
//         //   }),
//         onRowUpdate: (newData, oldData) =>
//           new Promise((resolve, reject) => {
//             setTimeout(() => {
//               const dataUpdate = [...data];
//               const index = oldData.tableData.id;
//               dataUpdate[index] = newData;
//               //setData([...dataUpdate]);
//               console.log(newData, oldData)
//               props.updateProductType(newData)
//               resolve();
//             }, 1000)
//           }),
//         onRowDelete: oldData =>
//           new Promise((resolve, reject) => {
//             setTimeout(() => {
//               const dataDelete = [...data];
//               const index = oldData.tableData.id;
//               dataDelete.splice(index, 1);
//               //setData([...dataDelete]);
//               console.log(oldData)
//               props.deleteProductType(oldData.id)
//               resolve()
//             }, 1000)
//           }),
//       }}
//       options={{
//           filtering: true
//           }}
//     />
//   ) : (<div>Loading</div>)





//   return (
//     <div style={{ padding_left: "5px" }}>
//       {table}
//     </div>

//   )
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateProductType: (payload) => dispatch(updateProductType(payload)),
//     insertProductType: (payload) => dispatch(insertProductType(payload)),
//     deleteProductType: (orderId) => dispatch(deleteProductType(orderId))


//   }
// }
// export default compose(connect(null, mapDispatchToProps), firestoreConnect([
//   { collection: 'orderProducts' }
// ]))(EditProductTable)
