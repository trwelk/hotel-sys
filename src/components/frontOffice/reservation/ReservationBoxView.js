import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import EventIcon from '@material-ui/icons/Event';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Skeleton from '@material-ui/lab/Skeleton';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';


import ReservationCard from './utill/ReservationCard'
import EmptyReservationCard from './utill/EmptyReservationCard';
import {handleMonthPickReservation} from '../../../redux/actions/frontOfficeActions/FrontOfficeNavActions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowY:"auto",
    height: "704px"
  },
  paper: {
    height: 250,
    width: 200,
  },
  control: {
    padding: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function  ReservatonBoxView (props)  {
 
  const { useState } = React;
  const [spacing, setSpacing] = React.useState(2);
  const [month, setMonth] = useState(null);
  const [roomType, setRoomType] = React.useState('EXKINGSUITE');

  const reservationsDb = useSelector(state => state.firestore.ordered.reservation )
  const roomsDb = useSelector(state => state.firestore.ordered.room )
  const roomTypeDb = useSelector(state => state.firestore.ordered.roomtype )
  
  let rooms = null;
  let reservations= null;
  let numberOfRooms= null;
  if(reservationsDb && roomsDb){
    //roomtype ? is not needed since initialized
  reservations = roomType ? (reservationsDb.filter(reservation => reservation.roomType == roomType)) : (reservation => reservation.roomType == 'EXKINGSUITE')
  rooms = roomType ? (roomsDb.filter(room => room.roomType == roomType)) : (room => room.roomType == roomType)
  numberOfRooms = rooms.length;
  }



  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };


  var box = [ ];
  for(var i = 1; i < 32; ++i) {
    box[i] = [ ];
      for(var j = 0; j < numberOfRooms ; ++j) {
        box[i][j] = i+j; 
      }
  }

  var getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
  
      arr.push(new Date(dt));
    }
    return arr;
  };



  if(reservations != null){
    for(var reservation = 0 ; reservation < reservations.length ; reservation++){
      for(var room = 0 ; room < numberOfRooms ; room++){
        const reservedDays = getDaysArray(reservations[reservation].startDay.toDate(),reservations[reservation].endDay.toDate());
        if(room == reservations[reservation].roomNo ){
          for(var dayOfBooking of reservedDays){
            //add a if condition here to check if dayOfBooking.getMonth is = to the above selected month
            if(dayOfBooking.getMonth() == month -1)
              box[dayOfBooking.getDate()][room]= reservations[reservation] 

          }
        }
      }
    }


  }
  
  const rows = box.map((row,rIndex) => {
    const paper = row.map((element,eIndex) => {
      return(
        <Grid key={eIndex} item style={{padding:"12px 0px"}}>
          {element.id ? (
            <ReservationCard/>
          ) : (<EmptyReservationCard  month={month} roomType={roomType} roomNo={eIndex} startDay={rIndex}/>)}
        </Grid>      
      )})

    return(

      <Grid container justify="space-around" key={rIndex}  spacing={3}  style={{background:rIndex%2 == 0 ? "#000000b0" : "white" ,    width: "100%",margin:"0px"}}>
        <div style={{display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                      }}>
          
          {rIndex%2 == 0 ? <EventIcon style={{fill:"white"}}/> : <EventIcon style={{fill:"black"}}/>}
          {rIndex%2 == 0 ?  <h2 style={{color:"white"}}>{rIndex } </h2> :  <h2 style={{color:"black"}}>{rIndex } </h2>}
        </div>
        {paper}
      </Grid>
    )

  })

 
  const handleMonthPick = (e) => {
    const mo = new Date(e.target.value);
    const month = mo.getMonth();
    props.handleMonthPickReservation(month + 1)
    console.log("tttttttttttttttttttt",month,e)

    setMonth(month + 1);
  };

  const roomTypeSelector = roomTypeDb ? (roomTypeDb.map((roomType,index) => {
    return  <MenuItem key={index} value={roomType.id}>{roomType.name}</MenuItem>
  })) :(null)

  const handleRoomTypeSelector = (event) => {
    setRoomType(event.target.value);
  };



  if(isLoaded(roomTypeDb)){
    console.log(month)
  return (
    <div style={{display: "flex",
                height: "654px",
                position: "fixed",
                width: "calc(85% - 4px )"}}>   
    <Grid container className={classes.root} spacing={1}>
      <div style={{width:"100%",display:"flex",    alignItems: "center",background:"white",position:"fixed",zIndex:10}}>     
      <TextField
        style={{color:"white"}}
        id="month"
        type="month"
        onChange={handleMonthPick}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      /> 
      <FormControl className={classes.formControl}>
        <Select
         
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={roomType}
          onChange={handleRoomTypeSelector}
        >
         {roomTypeSelector}
        </Select>
        {
          roomTypeDb ? (
        <Autocomplete
      id="combo-box-demo"
      onChange={handleRoomTypeSelector}
      options={roomTypeDb}
      getOptionLabel={(option) => option.id}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />) : (null)
        }
      </FormControl>
</div>
      <Grid item xs={12} style={{ paddingTop: "51px"}}>
        {month ? rows : <div>loading</div>}
      </Grid>
    </Grid>
    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
</div>
 
  
  );
      }
      else{
return <div>Loading</div>            }
  

}


const mapDispatchToProps = (dispatch) => {
  return {
    handleMonthPickReservation: (payload) => dispatch(handleMonthPickReservation(payload)),

  }
}
export default compose(connect(null,mapDispatchToProps),firestoreConnect([
  {collection: 'reservation'},
  {collection: 'room'},
  {collection: 'roomtype'}
])) (ReservatonBoxView)