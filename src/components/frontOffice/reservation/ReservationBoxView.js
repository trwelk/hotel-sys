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

import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import ReservationCard from './utill/ReservationCard'
import EmptyReservationCard from './utill/EmptyReservationCard';

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
}));

function  ReservatonBoxView (props)  {
 
  const { useState } = React;
  const [spacing, setSpacing] = React.useState(2);
  const [month, setMonth] = useState(7);
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


  var box = [ ];
  for(var i = 0; i < 31; ++i) {
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
            if(dayOfBooking.getMonth() == month)
              box[dayOfBooking.getDate()][room]= reservations[reservation] 

          }
        }
      }
    }

    for(var a = 0 ; a < 31 ; a++){
      for(var b = 0 ; b < numberOfRooms ; b++){
        console.log( a,b,box[a][b] );
      }
    }
  }
  
  const rows = box.map((row,rIndex) => {
    const paper = row.map((element,eIndex) => {
      return(
        <Grid key={eIndex} item style={{padding:"12px 0px"}}>
          {element.id ? (
            <ReservationCard/>
          ) : (<EmptyReservationCard month={8} roomType={roomType} roomNo={eIndex} startDay={rIndex}/>)}
        </Grid>      
      )})

    return(

      <Grid container justify="space-around" key={rIndex}  spacing={3}  style={{background:rIndex%2 == 0 ? "#000000b0" : "white" ,    width: "100%",margin:"0px"}}>
        <div style={{display: "flex",
                      flexDirection: "row",
                      alignItems: "center"
                      }}>
          
          {rIndex%2 == 0 ? <EventIcon style={{fill:"white"}}/> : <EventIcon style={{fill:"black"}}/>}
          {rIndex%2 == 0 ?  <h2 style={{color:"white"}}>{rIndex + 1} </h2> :  <h2 style={{color:"black"}}>{rIndex + 1} </h2>}
        </div>
        {paper}
      </Grid>
    )

  })

 
  const handleMonthPick = (e) => {
    console.log(new Date(e.target.value));
    const mo = new Date(e.target.value);
    const month = mo.getMonth();
    
    setMonth(month);
  };

  const roomTypeSelector = roomTypeDb ? (roomTypeDb.map((roomType,index) => {
    return  <MenuItem key={index} value={roomType.id}>{roomType.name}</MenuItem>
  })) :(null)

  const handleRoomTypeSelector = (event) => {
    setRoomType(event.target.value);
  };

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
        value="2020-08"
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
      </FormControl>
</div>
      <Grid item xs={12} style={{    paddingTop: "51px"}}>
        {rows}
      </Grid>
    </Grid>

</div>
 
  
  );
  

}

export default firestoreConnect([
  {collection: 'reservation'},
  {collection: 'room'},
  {collection: 'roomtype'}


]) (ReservatonBoxView)