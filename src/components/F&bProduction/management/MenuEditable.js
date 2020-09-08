import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { insertMenu, updateMenu, deleteMenu } from '../../../redux/actions/fnbProductionActions/MenuActions';

    function MenuEditable(props) {

        const { useState } = React;
        const [columns, setColumns] = useState([
          { title: 'ID', field: 'id' },
          { title: 'Menu Name', field: 'menuName' },
          { title: 'Price (LKR)', field: 'price'},
          { title: 'Last Modified', field: 'lastModified'},
          { title: 'Type', field: 'type', lookup: {1:'Wedding', 2:'Breakfast', 3:'Lunch', 4:'Dinner'}},
        ]); 
        const Menu = useSelector(state => state.firestore.ordered.Menu)
        const data = Menu ? (Menu.map(menu => ({...menu}))) : (null)
        const table = data ? (
            <MaterialTable
            title="Menu List"
            columns={columns}
            data={data}
            editable={{
              onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    // setData([...data, newData]);
                    props.insertMenu(newData);
                    
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
                    props.updateMenu(newData)
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
                    props.deleteMenu(oldData.id)
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
            updateMenu: (payload) => dispatch(updateMenu(payload)),
            insertMenu: (payload) => dispatch(insertMenu(payload)),
            deleteMenu: (MenuId) => dispatch(deleteMenu(MenuId))    
        }
    }
      export default compose(connect(null,mapDispatchToProps),firestoreConnect([
        {collection: 'Menu'}
      ])) (MenuEditable)
