import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { insertMenu, updateMenu, deleteMenu } from '../../../redux/actions/fnbProductionActions/MenuActions';
import { Button,Paper, GridList, Card, Icon, Container } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';

function MenuEditable(props) {

  const { useState } = React;
  const [columns, setColumns] = useState([
    { title: 'ID', field: 'id' },
    { title: 'Menu Name', field: 'menuName' },
    { title: 'Price (LKR)', field: 'price' },
    { title: 'Last Modified', field: 'lastModified' },
    { title: 'Type', field: 'menutype', lookup: { 1: 'Wedding', 2: 'Breakfast', 3: 'Lunch', 4: 'Dinner',5: 'Beverage' } },
  ]);
  const [Itemcolumns, setItemColumns] = useState([
    { title: 'ID', field: 'id' },
    { title: 'Item Name', field: 'itemName' },
    { title: 'Price (LKR)', field: 'price' },
    { title: 'Last Modified', field: 'lastModified' },
    { title: 'Type', field: 'type' },
  ]);
  const validateData___  = (data) => {
    if(data.id == null || data.id == ""){
      return "Field ID Cannot be null"

    }
    else if(data.id.length != 5 ){
      return "Field ID sould contain 5 characters"

    }
    else if(data.menuName == null || data.menuName == ""){
      return "Field Menu Name Cannot be null"
    }
    else if(data.price == null || data.price == ""){
      return "Field price Cannot be null"
    }
    else if(data.lastModified == null || data.lastModified == ""){
      return "Field Last Modified Cannot be null"
    }
    else if(data.type == null || data.type == ""){
      return "Field type Cannot be null"
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

const product = useSelector(state => state.firestore.ordered.product )
const productData = product ? (product.map(Product => ({ ...Product }))) : (null)
const itemDetails = productData ? (
  <Container>
      <h3>
      {productData[0].name}
      </h3>
  </Container>
) : (<div>Loading</div>)

  const Menu = useSelector(state => state.firestore.ordered.Menu)
  const data = Menu ? (Menu.map(menu => ({ ...menu }))) : (null)
  const table = data ? (
    <MaterialTable
      title="Menu List"
      columns={columns}
      data={data}
      detailPanel={[
        {                    
          tooltip: 'Show Menu',
          render: rowData => {
            if (rowData.type == 1) {
              return (
                <div>
                    <GridList>
                      <grid>
                        <Card>
                          <h1>Food</h1>
                          <h3>test 1</h3>
                          <h3>test 1</h3>
                        </Card>
                      </grid>
                      <grid>
                        <Card>
                          <h1>Beverages</h1>
                          <h3>test 1</h3>
                          <h3>test 1</h3>
                        </Card>
                      </grid>
                      <grid>
                        <Card>
                          <h1>Dessert</h1>
                          <h3>test 1</h3>
                          <h3>test 1</h3>
                          </Card>
                      </grid>
                    </GridList>
                </div>  
              )
            } else {
              return (
                {itemDetails}
              )
            }
          },
        }]}
      editable={{
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
              console.log(newData, oldData)
              props.updateMenu(newData)
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
              props.deleteMenu(oldData.id)
              resolve()
            }, 1000)
          }),
      }}
    />
  ) : (<div>Loading</div>)

  return (
    <div>
      <Button variant="contained" color="primary" href='/newMenu' fullWidth='true'>
        Add a Menu
      </Button>
      {table}
      {feedBackToast}
    </div>

  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateMenu: (payload) => dispatch(updateMenu(payload)),
    insertMenu: (payload) => dispatch(insertMenu(payload)),
    deleteMenu: (MenuId) => dispatch(deleteMenu(MenuId))
  }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  { collection: 'Menu' },
  { collection: 'product'}
]))(MenuEditable)
