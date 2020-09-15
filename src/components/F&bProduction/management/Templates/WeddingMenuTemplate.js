import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function WeddingTemplate() {
  
    const {register} = useForm();

    return (
        <div id="wedding-section">
 <Grid container spacing={1}>
        <label id='Welcome-Drink'>Welcome Drink</label> 
        <TextField
        variant="outlined"
        margin="dense"
        inputRef={register}
        required
        fullWidth
        id="Wlitem1"
        label="Welcome Drink"
        name="Wlitem1"
        autoFocus
      /> 
    <Grid item xs={5}>
    <label id='Main-dishes'>Main Dishes</label> 
     <Grid item>
      <TextField
        variant="outlined"
        margin="dense"
        inputRef={register}
        required
        fullWidth
        id="Mditem1"
        label="Main dish 1"
        name="Mditem1"
        autoComplete="name"
        autoFocus
      />
      </Grid>
      <Grid item>
      <TextField
        variant="outlined"
        margin="dense"
        inputRef={register}
        required
        fullWidth
        id="Mditem2"
        label="Main dish 2"
        name="Mditem2"
        autoComplete="name"
        autoFocus
      />
      </Grid>
      <Grid item>
      <TextField
        variant="outlined"
        margin="dense"
        inputRef={register}
        required
        fullWidth
        id="Mditem2"
        label="Main dish 3"
        name="Mditem2"
        autoComplete="name"
        autoFocus
      />
      </Grid>
      </Grid>
      <Grid item xs={5}>
      <label id='Dessert'>Dishes</label> 
      <Grid item>
      <TextField
        variant="outlined"
        margin="dense"
        inputRef={register}
        required
        fullWidth
        id="Sditem1"
        label="Dish 1"
        name="Sditem1"
      />
      </Grid>
      <Grid item>
      <TextField
        variant="outlined"
        margin="dense"
        inputRef={register}
        required
        fullWidth
        id="Sditem2"
        label="Dish 2"
        name="Sditem2"
      />
      </Grid>
      <Grid item>
      <TextField
        variant="outlined"
        margin="dense"
        inputRef={register}
        required
        fullWidth
        id="Sditem3"
        label="Dish 3"
        name="Sditem3"
      />
      </Grid>
      </Grid>
      <Grid item>
    <label id='Dessert'>Dessert</label> 
      <TextField
        variant="outlined"
        margin="dense"
        inputRef={register}
        required
        fullWidth
        id="Dsitem1"
        label="Dessert 1"
        name="Dsitem1"
      />
            <TextField
        variant="outlined"
        margin="dense"
        inputRef={register}
        required
        fullWidth
        id="Dsitem2"
        label="Dessert 2"
        name="Dsitem2"
      />
            <TextField
        variant="outlined"
        margin="dense"
        inputRef={register}
        required
        fullWidth
        id="Dsitem3"
        label="Dessert 3"
        name="Dsitem3"
      />
      </Grid>
      </Grid>
      </div>
    );
  }