import React from 'react'
import MaterialTable from 'material-table'
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import CancelIcon from '@material-ui/icons/Cancel';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import CustomerCard from './utill/CustomerCard';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    outerDiv:{
        display: "flex",
    justifyContent: "space-around"
    }, margin: {
        margin: theme.spacing(1),
      },
  }));


function FeedBackTable() {

    const [descriptionButtonHidden,setDescriptionButtonHidden] = React.useState(true)
    const [state, setState] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
      });
      const { vertical, horizontal, open ,error} = state;
      const classes = useStyles();

  
      const feedbacks = useSelector(state => state.firestore.ordered.foodOrder)    
      
      const data = feedbacks ? (feedbacks.map(feedback => ({...feedback}))) : (null)


      const handleChangeOfDescription = (event) => {
          if(descriptionButtonHidden == false){
            setDescriptionButtonHidden(true)
          }
      }

      
      if(feedbacks){
    return (
        
      <MaterialTable
        title="Multiple Detail Panels Preview"
        columns={[
          { title: 'Order', field: 'orderNo' },
          { title: 'Room', field: 'room' },
          { title: 'Status', field: 'status'},
        ]}
        data={data}
        detailPanel={[
          {
            tooltip: 'Show Description',
            render: rowData => {
              return (
                 <div> 
                    <FormControl fullWidth>
                        <TextField  id="outlined-basic" defaultValue={rowData.description} multiline  label="Description" variant="outlined" onChange={handleChangeOfDescription}/>
                    </FormControl>
                    <IconButton color="primary" aria-label="add to shopping cart" hidden='true'  >
                        <MenuBookIcon hidden={descriptionButtonHidden}/>
                    </IconButton>
                </div>

                  
              )
            },
          },
         
        ]}
      />
    )
  }
  else
  return <div>loading</div>
}
  export default compose(connect(null,null),firestoreConnect([
    {collection: 'foodOrder'},
    {collection: 'customer'}    
  ]))(FeedBackTable)
  