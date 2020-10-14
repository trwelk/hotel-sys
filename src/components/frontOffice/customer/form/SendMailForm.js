import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect,useSelector } from "react-redux";
import FormControl from '@material-ui/core/FormControl';
import MuiAlert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';

import {sendMail} from '../../../../redux/actions/frontOfficeActions/CustomerActions'
import { compose } from "redux";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
    },
    width: "87%",
    boxShadow: "0px 1px 12px black",
    height: "87",
    marginTop: "24px"
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  MuiDialogPaperScrollPaper:{
    background: "transparent",overflowY: "hidden"

  }
}));

const steps = ['Reservation Details'];
                                                        
function SendMailForm(props) {
    const [open, setOpen] = React.useState(false);
    const [stat, setStat] = React.useState({
      openn: false,
      vertical: 'bottom',
      horizontal: 'right',
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();

          props.sendMail(state)
          handleClose()
      }

    const customersDb = useSelector(state => state.firestore.ordered.customer )
    const customers = customersDb ? (customersDb.map(customer => ({...customer}))) : (null)
    const [state, setState] = useState({subject:"",message:"",customer:""});


    const customerSelector = customers ? (customers.map((customer,index) => {
        return  <MenuItem key={index} value={customer.id}>{customer.firstName + ' ' + customer.lastName}</MenuItem>
      })) :(null)

      const handleCustomerTypeSelector = (event) => {
        // console.log(event.target.value)
         setState(prevState => ({
           ...prevState,
           customer: event.target.value
       }));
       }

       const handleSubject = (event) => {
        setState(prevState => ({
            ...prevState,
            subject: event.target.value
        }));
        console.log(state)
       }

       const handleMessage = (event) => {
        setState(prevState => ({
            ...prevState,
            message: event.target.value
        }));
        console.log(state)
       }

      const { vertical, horizontal, openn ,error} = stat
      const handleClickOpen = () => {
          setOpen(true);
        };
      const handleClose = () => {
        setOpen(false);
      };

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  //--------------------------------------------------------------------


  return (
<React.Fragment>
    <AddCircleIcon variant="outlined" color="secondary" onClick={handleClickOpen}/>

<Dialog
style={{background: "transparent",overflowY: "hidden"}}
open={open}
onClose={handleClose}
> 
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout} style={{display:"flex",justifyContent: "center"}}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Reservation Details
          </Typography>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="subject" label="Subject" onChange={handleSubject}/>
            <TextField id="message" label="Message" onChange={handleMessage}  />
            <FormControl className={classes.formControl} style={{width:"500px"}}>
        <Select
         label="Customer"
          id="customer"
          value={state.customer}
          onChange={handleCustomerTypeSelector}
        >
         {customerSelector}
        </Select>
      </FormControl>
        </form>
          <React.Fragment>
            { (
              <React.Fragment>
              <React.Fragment>
      <Typography variant="h6" gutterBottom>
              Reservation Details
      </Typography>

    </React.Fragment>                <div className={classes.buttons}>
                  <Button variant="contained" color="primary"   onClick={handleSubmit}  className={classes.button}>
                    Submit
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>

    </Dialog>
</React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
      sendMail: (payload) => dispatch(sendMail(payload)),
  }
}

export default compose(connect(null,mapDispatchToProps),firestoreConnect([
  {collection: 'customer'}
]))(SendMailForm) 