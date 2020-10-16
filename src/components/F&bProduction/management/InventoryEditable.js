import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { insertInvRec, deleteInvRec, updateInvRec } from '../../../redux/actions/fnbProductionActions/fnbInventoryActions';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { Button, ButtonGroup } from '@material-ui/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


    function InventoryEditable(props) {

        const { useState } = React;
        const [columns, setColumns] = useState([
          { title: 'ID', field: 'id', editable: 'onAdd' },
          { title: 'Item Name', field: 'itemName' },
          { title: 'Unit Price (LKR)', field: 'unitPrice', type: 'numeric'},
          { title: 'Quantity', field: 'qty', type: 'numeric'},
          { title: 'Stock Value', field: 'total', editable:'never'},
          { title: 'Expiry Date', field: 'expDate', type:'date'},
          { title: 'Last Modified', field: 'lastModified' , type:'date', editable:'never', default:new Date() },
          { title: 'Stock Status', field: 'stkStatus', lookup: { 1: 'Out of Stock', 2: 'Low', 3: 'Adequate', 4: 'High' }},
        ]); 

        const validateData___  = (data) => {
          if(data.id == null || data.id == ""){
            return "Field ID Cannot be null"
      
          }
          else if(data.id.length != 5 ){
            return "Field ID sould contain 5 characters"
      
          }
          else if(data.itemName == null || data.itemName == ""){
            return "Field Item Name Cannot be null"
          }
          else if(data.unitPrice == null || data.unitPrice == ""){
            return "Field Unit Price Cannot be null"
          }
          else if(data.qty == null || data.qty == ""){
            return "Field Quantity cannot be null"
          }
          else if(data.expDate == null || data.expDate == ""){
            return "Field Expiry Date cannot be null"
          }
          else if(data.stkStatus == null || data.stkStatus == ""){
            return "Field Stock Status cannot be null"
          }          
          else
          return null;
        }
      
        const [state, setState] = React.useState({
          open: false,
          vertical: 'bottom',
          horizontal: 'right',
        });
      
        const { vertical, horizontal, open ,error} = state;
      
        const handleClose = () => {
          setState({ ...state, open: false });
        };
      
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

        // const exportCsv = () =>{
        //   let Row=[];
        //   let A = [['Item Id','Item Name','Unit Price(LKR)','In stock(kg/pkts/cans)','Total(LKR)', 'Last Modified', 'Status','Expiry Date']];
        //   let re = fnbInv;
        //   console.log(fnbInv);
        //   let Status;
        //   for(let item = 0;item < re.length;item++){
        //     switch (parseInt(re[item].stkStatus)) {
        //       case 1:
        //         Status = 'Out of Stock'
        //         break;
        //       case 2:
        //         Status = 'Low'
        //          break;
        //       case 3:
        //         Status = 'Adequate'
        //          break;
        //       case 4:
        //         Status = 'High'
        //         break;
        //       default:
        //         break;
        //     }
        //     A.push([re[item].id,re[item].itemName,re[item].unitPrice,re[item].qty,re[item].total,re[item].lastModified,Status,re[item].expDate])
        //   }
        //   console.warn(A);
        //   for(let i=0; i<A.length; i++){
        //     Row.push(A[i].join(","));
        //   }
        //   console.warn(Row);
        //   let fileString=Row.join("%0A");
        //   let a = document.createElement("a");
        //   a.href='data:attachment/csv,' + fileString;
        //   a.target="_Blank";
        //   a.download="FnBInventory.csv";
        //   document.body.appendChild(a);
        //   a.click();
      
        //   console.warn(fileString);
        // }
      
        // const exportPdf = () =>{
        //   let doc = new jsPDF('p', 'pt');
        //   let header=[['Item Id','Item Name','Unit Price(LKR)','In stock(kg/pkts/cans)','Total(LKR)', 'Last Modified', 'Status','Expiry Date']]
        //   let A = [[]];
        //   let re = fnbInv;
        //   let Status;
        //   console.log(fnbInv);
        //   for(let item = 0;item < re.length;item++){
        //     switch (parseInt(re[item].stkStatus)) {
        //       case 1:
        //         Status = 'Out of Stock'
        //         break;
        //       case 2:
        //         Status = 'Low'
        //          break;
        //       case 3:
        //         Status = 'Adequate'
        //          break;
        //       case 4:
        //         Status = 'High'
        //         break;
        //       default:
        //         break;
        //     }
        //     A.push([re[item].id,re[item].itemName,re[item].unitPrice,re[item].qty,re[item].total,re[item].lastModified,Status,re[item].expDate])
        //   }

        //   doc.text("Inventory Report",220,50);
      
        //   doc.autoTable({
        //     head: header,
        //     body: A,
        //     startY: 80,
        //     foot:[["Generated By HotelSys"]],
        //     footStyles:{halign:'center',}
        //   })          

        //   doc.save("InventoryReport.pdf");          
        // }

        const fnbInv = useSelector(state => state.firestore.ordered.fnbInventory)
        const data = fnbInv ? (fnbInv.map(fnb_Inv => ({...fnb_Inv,total:parseFloat(fnb_Inv.qty)*parseFloat(fnb_Inv.unitPrice)}))) : (null)
        const table = data ? (
          <div>
          {/* <ButtonGroup>
          <Button variant="contained" color="default" onClick={()=>exportCsv()}>
          Export as Csv
        </Button>
        <Button variant="contained" color="secondary" onClick={()=>exportPdf()}>
          Export as Pdf
        </Button>
        </ButtonGroup> */}
            <MaterialTable
            title="Inventory List"
            columns={columns}
            data={data}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  const error = validateData___(newData);
                  if (error != null){
                    setState({ ...state, open: true,error:error });
                    reject();
                  }
                  else{
                  setTimeout(() => {
                    // setData([...data, newData]);
                    props.insertInvRec(newData);
                    
                    resolve();
                  }, 1000)}
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  const error = validateData___(newData);
                  if (error != null){
                    setState({ ...state, open: true,error:error });
                    reject();
                  }
                  else{
                  setTimeout(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    //setData([...dataUpdate]);
                    console.log(newData,oldData)
                    props.updateInvRec(newData)
                    resolve();
                  }, 1000)}
                }),
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    //setData([...dataDelete]);
                    console.log(oldData)
                    props.deleteInvRec(oldData.id)
                    resolve()
                  }, 1000)
                }),
            }}
            options={{
              exportButton: true
            }      
            }
          /></div>
        ) : (<div>Loading</div>)
   
        return(
            <div>
                 {table}
                 {feedBackToast}
            </div>
           
            )
      }
     
    const mapDispatchToProps = (dispatch) => {
        return {
            updateInvRec: (payload) => dispatch(updateInvRec(payload)),
            insertInvRec: (payload) => dispatch(insertInvRec(payload)),
            deleteInvRec: (InventoryId) => dispatch(deleteInvRec(InventoryId))    
        }
    }
      export default compose(connect(null,mapDispatchToProps),firestoreConnect([
        {collection: 'fnbInventory'}
      ])) (InventoryEditable)
