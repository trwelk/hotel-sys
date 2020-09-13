import { TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function WeddingTemplate() {
  
    const {register} = useForm();

    return (
        <div id="wedding-section">
        <label id='Welcome-Drink'>Welcome Drink</label> 
        <TextField
        variant="outlined"
        margin="normal"
        inputRef={register}
        required
        fullWidth
        id="Wlitem1"
        label="WlItem 1"
        name="Wlitem1"
        autoFocus
      />    
    <label id='Main-dishes'>Main Dishes</label> 
      <TextField
        variant="outlined"
        margin="normal"
        inputRef={register}
        required
        fullWidth
        id="Mditem1"
        label="MdItem 1"
        name="Mditem1"
        autoComplete="name"
        autoFocus
      />
    <label id='Dessert'>Dessert</label> 
      <TextField
        variant="outlined"
        margin="normal"
        inputRef={register}
        required
        fullWidth
        name="price"
        type="currency"
        id="Dsitem1"
        label="DsItem 1"
        name="Dsitem1"
      />
      </div>
    );
  }