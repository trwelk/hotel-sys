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
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { InputLabel, Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { useForm, Controller } from 'react-hook-form';
import { insertSupplierInfo } from "../../../redux/actions/PnIActions/SupplierList";
import Snackbar from '@material-ui/core/Snackbar';
import { Alert} from '@material-ui/lab';




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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 100
  }
}));

function AddSuppliers(props) {

  
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  const [location, setLocation] = React.useState(1);
  const [department, setDepartment] = React.useState(1);

  const handleLocation =(event) => {
    setLocation(event.target.value);
  };
  const handleDepartment = (event) =>{
    setDepartment(event.target.value);
  }

  //-----------------------------------------VALIDATE DATA ---------------------------------------------------------------------------//
  const validateData = (data) => {
    if(data.sId.length != 5){
        return "Field ID should contain 5 characters"
    }
    else if(data.sId == null  || data.sId == ""){
      return "ID field Cannot be null"
    }
    else if(data.firstName == null || data.firstName == ""){
      return "First Name Cannot be null"
    }
    else if(data.lastName == null || data.lastName == "" ){
      return "Last Name cannot be  null"
    }
    else if(data.email == null || data.email == ""){
      return "Email field cannot be null"
    }
    else 
    return null
  }

    const [state,setState] = React.useState({
    open: false,
    vertical: ' bottom',
    horizontal: 'right'
  });

  const { vertical, horizontal, open, error} = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  }
  
const feedBackToast =  (<Snackbar 
  autoHideDuration={200000}
  anchorOrigin={{ vertical, horizontal }}
  open={open}
  onClose = { handleClose }
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
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Supplier
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit((data) =>
          new Promise((resolve, reject) => {
            const error = validateData(data);
            if (error != null){
              setState({ ...state, open: true,error:error });
              reject();
            }else{
            setTimeout(() => {
              props.insertSupplierInfo(data);
              resolve();
            }, 1000)
            }}))}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="sId"
                label="Supplier Id"
                name="sId"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="off"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="off"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="itemtype"
                label="Item Type"
                name="itemtype"
                validators={['reqired']}
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                id="phone"
                varient="outlined"
                required
                fullWidth
                label="Phone Number"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
                <FormControl varient="outlined" required fullWidth>
                  <InputLabel>Location</InputLabel>
                  <Select id="location"
                  value = {location}
                  onChange = {handleLocation}>
                    <MenuItem value={1}>Kilinochchi</MenuItem>
                    <MenuItem value={2}>Jaffna</MenuItem>
                    <MenuItem value={3}>Mannar</MenuItem>
                    <MenuItem value={4}>Mullaitivu</MenuItem>
                    <MenuItem value={5}>Vavuniya</MenuItem>
                    <MenuItem value={6}>Puttalam</MenuItem>
                    <MenuItem value={7}>Kurunegala</MenuItem>
                    <MenuItem value={8}>Gampaha</MenuItem>
                    <MenuItem value={9}>Colombo</MenuItem>
                    <MenuItem value={10}>Kalutara</MenuItem>
                    <MenuItem value={11}>Anuradhapura</MenuItem>
                    <MenuItem value={12}>Polonnaruwa</MenuItem>
                    <MenuItem value={13}>Matale</MenuItem>
                    <MenuItem value={14}>Kandy</MenuItem>
                    <MenuItem value={15}>Nuwara Eliya</MenuItem>
                    <MenuItem value={16}>Kegalle</MenuItem>
                    <MenuItem value={17}>Ratnapura</MenuItem>
                    <MenuItem value={18}>Trincomalee</MenuItem>
                    <MenuItem value={19}>Batticaloa</MenuItem>
                    <MenuItem value={20}>Ampara</MenuItem>
                    <MenuItem value={21}>Badulla</MenuItem>
                    <MenuItem value={22}>Monaragala</MenuItem>
                    <MenuItem value={23}>Hambantota</MenuItem>
                    <MenuItem value={24}>Matara</MenuItem>
                    <MenuItem value={24}>Galle</MenuItem>
                  </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl varient="outlined" required fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select id="department"
                  value = {department}
                  onChange={handleDepartment}>
                    <MenuItem value={"frontoffice"}>Front Office</MenuItem>
                    <MenuItem value={"foodnbeverages"}>Food and Beverages</MenuItem>
                    <MenuItem value={"housekeeping"}>House Keeping</MenuItem>
                    <MenuItem value={"finance"}>Finance</MenuItem>
                    <MenuItem value={"hr"}>HR</MenuItem>
                  </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="date"
                  name="date"
                  type = 'date'
                  inputRef={register}
                />
            </Grid>
            <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I accept the Terms and Conditions"
                  />
            </Grid>
          </Grid>
              <Button
                type="submit"
                id="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add Supplier
              </Button>
        </form>
      </div>
      {feedBackToast}
    </Container>
  
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
          insertSupplierInfo: (payload) => dispatch(insertSupplierInfo(payload)),
  }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  {collection: 'supplier' }
])) (AddSuppliers)