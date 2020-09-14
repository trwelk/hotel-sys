import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
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

function SetMenuType(MenuType){
  if (MenuType == 1) {
    return <WeddingTemplate />
  } else {
    return "Byeeeee"
  }
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

function MenuForm(props) {

  const classes = useStyles();
  const {register,handleSubmit} = useForm()

  const [type, setType] = React.useState(1);

  const handleChange = (event) => {
    setType(event.target.value);
    SetMenuType(event.target.value);
  };

  const displayType = document.getElementById('MenuType');

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
        <form className={classes.form} noValidate onSubmit={handleSubmit((data)=>
            new Promise((resolve,reject)=>{
                setTimeout(() => {
                    alert(JSON.stringify(data));
                    props.insertMenu(data)
                    resolve();
                },1000)
            }))}>
              <Grid container spacing={1}>
              <Grid item xs={4}>
        <TextField
            variant="outlined"
            margin="dense"
            inputRef={register}
            required
            fullWidth
            id="id"
            label="Menu Id"
            name="id"
            autoFocus
          />   </Grid>  
          <Grid item xs={5}>         
          <TextField
            variant="outlined"
            margin="dense"
            inputRef={register}
            required
            fullWidth
            id="menuName"
            label="Menu Name"
            name="menuName"
            autoComplete="name"
            autoFocus
          />
          </Grid>  
          </Grid>   
          <Grid item xs={4}>    
          <TextField
            variant="outlined"
            margin="dense"
            inputRef={register}
            required
            fullWidth
            name="price"
            label="Price (LKR)"
            type="currency"
            id="price"
          /></Grid> 
    <FormControl className={classes.formControl} margin="normal">
        <InputLabel id="MenuType">Menu Type</InputLabel>
        <Select
          labelId="MenuType"
          id="MenuType"
          value={type}
          onChange={handleChange}
        >      <MenuItem value="" disabled>
        <em>select the value</em>
      </MenuItem>
          <MenuItem key={1} value={1}>Wedding</MenuItem>
          <MenuItem key={2} value={2}>Breakfast</MenuItem>
          <MenuItem key={3} value={3}>Lunch</MenuItem>
          <MenuItem key={4} value={4}>Dinner</MenuItem>
        </Select>
      </FormControl>
          <div id="selected">{SetMenuType(type)}</div>
          <Button
            id="submit"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}

          >
            Publish
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
      insertMenu: (payload) => dispatch(insertMenu(payload)),
    }
  }
  export default compose(connect(null, mapDispatchToProps), firestoreConnect([
    { collection: 'Menu' }]))
    (MenuForm)