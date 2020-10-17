import React from 'react'
import MaterialTable from 'material-table'
import { useSelector, connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import {db} from '../../../config/fbConfig'
import {insertProduct, updateProduct, deleteProduct} from '../../../redux/actions/PnIActions/productHandler';
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

 function ProductTable(props) {
 
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Product ID', field: 'oId'},
      { title: 'Product Name', field: 'pType' },
      {title: 'Supplier Name', field: 'sName'},
      {title:'Quantity', field: 'qty'},
      {title: 'Priority', field: 'priority'},
      {title: 'Status', field: 'status',lookup: { PENDING: 'PENDING', DELIVERED: 'DELIVERED', CANCELED: 'CANCELED'}},
      {title: 'Date', field: 'date'}
      
    ]); 

    const validateData___= (data) => {
      if (data.oId.length != 5) {
        return "Field ID should contain 5 characters"
      }
      else if (data.oId == null || data.oId == "") {
        return "ID field Cannot be null"
      }
      else if (data.sName == null || data.sName == ""){
        return "Supplier Name Cannot be null"
      }
      else if(data.qty == 0 || data.qty < 0){
        return "Quantity shold be a postive value"
      }
        return null
    }

    const [state, setState] = React.useState({
      open: false,
      vertical: ' bottom',
      horizontal: 'right'
    });
  
    const { vertical, horizontal, open, error } = state;
  
    const handleClose = () => {
      setState({ ...state, open: false });
    }
   
    const feedBackToast = (<Snackbar
      autoHideDuration={20000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <div >
        <Alert variant="filled" severity="error" style={{ display: "flex", alignItems: "center" }}>
          <h3>{error}</h3>
        </Alert>
      </div>
    </Snackbar>)
    const Pro = useSelector(state => state.firestore.ordered.productMng)
    const supplierDb = useSelector(state => state.firestore.ordered.supplier)
    const suppliers = supplierDb ? (supplierDb.map(supplier => ({...supplier}))) : (null)

    const data = Pro ? (Pro.map(pro => ({...pro}))) : (null)
    const pendingRequests = data ? data.filter(dat => dat.status == "PENDING").length : 0
    const deliverRequests = data ? data.filter(dat => dat.status == "DELIVERED").length : 0
    const canceledRequests = data ? data.filter(dat => dat.status == "CANCELED").length : 0
    var totalPurchase = 0;
    if(data && suppliers){
        data.forEach((product,index) => {
            suppliers.forEach((supplier,ind) => {

                if(product.sName == supplier.firstName && product.pType == supplier.itemtype){
                    console.log(product.qty , supplier.unitprice,(parseInt(product.qty) * parseInt(supplier.unitprice)) )
                    console.log(totalPurchase)
                    totalPurchase = totalPurchase + (parseInt(product.qty) * parseInt(supplier.unitprice)) 
                }
            })
        })
    }
    console.log(totalPurchase)

    const table = data ? (
        <MaterialTable
        title="Purchases Order"
        columns={columns}
        data={data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
              if (error != null){
                setState({ ...state,open: true,error:error});
                reject();
              }
              else{
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.oId;
                dataUpdate[index] = newData;
                //setData([...dataUpdate]);
                console.log(newData,oldData)
                props.updateProduct(newData)
                resolve();
              }, 1000)}
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.oId;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                console.log(oldData)
                props.deleteProduct(oldData.oId)
                resolve()
              }, 1000)
            }),
        }}
        options={{
          exportButton: true
        }      
        }
      />
    ) : (<div>Loading</div>)

    //--------------------------------------------------------Theme--------------------------------------------------------------------------------------//
    const WhiteTextTypography = withStyles({
      root: {
        color: "#00f2c3 !important"
      }
    })(Typography);

    
    

  
    return(
        <div>
          {/* <headerPnI /> */}
             {table}
             <Row style={{margin:"0px",marginTop:"15px"}}>
            <Col lg="3">
              <Card className="card-chart" style={{height: "165px",border: "#1d8cf8 solid"}}>
                <CardHeader>
                  <h4 className="card-category" style={{color:"white",fontSize: "medium"}}>Total Purchases Price</h4>
                </CardHeader>
                <CardBody style={{display: "flex",justifyContent: "center",padding: "2px"}}>
                  <div style={{width: "150px",height: "93px",}}>
                    <WhiteTextTypography variant="h4" component="h4" gutterBottom style={{marginTop:"20px"}}>
                        {totalPurchase}
                    </WhiteTextTypography>             
                 </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3">
              <Card className="card-chart" style={{height: "165px",border: "#1d8cf8 solid"}}>
                <CardHeader>
                  <h4 className="card-category" style={{color:"white",fontSize: "medium"}}>Pending Orders</h4>
                </CardHeader>
                <CardBody style={{display: "flex",justifyContent: "center",padding: "2px"}}>
                  <div style={{width: "150px",height: "93px",}}>
                    <WhiteTextTypography variant="h1" component="h2" gutterBottom>
                        {pendingRequests}
                    </WhiteTextTypography>             
                 </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3">
              <Card className="card-chart" style={{height: "165px",border: "#1d8cf8 solid"}}>
                <CardHeader>
                  <h4 className="card-category" style={{color:"white",fontSize: "medium"}}>Deliverd Orders</h4>
                </CardHeader>
                <CardBody style={{display: "flex",justifyContent: "center",padding: "2px"}}>
                  <div style={{width: "150px",height: "93px",}}>
                    <WhiteTextTypography variant="h1" component="h2" gutterBottom>
                            {deliverRequests}
                    </WhiteTextTypography>             
                 </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3">
              <Card className="card-chart" style={{height: "165px",border: "#1d8cf8 solid"}}>
                <CardHeader>
                  <h4 className="card-category" style={{color:"white",fontSize: "medium"}}>Cancle Orders</h4>
                </CardHeader>
                <CardBody style={{display: "flex",justifyContent: "center",padding: "2px"}}>
                  <div style={{width: "150px",height: "93px",}}>
                    <WhiteTextTypography variant="h1" component="h2" gutterBottom>
                        {canceledRequests}
                    </WhiteTextTypography>             
                 </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {feedBackToast}
        </div>
       
        )
  }
 
const mapDispatchToProps = (dispatch) => {
    return {
        insertProduct: (payload) => dispatch(insertProduct(payload)),
        updateProduct: (payload) => dispatch(updateProduct(payload)),
        deleteProduct: (productId) => dispatch(deleteProduct(productId))


    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'productMng'},
    {collection: 'supplier'}
  ])) (ProductTable)