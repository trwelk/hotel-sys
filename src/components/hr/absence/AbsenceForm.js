import React, { useState } from 'react';
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
import { connect,useSelector } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { useForm, Controller } from 'react-hook-form';
import {insertAbsence} from '../../../redux/actions/hrActions/AbsenceActions'
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { SettingsRemoteSharp } from '@material-ui/icons';
import { keys } from '@material-ui/core/styles/createBreakpoints';
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright ©'}
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
    width: '100%', 
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 100
  }
}));

function AbsenceRequest(props) {


  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    vertical: ' bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open, error } = state;
  const [absence, setAbsence] = useState({employee: '', abtype: '', from: '', to: '', days: '', reason: '', status: 'Open'});

  const absencetypesDB = useSelector(state => state.firestore.ordered.absencetype)
  const absencetypes = absencetypesDB ? (absencetypesDB.map(absencetype => ({...absencetype}))) : (null)

  const absenceTypeSelector = absencetypes ? (absencetypes.map((abtype,index) => {
    return  <MenuItem key={index} value={abtype.id}>{abtype.description}</MenuItem>
  })) :(null)

  const totalDays = (data) => {
      if(data.todate != null && data.fromdate != null){
            data.days = moment(absence.to, 'MM-DD-YYYY').diff(moment(absence.from),'days',true);
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    new Promise((resolve, reject) => {
      totalDays(absence);
      const error = validateData___(absence);
      if (error != null) {
        setState({ ...state, open: true, error: error });
        reject();
      } else {
        // alert(JSON.stringify(supplier))
        setTimeout(() => {
          props.insertAbsence(absence);
          resolve();
        }, 1000)
      } 
    })
  }

  const handleAbsence = (event) => {
    const { name, value } = event.target;
    setAbsence(prevState => ({
      ...prevState,
      [name]: value
    }));
  }


  const handleAbsenceTypeSelector = (event) => {
    setState(prevState => ({
        ...prevState,
        abtype: event.target.value
    }));
  }


  
  const handleAbsenceDate = (event) => {
    const { name, value } = event.target;
    setAbsence(prevState => ({
      ...prevState,
      [name]: getFormattedDate(new Date(value))
    }));
  }

  const handleDemoData = (e) => {
    props.insertAbsence({
      employee: 'EM001',
      abtype: 'SICK',
      from: '10/19/2020',
      to: '10/19/2020',
      days: '1',
      reason: 'High Fever',
      status: 'Open'
      
    });
  }


  //-----------------------------------------VALIDATE DATA ---------------------------------------------------------------------------//
  const validateData___ = (data) => {
    if (data.employee == null || data.employee == "") {
      return "Field EMPLOYEE ID Cannot be null"
    }
    else if (data.employee.length != 5) {
      return "Field EMPLOYEE ID should contain 5 characters"
    }
    else if (data.from == null || data.from == "") {
      return "fromdate Cannot be null"
    }
    else if (data.to == null || data.to == "") {
      return "To Date cannot be  null"
    }
    else
      return null
  }

  const getFormattedDate = (date) => {
    var year = date.getFullYear();
    
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }


  const handleClose = () => {
    setState({ ...state, open: false });
  }

  const feedBackToast = (<Snackbar
    autoHideDuration={200000}
    anchorOrigin={{ vertical, horizontal }}
    open={open}
    onClose={handleClose}
    key={vertical + horizontal}
    style={{justifyContent: "flex-end",marginTop: "568px"}}
  >
    <div >
      <Alert variant="filled" severity="error" style={{ display: "flex", alignItems: "center" }}>
        <h3>{error}</h3>
      </Alert>
    </div>
  </Snackbar>)
  
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Absence Request
        </Typography>
        <form className={classes.form} noValidate >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="employee"
                label="Employee Id"
                name="employee"
                autoComplete="off"
                onChange={handleAbsence}
              />
            </Grid>
             <Grid item xs={12}>
              <FormControl varient="outlined" required fullWidth>
                <InputLabel>Absence Type</InputLabel>
                <Select id="abtype"
                  labelId="abtype"
                  value={state.abtype}
                  name= "abtype"
                  onChange={handleAbsenceTypeSelector}>
                  {absenceTypeSelector}
                </Select>
              </FormControl>
            </Grid> 
            <Grid item xs={12} sm={6}>
            <TextField
                  id="from"
                  name="from"
                  label="From Date "
                  type="date"
                  style={{width:"89%",marginTop:"10px"}}
                  onChange={handleAbsenceDate}
                  InputLabelProps={{
                  shrink: true,
                  }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                  id="to"
                  name="to"
                  label="To Date "
                  type="date"
                  style={{width:"89%",marginTop:"10px"}}
                  onChange={handleAbsenceDate}
                  InputLabelProps={{
                  shrink: true,
                  }}/>
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="reason"
                label="Absence Reason"
                name="reason"
                autoComplete="off"
                onChange={handleAbsence} />
            </Grid>
            
            {/* <Grid item xs={12}>
              <FormControl varient="outlined" required fullWidth>
                <InputLabel>Department</InputLabel>
                <Select id="department"
                  value={department}
                  onChange={handleDepartment}>
                  <MenuItem key={26} value={"frontoffice"}>Front Office</MenuItem>
                  <MenuItem key={27} value={"foodnbeverages"}>Food and Beverages</MenuItem>
                  <MenuItem key={28} value={"housekeeping"}>House Keeping</MenuItem>
                  <MenuItem key={29} value={"finance"}>Finance</MenuItem>
                  <MenuItem key={30} value={"hr"}>HR</MenuItem>
                </Select>
              </FormControl>
            </Grid> }
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" id = "chkBox" />}
                label="I accept the Terms and Conditions"
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            id="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Request Absence
              </Button>

            <Button
            type="submit"
            id="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleDemoData}
          >
            Demo
            </Button>
              
        </form>
        {feedBackToast}
      </div>

    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        insertAbsence: (payload) => dispatch(insertAbsence(payload))
    }
}
export default compose(connect(null, mapDispatchToProps), firestoreConnect([
  { collection: 'absencetype' }
]))(AbsenceRequest)

