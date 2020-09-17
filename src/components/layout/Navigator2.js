import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import PeopleIcon from '@material-ui/icons/People';


const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
    color:"white"
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
    color:"white"
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

function Navigator2(props) {
  const { classes, ...other } = props;
  const [frontOffice, setFrontOffice] = React.useState(false);
  const [finance, setFinance] = React.useState(false);
  const [maintenance, setMaintenance] = React.useState(false);


   const handleFinance = () => {
        setFinance(!finance);
    };

  const handleFrontOffice = () => {
    setFrontOffice(!frontOffice);
   };

   const handleMaintnance = () => {
    setMaintenance(!maintenance);
};


//----------------------------------------UI ELEMENTS -----------------------------------------------------------------------
const maintenanceNav = (
    <div>
  <ListItem button onClick={handleMaintnance} className={clsx(classes.item,classes.itemActiveItem)}>
      <ListItemIcon className={classes.itemIcon}>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Front Office" 
      classes={{
                primary: classes.categoryHeaderPrimary,
              }}/>
      {maintenance ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={maintenance} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Room Handling</ListItemText>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Customer Handling</ListItemText>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Feedback Handling</ListItemText>
        </ListItem>
      </List>
    </Collapse>
    </div>
)

const frontOfficeNav = (
      <div>
    <ListItem button onClick={handleFrontOffice} className={clsx(classes.item,classes.itemActiveItem)}>
        <ListItemIcon className={classes.itemIcon}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Front Office" 
        classes={{
                  primary: classes.categoryHeaderPrimary,
                }}/>
        {frontOffice ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={frontOffice} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
            <ListItemIcon className={classes.itemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText  
                classes={{
              primary: classes.itemPrimary,
            }}
            >Room Handling</ListItemText>
          </ListItem>
          <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
            <ListItemIcon className={classes.itemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText  
                classes={{
              primary: classes.itemPrimary,
            }}
            >Customer Handling</ListItemText>
          </ListItem>
          <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
            <ListItemIcon className={classes.itemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText  
                classes={{
              primary: classes.itemPrimary,
            }}
            >Feedback Handling</ListItemText>
          </ListItem>
        </List>
      </Collapse>
      </div>
  )

  const financeNav = (
    <div>
  <ListItem button onClick={handleFinance} className={clsx(classes.item, classes.itemActiveItem)}>
      <ListItemIcon className={classes.itemIcon}>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Finance" 
      classes={{
                primary: classes.categoryHeaderPrimary,
              }}/>
      {finance ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={finance} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <StarBorder />
          </ListItemIcon>
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Finance 1</ListItemText>
        </ListItem>
        <ListItem button className={clsx(classes.item,classes.nested, classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <StarBorder />
          </ListItemIcon>
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >Finance 2</ListItemText>
        </ListItem>
        <ListItem button className={clsx(classes.item, classes.nested,classes.itemActiveItem)}>
          <ListItemIcon className={classes.itemIcon}>
            <StarBorder />
          </ListItemIcon>
          <ListItemText  
              classes={{
            primary: classes.itemPrimary,
          }}
          >finance 3</ListItemText>
        </ListItem>
      </List>
    </Collapse>
    </div>
)
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          HOTEL-SYS
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Dashboard
          </ListItemText>
        </ListItem>
      </List>
      <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                Modules
              </ListItemText>
            </ListItem>
      {frontOfficeNav}
      {financeNav}
      {maintenanceNav}
    </Drawer>
  );
}

Navigator2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator2);