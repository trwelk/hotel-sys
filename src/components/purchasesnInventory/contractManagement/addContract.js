// import React, { useState } from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Paper from '@material-ui/core/Paper';
// import MenuItem from '@material-ui/core/MenuItem';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';
// import Typography from '@material-ui/core/Typography';
// import { firestoreConnect, isLoaded } from 'react-redux-firebase';
// //import Review from './Review';
// import Dialog from '@material-ui/core/Dialog';
// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import { connect , useSelector } from "react-redux";
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import AddIcon from '@material-ui/icons/Add';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
// import {
//     KeyboardDatePicker,
//     MuiPickersUtilsProvider

//   } from '@material-ui/pickers';
//   import 'date-fns';
//   import DateFnsUtils from '@date-io/date-fns';
//   import InputLabel from '@material-ui/core/InputLabel';





// import {insertFeedback} from '../../../../redux/actions/frontOfficeActions/FeedbackActions'
// import { compose } from "redux";
// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
//   }

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     position: 'relative',
//   },
//   layout: {
//     width: 'auto',
//     marginLeft: theme.spacing(2),
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
//       width: 600,
//       marginLeft: 'auto',
//       marginRight: 'auto',
//     },
//   },
//   paper: {
//     marginBottom: theme.spacing(3),
//     padding: theme.spacing(2),
//     [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
//       marginTop: theme.spacing(6),
//     },
//     width: "97%",
//     boxShadow: "0px 1px 12px black",
//     height: "87",
//     marginTop: "24px"
//   },
//   stepper: {
//     padding: theme.spacing(3, 0, 5),
//   },
//   buttons: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//   },
//   button: {
//     marginTop: theme.spacing(1),
//     marginLeft: theme.spacing(1),
//   },
//   MuiDialogPaperScrollPaper:{
//     background: "transparent",overflowY: "hidden"

//   },
//   MuiDialogPaperWidthSm:{
//       maxWidth:"1200px"
//   }
// }));

                                                        
// function addContract(props) {
//     const [open, setOpen] = React.useState(false);
//     const [state, setState] = useState({supplierName:"",department:"",date:"",contract:"",description:""});
//     const [selectedDate, setSelectedDate] = React.useState(new Date('2020-09-17T21:11:54'));

//     const supplierName = useSelector(state => state.firestore.ordered.supplier)
//     const sup = supplierName ? (supplierName.map(supplier => ({...supplier}))) : (null)
//     const [stat, setStat] = React.useState({
//         openn: false,
//         vertical: 'bottom',
//         horizontal: 'right',
//       });
//       const { vertical, horizontal, openn ,error} = stat
//       console.log(stat);



// //--------------------------------Methods--------------------------------------------------------
// const handleDateChange = (date) => {
//     setSelectedDate(date);
//     console.log(date)
//     setState(prevState => ({
//         ...prevState,
//         date: date
//     }));
//   };

// const handleClickOpen = () => {
//           setOpen(true);
//         };
// const handleClose = () => {
//         setOpen(false);
//       };
// const handleSubmit = (evt) => {
//         evt.preventDefault();
//         //validate
//         var error = null
//         error = validateData___(state)
//         console.log(error)
//         if(error != null){
//             setStat({ ...stat, openn: true,error:error });
//         }
//         else{
//             props.insertFeedback(state);
//             handleClose()
//         }
//       }

//   const classes = useStyles();

//   const customerSelector = sup ? (sup.map((sup,index) => {
//     return  <MenuItem key={index} value={sup.id}>{sup.supplierName}</MenuItem>
//   })) :(null)

//   const handleCustomerTypeSelector = (event) => {
//    // console.log(event.target.value)
//     setState(prevState => ({
//       ...prevState,
//       customer: event.target.value
//   }));
//   }

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setState(prevState => ({
//         ...prevState,
//         [name]: value
//     }));
//     };

//     const validateData___  = (data) => {
//         console.log(data)
//         if(data.title == null || data.title == ""){
//           return "Field title Cannot be null"
  
//         }
//         else if(data.customer == null || data.customer == ""){
//           return "Field customer Cannot be null"
//         }
//         else if(data.date == null || data.date == ""){
//           return "Field Date Cannot be null"
//         }
//         else if(data.type == null || data.type == ""){
//           return "Field type Cannot be null"
//         }
//         else if(data.platform == null || data.platform == ""){
//           return "Field platform Cannot be null"
//         }
//         else if(data.platform != "ONSITE" || data.platform != "SOCIALMEDIA"){
//             return "Field type Should be either ONSITE or SOCIALMEDIA"
//           }
//         else if(data.type != "COMPLAINT" || data.type == "COMPLIMENT"){
//             return "Field type Should be either COMPLAINT or COMPLIMENT"
//           }
//         else
//         return null;
//       }

//  //----------------------------------UI------------------------------------------------------------   
//  const feedBackToast =  (<Snackbar 
//     autoHideDuration={2000}
//     anchorOrigin={{ vertical, horizontal }}
//     open={openn }
//     key={vertical + horizontal}
//     >
//       <Alert severity="error">{error}</Alert>
//     </Snackbar>)
  
//   return (
// <React.Fragment>
//     <Button
//         variant="contained"
//         color="default"
//         className={classes.button}
//         onClick={handleClickOpen}
//         startIcon={<AddIcon />}
//       >
//         Add Feedback
//       </Button>

//     <Dialog
//     style={{background: "transparent",overflowY: "hidden",maxWidth:"1200px"}}
//     open={open}
//     onClose={handleClose}
//     fullWidth
//         maxWidth="lg"
// > 
// {feedBackToast}
// <React.Fragment>
//       <CssBaseline />
//       <main className={classes.layout} style={{display:"flex",justifyContent: "center",width:"1109px"}}>
//         <Paper className={classes.paper} style={{marginTop:"24px"}}>
//           <Typography component="h1" variant="h4" align="center">
//             Feedback
//           </Typography>
//           <React.Fragment>
//             { (
//               <React.Fragment>
//               <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//               Feedback Details
//       </Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12}  >
//         <FormControl className={classes.formControl} style={{width:"500px"}}>
//         <InputLabel id="customer">Customer</InputLabel>
//         <Select
//          label="Customer"
//           id="demo-simple-select"
//           value={state.customer}
//           onChange={handleCustomerTypeSelector}
//         >
//          {customerSelector}
//         </Select>
//       </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="title"
//             name="title"
//             label="Title"
            
//             onChange={handleChange}

//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField id="rating" name="rating" label="Rating"   onChange={handleChange}

//           InputProps={{
//             readOnly: false,
//           }}/>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField
//             required
//             id="platform"
//             name="platform"
//             label="Platform"
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//         <KeyboardDatePicker
//           disableToolbar
//           variant="inline"
//           format="MM/dd/yyyy"
//           margin="normal"
//           id="date"
//           label="Date "
//           value={selectedDate}
//           onChange={handleDateChange}
//           KeyboardButtonProps={{
//             'aria-label': 'change date',
//           }}
//         />
//             </MuiPickersUtilsProvider>

//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField id="type" name="type" label="Type"              
//           onChange={handleChange}
//           InputProps={{
//             readOnly: false,
//           }}/>
//         </Grid>
        
//         <Grid item xs={12}>
//           <TextField
//             required
//             id="description"
//             name="description"
//             label="Description"
//           multiline
//           rows={4}
//             fullWidth
//             autoComplete="shipping address-line1"
//             onChange={handleChange}

//           />
//         </Grid>
//         <Grid item xs={12} >
//           <TextField
//             required
//             id="action"
//             name="action"
//             label="Action"
//             fullWidth
//           multiline
//           rows={4}
//             autoComplete="shipping country"
//             onChange={handleChange}

//           />
//         </Grid>
 
//       </Grid>

//     </React.Fragment>                
//     <div className={classes.buttons}>
//                   <Button variant="contained" color="primary" onClick={handleSubmit}  className={classes.button}>
//                     Submit
//                   </Button>
//                 </div>
//               </React.Fragment>
//             )}
//           </React.Fragment>
//         </Paper>
//       </main>
//     </React.Fragment>    </Dialog>
// </React.Fragment>
//   );
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     insertFeedback: (payload) => dispatch(insertFeedback(payload)),
//   }
// }

// export default compose(connect(null,mapDispatchToProps),firestoreConnect([
//   {collection: 'customer'}
// ]))(addContract) 