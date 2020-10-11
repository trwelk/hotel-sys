import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import RoomsAvailableOfRoomTypeChart from './overview/RoomsAvailableOfRoomTypeChart';
import RoomTypeOfReservationsChart from './overview/RoomTypeOfReservationsChart';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: "500px",
      height: "600px"
    },
  },
}));

export default function FrotOfficeOverview() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{marginLeft:"20px",marginTop:"50px"}}>

      <Paper elevation={3} style={{display: "flex",flexDirection:"column",justifyContent: "space-around"}}><RoomsAvailableOfRoomTypeChart/><h3>Available Rooms for today</h3></Paper>
      <Paper elevation={3} style={{display: "flex",flexDirection:"column",justifyContent: "space-around"}}><RoomTypeOfReservationsChart/> <h3>Room Types Reserved this year</h3></Paper>
    </div>
  );
}
