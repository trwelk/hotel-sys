import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form';
import { insertOrderType, insertProductType,updateProductType,deleteProductType } from '../../redux/actions/FnBServiceActions/FoodOrderTypeActions'

import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import MaterialTable from 'material-table'
import { useSelector, connect } from 'react-redux';
import { db } from '../../config/fbConfig';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { MenuItem } from 'material-ui';
// import WeddingTemplate from './WeddingMenuTemplate';
// import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function OrderForm(props) {
    const classes = useStyles();
    const { register, handleSubmit, control } = useForm()
    const { useState } = React;
    const [columns, setColumns] = useState([
        { title: 'ProductID', field: 'id' }, 
        { title: 'ProductName', field: 'ProName' },
        { title: 'Quantity', field: 'quantity', type :'numeric', filtering: false },
        { title: 'Amount', field: 'amount', type :'numeric', filtering: false },
    
      ]);
  const OrderPro = useSelector(state => state.firestore.ordered.orderProducts)
  const data = OrderPro ? (OrderPro.map(orderPro => ({ ...orderPro }))) : (null)
  const table = data ? (
    <MaterialTable style={{ padding: "0px" ,width: "60%", marginLeft: "300px"}}
      title="Editable Preview"
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              //setData([...data, newData]);
              props.insertProductType(newData);
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
              console.log(newData, oldData)
              props.updateProductType(newData)
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
              props.deleteProductType(oldData.id)
              resolve()
            }, 1000)
          }),
    
      }}
      options={{
          filtering: true
          }}
    />
  ) : (<div>Loading</div>)

  
//   const GetAllProducts = () => {
//     db.collection('product').get()
//       .then(response => {
//         const fetchedProducts = [];
//         response.forEach(document => {
//           const fetchedProduct = {
//             ProductName: document.get(ProductName),
//             price: document.get(price)
//           };
//           fetchedProducts.push(fetchedProduct);
//         });
//         (fetchedProducts);
//       })
//       .catch(error => {
//         setError(error);
//       });
//   }

    return (
        <div>
             <form className={classes.form} noValidate onSubmit={handleSubmit((data) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            props.insertOrderType(data)
                            resolve();
                        }, 1000)
                    }))}> <div className={classes.paper}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
           
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add  A Order
        </Typography>
                               
  
  


        <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        required
                        fullWidth
                        id="id"
                        label="Order Id"
                        name="id"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        required
                        fullWidth
                        id="tableNO"
                        label="Table No"
                        name="tableNO"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        required
                        fullWidth
                        id="room"
                        label="Room No"
                        name="room"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        required
                        fullWidth
                        id="status"
                        label="Status"
                        name="status"
                        autoComplete="name"
                        autoFocus
                    />
                    {/* <FormControl className={classes.formControl}>
        <InputLabel id="MenuType">Menu Type</InputLabel>
        <Select
          labelId="MenuType"
          id="MenuType"
          value={type}
          onChange={handleChange}
        >      <MenuItem value="" disabled>
        <em>select the value</em>
      </MenuItem>
          <MenuItem key={1} value={1}>in Progress</MenuItem>
          <MenuItem key={2} value={2}>done</MenuItem>
          <MenuItem key={3} value={3}>served</MenuItem>
          <MenuItem key={4} value={4}>Dinner</MenuItem>
        </Select>
      </FormControl> */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        required
                        fullWidth
                        id="descriptions"
                        label="Description"
                        name="descriptions"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register}
                        required
                        fullWidth
                        name="price"
                        label="PRICE (LKR)"
                        type="currency"
                        id="price"
                    />
                       <div style={{ padding_left: "5px" }}>
    </div>
    </Container>
    </div>
    {table}
                    <Button
                        id="submit"
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}

                    >
                      Publish
          </Button>
                </form>
            <Box mt={8}>
                <Copyright />
            </Box>
        
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        insertOrderType: (payload) => dispatch(insertOrderType(payload)),
        insertProductType: (payload) => dispatch(insertProductType(payload)),
        updateProductType: (payload) => dispatch(updateProductType(payload)),
        deleteProductType: (payload) => dispatch(deleteProductType(payload)),

    }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
     { collection: 'orderProducts'}]))
    (OrderForm)