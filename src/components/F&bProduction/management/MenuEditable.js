import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { insertMenu, updateMenu, deleteMenu } from '../../../redux/actions/fnbProductionActions/MenuActions';
import { Button, ButtonGroup, CircularProgress } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import MenuItems from './MenuItems';
import jsPdf from 'jspdf'
import 'jspdf-autotable'
import {db} from '../../../config/fbConfig'

function MenuEditable(props) {

  const { useState } = React;
  const [columns, setColumns] = useState([
    { title: 'ID', field: 'id',editable:'onAdd' },
    { title: 'Menu Name', field: 'menuName' },
    { title: 'Price (LKR)', field: 'price' ,type: 'numeric'},
    { title: 'Last Modified', field: 'lastModified', editable: 'never', type: 'date'},
    { title: 'Type', field: 'menutype', lookup: { 1: 'Wedding', 2: 'Breakfast', 3: 'Lunch', 4: 'Dinner',5: 'Beverage' } },
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
    else if(data.menutype == 1 && (data.price == null || data.price == "")){
      return "Field price Cannot be null for wedding menus"
    }
    else if(data.menutype == null || data.menutype == ""){
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

  const exportCsv = () =>{

    let Row=[];
    let A = [['Menu Id','Menu Name','Menu Type','Price(LKR)','Last Modified']];
    let mItems = [[]];
    let re = Menu;
    let Type;
    
    for(let item = 0;item < re.length;item++){
      switch (parseInt(re[item].menutype)) {
        case 1:
          Type = 'Wedding'
          break;
        case 2:
          Type = 'Breakfast'
           break;
        case 3:
          Type = 'Lunch'
           break;
        case 4:
          Type = 'Dinner'
          break;
        case 5:
          Type = 'Beverage'
          break;
        default:
          break;
      }
      if (re[item].price == "")
        A.push([re[item].id,re[item].menuName,Type,"N/A",re[item].lastModified])
      else
        A.push([re[item].id,re[item].menuName,Type,re[item].price,re[item].lastModified])
      if (re[item].menutype != 1) {
          A.push(["Item Id", "Item Name", "Item Price(LKR)"])
      db.collection("Menu").doc(re[item].id).collection("MenuItems").get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data().name);
            A.push([doc.data().itemId, doc.data().name, doc.data().price])
          });
        });

      }
      else{
      A.push(['Welcome Drink','Main Dish 1', 'Main Dish 2', 'Main Dish 3', 'Side Dish 1','Side Dish 2','Side Dish 3',
      'Dessert 1','Dessert 2','Dessert 3']);
      for (let index = 0; index < mItems.length; index++)
            A.push([mItems[index].Wlitem1,mItems[index].Mditem1,mItems[index].Mditem2,mItems[index].Mditem3,mItems[index].Sditem1,mItems[index].Sditem2,
              mItems[index].Sditem3,mItems[index].Dsitem1,mItems[index].Dsitem2,mItems[index].Dsitem3]);   
      }
    }

    console.warn(A);
    for(let i=0; i<A.length; i++){
      Row.push(A[i].join(","));
    }
    console.warn(Row);
    let fileString=Row.join("%0A");
    let a = document.createElement("a");
    a.href='data:attachment/csv,' + fileString;
    a.target="_Blank";
    a.download="Menus.csv";
    document.body.appendChild(a);
    a.click();

    console.warn(fileString);

  }

  const exportPdf = () =>{
    let doc = new jsPdf('p', 'pt');

    let header = [['Menu Id','Menu Name','Menu Type','Price(LKR)','Last Modified']];
    let A = [[]];
    let re = Menu;
    let mItems = [][[]];
    let Type;

      db.collection("Menu").get()
      .then(()=>{
        for (let index = 0; index < re.length; index++) {
        db.collection("Menu").doc(re[index].id).collection("MenuItems").get().then(snapshot => {
          snapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data().name);
            mItems[index].push([doc.data().itemId, doc.data().name, doc.data().price])
        })
      })
      };

      }
      ).then(()=>{
    for(let item = 0;item < re.length;item++){

          switch (parseInt(re[item].menutype)) {
            case 1:
              Type = 'Wedding'
              break;
            case 2:
              Type = 'Breakfast'
               break;
            case 3:
              Type = 'Lunch'
               break;
            case 4:
              Type = 'Dinner'
              break;
            case 5:
              Type = 'Beverage'
              break;
            default:
              break;
          }
          if (re[item].price == "")
          A.push([re[item].id,re[item].menuName,Type,"N/A",re[item].lastModified])
        else
          A.push([re[item].id, re[item].menuName, Type, re[item].price, re[item].lastModified])
        if (re[item].menutype != 1) {
            A.push(["Item Id", "Item Name", "Item Price(LKR)"])
            for (let index = 0; index < mItems[item].length; index++)
              A.push([mItems[item][index].itemId,mItems[item][index].name,mItems[item][index].price]);            
        };

      }

    doc.text(250,50,"Menu Details");
      
    doc.autoTable({
      head: header,
      body: A,
      startY: 80,
      foot:[["Generated By HotelSys"]],
      footStyles:{halign:'center',}
    })          

    doc.save("MenuDetails.pdf");

  });

  }

  const Menu = useSelector(state => state.firestore.ordered.Menu)
  const data = Menu ? (Menu.map(menu => ({ ...menu}))) : (null)
  const table = data ? (
    <div>
      <ButtonGroup>
      <Button variant="contained" color="primary" href='/fnb/production/newMenu'>
        Add a Menu
      </Button>
      <Button variant="contained" color="default" onClick={()=>exportCsv()}>
        Export as Csv
      </Button>
      <Button variant="contained" color="secondary" onClick={()=>exportPdf()}>
        Export as Pdf
      </Button>
      </ButtonGroup>
    <MaterialTable
      title="Menu List"
      columns={columns}
      data={data}
      detailPanel={[
        {
          tooltip: 'Show Menu',
          render: rowData => {
            return (
              <div>
                <MenuItems MenuNo={rowData.id} MenuType={rowData.menutype} />
              </div>
            )
          }

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
      options={{
        exportButton: true,
        headerStyle: {
        backgroundColor: '#01579b',
        color: '#FFF'
      }      
      }}
    /></div>
  ) : (<div><CircularProgress style={{marginTop:"200px"}}/></div>)

  return (
    <div>
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
  { collection: 'Menu' }
]))(MenuEditable)
