import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm, Controller} from 'react-hook-form';
import { insertMenu } from '../../../../redux/actions/fnbProductionActions/MenuActions'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { FormControl, Grid, InputLabel, ListItemIcon, MenuItem, Select } from '@material-ui/core';
import WeddingTemplate from '../Templates/WeddingMenuTemplate';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';


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

function MenuForm(props) {

  const classes = useStyles();

  const [menuType, setType] = React.useState(1);
  const [hide,hideField] = React.useState(false);
  const [Menu, setMenu] = useState({id:'',menuName:'',menuType:1, price:''});
  const [WedItems,setItems] = useState({
    Wlitem1:'',
    Mditem1:'',Mditem2:'',Mditem3:'',
    Sditem1:'',Sditem2:'',Sditem3:'',
    Dsitem1:'',Dsitem2:'',Dsitem3:''
  })

  const handleChangeItem = (e) => {
    const { name, value } = e.target;
    setItems(prevState => ({
      ...prevState,
      [name]: value
  }));
  }


  function SetMenuType(MenuType){
    if (MenuType == 1) {
      return <WeddingTemplate handleChangeItem={handleChangeItem} WedItems={WedItems} />
    } else {
      return ("Menu Type:" + MenuType)
    }
  }

  const handleChange = (e) => {
    if(e.target.name == 'menuType'){
    setType(e.target.value);
      if(e.target.value != 1){
        hideField(true);
      }
    }
    const { name, value } = e.target;
    setMenu(prevState => ({
      ...prevState,
      [name]: value
  }));
  };

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
    else if(data.menuType == 1 && data.price == null || data.price == ""){
      return "Field price Cannot be null"
    }
    else if(data.menuType == null || data.menuType == ""){
      return "Field Menu Type Cannot be null"
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
  new Promise((resolve,reject)=>{
      const error = validateData___(Menu);
      if (error != null){
        setState({ ...state, open: true,error:error });
        reject();
      }
      else{
      setTimeout(() => {
          alert('Got Wedding Items' + JSON.stringify(WedItems));
          props.insertMenu(Menu,WedItems)
          resolve();
      },1000)
    }
  })}

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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ImportContactsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Menu
        </Typography>
        <form className={classes.form} noValidate>
              <Grid container spacing={1}>
              <Grid item xs={4}>
        <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="id"
            label="Menu Id"
            name="id"
            autoFocus
            onChange={handleChange}
          />   </Grid>  
          <Grid item xs={5}>         
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="menuName"
            label="Menu Name"
            name="menuName"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
          />
          </Grid>  
          </Grid>   
          <Grid item xs={4}>    
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="price"
            label="Price (LKR)"
            type="currency"
            id="price"
            onChange={handleChange}
            hidden={hide}
          /></Grid> 
    <FormControl className={classes.formControl} margin="normal">
        <InputLabel id="MenuType">Menu Type</InputLabel>
        <Select
          labelId="MenuType"
          id="menuType"
          name="menuType"
          value={menuType}
          onChange={handleChange}
        >      <MenuItem value="" disabled>
        <em>select the value</em>
      </MenuItem>
          <MenuItem key={1} value={1}>Wedding</MenuItem>
          <MenuItem key={2} value={2}>Breakfast</MenuItem>
          <MenuItem key={3} value={3}>Lunch</MenuItem>
          <MenuItem key={4} value={4}>Dinner</MenuItem>
          <MenuItem key={5} value={5}>Beverage</MenuItem>
        </Select>
      </FormControl>
          <div id="selected">{SetMenuType(menuType)}</div>
          <Button
            id="submit"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit} 
          >
            Publish
          </Button>
        </form>
      </div>
      {feedBackToast}
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
      insertMenu: (payload,ItemsPayload) => dispatch(insertMenu(payload,ItemsPayload)),
    }
  }
  
  export default compose(connect(null, mapDispatchToProps), firestoreConnect([
    { collection: 'Menu' }]))
    (MenuForm)