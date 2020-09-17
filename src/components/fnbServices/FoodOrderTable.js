import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';


import MenuBookIcon from '@material-ui/icons/MenuBook';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import EditProductTable from './EditProductTable';
import OrderForm from './OrderForm';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  outerDiv: {
    display: "flex",
    justifyContent: "space-around"
  }, margin: {
    margin: theme.spacing(1),
  },
}));



function FeedBackTable() {


  const [descriptionButtonHidden, setDescriptionButtonHidden] = React.useState(true)
  const [state, setState] = React.useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open, error } = state;
  const classes = useStyles();



  const feedbacks = useSelector(state => state.firestore.ordered.foodOrder)

  const data = feedbacks ? (feedbacks.map(feedback => ({ ...feedback }))) : (null)



  const handleChangeOfDescription = (event) => {
    if (descriptionButtonHidden == false) {
      setDescriptionButtonHidden(true)
    }
  }



  if (feedbacks) {
    return (

      <MaterialTable
        title="Multiple Detail Panels Preview"
        columns={[
          { title: 'ID', field: 'orderNo' },
          { title: 'TableNO', field: 'tableNO'/*, filtering: false*/ },
          {
            title: 'RoomNO',
            field: 'room',
          },
          {
            title: 'Description',
            field: 'descriptions'
            /* ,filtering: false*/
          },
          {
            title: 'Status',
            field: 'status',
            lookup: { 1: 'done', 2: 'in pogress' },
            
          },
          {
            title: 'Date',
            field: 'date'           
            
          }
        ]}
        options={{
          filtering: true
        }}
        data={data}
        detailPanel={[
          {
            tooltip: 'Show Description',
            render: rowData => {
              return (
                <div>
                  <EditProductTable orderNo={rowData.orderNo} />
                </div>



              )
            },
          },

        ]}
      />
    )
  }
  else
    return <div>loading</div>
}
export default compose(connect(null, null), firestoreConnect([
  { collection: 'foodOrder' },
  { collection: 'customer' }
]))(FeedBackTable)
// import React from 'react';
// import MaterialTable from 'material-table'
// import { firestoreConnect } from 'react-redux-firebase';
// import { useSelector, connect } from 'react-redux';
// import { compose } from 'redux';

// import Button from '@material-ui/core/Button'
// import Snackbar from '@material-ui/core/Snackbar'
// import MuiAlert from '@material-ui/lab/Alert'
// import EditProductTable from './EditProductTable';

// function FoodOrderTable() {


//     const foodOrder = useSelector(state => state.firestore.ordered.foodOrder)    
//     const data = foodOrder ? (foodOrder.map(order => ({...order}))) : (null)

//   return (
//     <MaterialTable
//       columns={[
//         // { title: 'Name', field: 'id' },
//         // { title: 'Surname', field: 'orderNo' },
//         // { title: 'Birth Year', field: 'room', type: 'numeric' },
//         // {
//         //   title: 'Birth Place',
//         //   field: 'tableNo',
//         //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
//         // },
//         { title: 'ID', field: 'orderNo' },
//             { title: 'TableNO', field: 'tableNO'/*, filtering: false*/ },
//             {
//               title: 'RoomNO',
//               field: 'room',
//             },
//             {
//               title: 'Description',
//               field: 'descriptions'
//               /* ,filtering: false*/
//             },
//             {
//               title: 'Status',
//               field: 'status',
//             }
//       ]}
//       data={data}
//       title="Detail Panel With RowClick Preview"
//       detailPanel={rowData => {
//         return (
//           <div></div>
//           //<EditProductTable orderNo={rowData.orderNo}/>
//         )
//       }}
//       onRowClick={(event, rowData, togglePanel) => togglePanel()}
//     />
//   )
// }

// export default compose(connect(null,null),firestoreConnect([
//     {collection: 'foodOrder'}
//   ])) (FoodOrderTable)