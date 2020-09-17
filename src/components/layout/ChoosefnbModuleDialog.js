import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { ButtonGroup } from '@material-ui/core';
import { ButtonToggle } from 'reactstrap';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  button: {
  margin: theme.spacing(3, 0, 2),
  },
}));

export default function ChooseModuleDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClose = () => {
    setOpen(false);
  }

  return (

      <Dialog
        maxWidth="md"
        open={open}
        aria-labelledby="max-width-dialog-title"
      >
        <ButtonToggle>
    <Button href='/fnbProduction'
                variant="contained"
                color="primary"
                className={classes.button}
                >Production</Button>
    <Button href='/foodOrder'
                variant="contained"
                color="primary"
                className={classes.button}>Services</Button>
                </ButtonToggle>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined' color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}
