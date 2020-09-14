import React, { useState } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import RoomTypeTable from './RoomTypeTable';
import RoomAmnetiesTable from './RoomAmnetiesTable';

import {onMasterClick} from '../../../redux/actions/frontOfficeActions/FrontOfficeNavActions'
import RoomList from './RoomList';
import { Button } from '@material-ui/core';
import AddRoomTypeForm from './forms/AddRoomTypeForm';

const drawerWidth = 240;

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
      <div
         className={classes.divscroll}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} style={{padding: "0px 28px"}}>
            {children}
          </Box>
        )}
      </div>
    );
  }

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  divscroll:{
    overflowY: "auto",
    width: "82%"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: "18%",
    flexShrink: 0,
    position: "relative",
    zIndex:0,
    height:"100%",
    boxShadow: "1px 5px 7px 0px black"
  },
  drawerPaper: {
    width: "100%",
    position: "relative",
    background:"white",
    boxShadow:"0px 3px 1px -2px rgba(0,0,0,0.2) 0px 2px 2px 0px rgba(0,0,0,0.14) 0px 1px 5px 0px rgba(0,0,0,0.12)"

  },
  // necessary for content to be below app bar
  toolbar: {
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  selectorHeader:{
    height: "43px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "lightgrey"
  },
  listItems:{
    borderBottom: "black 1px solid",
  }
}));

function PermanentDrawerLeft(props) {
  const { useState } = React;
  const classes = useStyles();


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value, setValue] = React.useState(0);
  const [roomtype, setRoomType] = useState("");
  const roomtypes = useSelector(state => state.firestore.ordered.roomtype)
  console.log(roomtype)
  return (
      <div style={{height:"100%"}}>
      <AppBar position="static" style={{boxShadow:"0px"}} className="Tre">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Room Management" {...a11yProps(0)} />
          <Tab label="Room amenities" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
   <div style={{display: "flex",
                height: "654px",
                position: "fixed",
                width: "81%"}}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <div className={classes.selectorHeader}>
        <div>Room Types</div>
        <AddRoomTypeForm/>
        </div>
        <Divider />
        <List>
          {roomtypes ? (roomtypes.map((room, index) => (
            <ListItem className={classes.listItems} button key={room.id} onClick={() => {setRoomType(room.id) }}>
              <ListItemText primary={room.id} />
            </ListItem>
          ))) : (<div>Loading</div>)}
        </List>
      </Drawer>
      <TabPanel value={value} index={0}>
      <RoomList id={roomtype}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <RoomAmnetiesTable id={roomtype}/>
         </TabPanel>
      </div>
      </div>

      
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMasterClick:(roomType) => dispatch(onMasterClick(roomType))

    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {

    }
}

export default compose(connect(mapStateToProps,mapDispatchToProps),firestoreConnect([
    {collection: 'roomtype'}, 
  ]))(PermanentDrawerLeft)