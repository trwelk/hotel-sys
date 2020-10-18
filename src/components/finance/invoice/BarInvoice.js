//importing docs & default components
import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

//Import CRUD Operation for Bar Invoice
import {updateBarInvoice} from '../../../redux/actions/financeActions/BarInvoiceActions'
import {insertBarInvoice} from '../../../redux/actions/financeActions/BarInvoiceActions'
import {deleteBarInvoice} from '../../../redux/actions/financeActions/BarInvoiceActions'

function BarInvoice(props) {
 
  const { useState } = React;
  const [columns, setColumns] = useState([
      { title: 'Invoice No', field: 'id' },
      { title: 'Date', field: 'date', type:'date' },
      { title: 'Prepared BY', field: 'preparedBy' },
      { title: 'Customer Type', field: 'customerType', lookup: {30: 'Guest', 31: 'Non-Guest'}},
      { title: 'Invoice Amount', field: 'invoiceAmount', type:'numeric' },
      { title: 'Service Charges', field: 'serviceCharges', type:'numeric'},
      { title: 'Payment Type', field: 'paymentType', lookup:{30:'Cash', 31:'Card'}},
      { title: 'Tax %', field: 'tax', type:'numeric'},
      { title: 'Total Amount', field: 'totalAmount', type:'numeric', editable:'never'},
     
  ]); 

  //Constant Variables
  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });

  const { vertical, horizontal, open ,error} = state;

  //Demo Button Style
  const useStyles = makeStyles({
    root: {
      background: 'white',
      border: 0,
      borderRadius: 6,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: '#000080',
      height: 48,
      padding: '0 30px',
    },
  });

  const classes = useStyles();

   //Validations Begins
   const validateData___  = (data) => {
    if (data.id == null || data.id === ""){
      return "Assign a Value, Invoice ID Cannot be Null"
    }

    else if(data.id.length !== 5 || data.id.length > 5 ){
     return "Invalid Length, accepted length -> 'FI000'"
    }
   

    else if(data.customerType == null || data.customerType === ""){
      return "Select a Customer Type"
    }

    else if(data.paymentType == null || data.paymentType === ""){
      return "Select a Payment Type"
    }
   
    else if(data.date == null || data.date === ""){
      return "Select a Date"
    }

    if(data.preparedBy == null || data.preparedBy === ""){
     return "Assign a Value, Employee ID Cannot be Null"
    }

    else if(data.preparedBy.length !== 5 || data.preparedBy.length > 5 ){
     return "Invalid Length, accepted length -> 'EM000'"
    }

    if(data.invoiceAmount == null || data.invoiceAmount === ""){
      return "Invoice Amount Cannot be Null"
    }
    
    else if(data.invoiceAmount <= 0){
        return "Invoice Amount Value should be Greater than 0"
    }

    else if(data.serviceCharges == null || data.serviceCharges === ""){
      return "Service Charges Cannot be Null"
    }
    
    else if(data.serviceCharges <= 0){
        return "Service Charges Value should be Greater than 0"
    }

    else if(data.tax == null || data.tax === ""){
      return "Tax Amount Cannot be Null"
    }
    
    else if(data.tax <= 0){
        return "Tax Amount Value should be Greater than 0"
    }

    else
    return null;
  } //Validations Ends here

/*const handleClick = (newState) => () => {
  setState({ open: true, ...newState });
};*/

const handleClose = () => {
  setState({ ...state, open: false });
};

//To insert Demo Data
const handleDemoData = () => {
props.insertBarInvoice({
  id:"BI001",
  date:"Tue Sep 15 2020",
  preparedBy:"EM001",
  customerType:"30",
  invoiceAmount:"5000.00",
  serviceCharges:"1000.00",
  otherCharges:"750.00",
  paymentType:"30",
  tax:"750.00"

});
}

  const barin = useSelector(state => state.firestore.ordered.barInvoice)
  const data = barin ? (barin.map(barin => ({...barin,
  totalAmount: parseFloat(barin.invoiceAmount) + parseFloat(barin.serviceCharges) + 
parseFloat(barin.tax)}))) : (null)
  
//Bar Invoice Table
  const table = data ? (
      <MaterialTable

       //For reports, pivot and data filter
       options={{
        exportButton: true,
        grouping: true,
        filtering: true
      }}

      title="Bar Invoices"
      columns={columns}
      data={data}

      editable={{

        //add new record
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            const error = validateData___(newData);
            if (error != null) {
             setState({ ...state, open: true,error:error });
            reject();
            }
            else{
              setTimeout(() => {
                props.insertBarInvoice(newData);
                resolve();
              }, 1000)
            }
            
          }),

        //update existing record
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            const error = validateData___(newData);
            if (error != null) {
             setState({ ...state, open: true,error:error });
            reject();
            }
            else{
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                console.log(newData,oldData)
                props.updateBarInvoice(newData)
                resolve();
              }, 1000)
            }
           
          }),

        //delete existing record
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              //setData([...dataDelete]);
              console.log(oldData)
              props.deleteBarInvoice(oldData.id)
              resolve()
            }, 1000)
          }),
      }}

    //Button to Insert Demo Data
    components={{
      Toolbar: props => (
        <div>
          <MTableToolbar {...props} />
          <div>
            <Button className={classes.root} onClick={handleDemoData}>Click to Insert Demo Data </Button>
          </div>
        </div>
      ),
    }}

    />
  ) : (<div>Loading</div>)

  //Custom Toasts for Validations
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

  return(
      <div>
           {table}
           {feedBackToast}
      </div>
     
      )
}

  //CRUD Operations for Bar Invoice Table
  const mapDispatchToProps = (dispatch) => {
    return {
        updateBarInvoice: (payload) => dispatch(updateBarInvoice(payload)),
        insertBarInvoice: (payload) => dispatch(insertBarInvoice(payload)),
        deleteBarInvoice: (barInvoice) => dispatch(deleteBarInvoice(barInvoice))


    }
}

export default compose(connect(null,mapDispatchToProps),firestoreConnect([
  //Database for Bar Office Invoice
 {collection: 'barInvoice'}
])) (BarInvoice)