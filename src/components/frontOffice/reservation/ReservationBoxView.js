import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import ReservationCard from './utill/ReservationCard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 250,
    width: 200,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function  ReservatonBoxView (props)  {
 
  const { useState } = React;

  const reservations = useSelector(state => state.firestore.ordered.reservation )
  const [spacing, setSpacing] = React.useState(2);
  const [month, setMonth] = useState(7);

  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };


  var box = [ ];
  for(var i = 0; i < 31; ++i) {
    box[i] = [ ];
      for(var j = 0; j < 6; ++j) {
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
      for(var room = 0 ; room < 6 ; room++){
        const reservedDays = getDaysArray(reservations[reservation].startDay.toDate(),reservations[reservation].endDay.toDate());
        if(room == reservations[reservation].roomNo ){
          for(var dayOfBooking of reservedDays){
            console.log(dayOfBooking.getMonth(),month,"ttttttttttttttttttttttttttttttttttttttttttttttttt")
            //add a if condition here to check if dayOfBooking.getMonth is = to the above selected month
            if(dayOfBooking.getMonth() == month)
              box[dayOfBooking.getDate()][room]= reservations[reservation] 

          }
        }
      }
    }

    for(var a = 0 ; a < 31 ; a++){
      for(var b = 0 ; b < 6 ; b++){
        console.log( a,b,box[a][b] );
      }
    }
  }
  
  const rows = box.map((row,rIndex) => {
    const paper = row.map((element,eIndex) => {
      return(
        <Grid key={eIndex} item>
          {element.roomId ? (
            <div>{element.id}</div>
          ) : (<ReservationCard/>)}
        </Grid>      
      )})

    return(

      <Grid container justify="space-around" key={rIndex} spacing={3}  style={{background:"white"}}>
        <div >{rIndex}</div>
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

  return (
    <Grid container className={classes.root} spacing={1}>
      <input type="month" name="month" onChange={handleMonthPick}/>

      <Grid item xs={12}>
        {rows}
      </Grid>
    </Grid>


  
  );
}

export default firestoreConnect([
  {collection: 'reservation'}
]) (ReservatonBoxView)