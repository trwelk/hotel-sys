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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Editable from './Editable';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: "relative",
    zIndex:0,
    height:"460px"
  },
  drawerPaper: {
    width: drawerWidth,
    position: "relative",
    background:"white"

  },
  // necessary for content to be below app bar
  toolbar: {
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function PermanentDrawerLeft() {
  const { useState } = React;
  const classes = useStyles();

  const [roomtype, setRoomType] = useState("");
  const roomtypes = useSelector(state => state.firestore.ordered.roomtype)
console.log(roomtypes)
  return (
   <div style={{display:"flex"}}>
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
        <List>
          {roomtypes ? (roomtypes.map((room, index) => (
            <ListItem button key={room.id} onClick={() => {setRoomType(room.id) }}>
              <ListItemIcon>{<MailIcon />}</ListItemIcon>
              <ListItemText primary={room.id} />
            </ListItem>
          ))) : (<div>Loading</div>)}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text} >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
            <Editable/>
      </div>
      
  );
}

export default compose(connect(null),firestoreConnect([
    {collection: 'roomtype'}
  ]))(PermanentDrawerLeft)