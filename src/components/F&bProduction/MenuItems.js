
import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { insertMenu, updateMenu, deleteMenu } from '../../redux/actions/fnbProductionActions/MenuActions';

function MenuItem(props) {

  const { useState } = React;
  const [columns, setColumns] = useState([
    { title: 'Welcome Drink', field: 'Wlitem1' }, 
    { title: 'Main Dishes 1', field: 'Mditem1' },
    { title: 'Main Dishes 2', field: 'Mditem2' },
    { title: 'Main Dishes 3', field: 'Mditem3' },
    { title: 'Side Dishe 1', field: 'Sditem1' },
    { title: 'Side Dishe 2', field: 'Sditem2' },
    { title: 'Side Dishe 3', field: 'Sditem3' },
    { title: 'Dessert 1', field: 'Dsitem1' },
    { title: 'Dessert 2', field: 'Dsitem2' },
    { title: 'Dessert 3', field: 'Dsitem3' },
  ]);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open ,error} = state;

  const MenuNo = props.MenuNo
  const items = useSelector(state => state.firestore.ordered.MenuItems)
  const datacopy = items ? (items.map(item => ({ ...item }))) : (null)
  const data = datacopy ? (datacopy.filter(data => data.MenuNo == MenuNo)) : datacopy

  const MenuType = props.MenuType
  const Weditems = useSelector(state => state.firestore.ordered.MenuItems)
  const weddatacopy = Weditems ? (Weditems.map(item => ({ ...item }))) : (null)
  const weddata = weddatacopy ? (weddatacopy.filter(weddata => weddata.MenuNo == MenuNo)) : datacopy
  
  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const table = data ? (
    <MaterialTable style={{ padding: "0px" }}
      title="Menu Items"
      columns={columns}
      data={data}
      editable={{
        // onRowAdd: newData =>
        //   new Promise((resolve, reject) => {
        //     const error = validateData___(newData);
        //     if (error != null){
        //       setState({ ...state, open: true,error:error });
        //       reject();
        //     }
        //     else{
        //       setTimeout(() => {
        //         console.log(data)
        //         // props.insertProductType(newData);
        //         resolve();
        //       }, 1000)
        //     }
            // setTimeout(() => {
            //   //setData([...data, newData]);
             
            //   resolve();
            // }, 1000)
          // }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
              console.log(newData, oldData)
              props.updateMenu(newData)
              resolve();
              }, 1000),

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
    <div style={{ padding_left: "5px" }}>
      {table}
    </div>

  )
}

const mapDispatchToProps = (dispatch) => {
    return {
      updateMenu: (payload) => dispatch(updateMenu(payload)),
      deleteMenu: (MenuId) => dispatch(deleteMenu(MenuId))
    }
  }
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  { collection: 'GenMenuItems' },
  { collection: 'MenuItems' }
]))(MenuItem)

