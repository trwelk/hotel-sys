import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormControl } from '@material-ui/core';
import { InputLabel, Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { insertPurchasesRequest } from '../../../redux/actions/PnIActions/requestHandler';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function PurchasesRequest() {
    const classes = useStyles();
    const [ type, setType ] = React.useState(1);


    const handleChange = (event) => {
        setType(event.target.value);
    }

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AddShoppingCartIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Place Your Purchases Request Here...
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="pId"
                                label="Product ID"
                                name="pId"
                                autoComplete="off"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="pName"
                                label="Product Name"
                                name="pName"
                                autoComplete="off"
                                autoFocus
                            />
                        </Grid>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="date"
                            name="date"
                            type="date"
                            autoComplete="off"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="qty"
                            label="Quantity"
                            name="qty"
                            type="number"
                            autoConmplete="off"
                            autoFocus
                        />
                        <FormControl varient="outlined" required fullWidth>
                            <InputLabel id="department">Department</InputLabel>
                            <Select
                                id="department"
                                labelId="department"
                                value={type}
                                onChange={handleChange}>
                                <MenuItem value={"frontOffice"}>Front Office</MenuItem>
                                <MenuItem value={"finance"}>Finance</MenuItem>
                                <MenuItem value={"humanResources"}>Human Resources</MenuItem>
                                <MenuItem value={"fnb"}>Food and Beverages</MenuItem>
                                <MenuItem value={"maintainance"}>Maintainance</MenuItem>
                                <MenuItem value={"housekeeping"}>House Keeping</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl varient="outlined" required fullWidth>
                            <InputLabel> Priority</InputLabel>
                            <Select
                                id="priority"
                                labelId="Priority"
                                value={type}
                                onChange={handleChange}>
                                <MenuItem value={"critical"}>Critical</MenuItem>
                                <MenuItem value={"important"}>Important</MenuItem>
                                <MenuItem value={"normal"}>Normal</MenuItem>
                                <MenuItem value={"low"}>Low</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
          </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
              </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
            insertPurchasesRequest: (payload) => dispatch(insertPurchasesRequest(payload)),
    }
  }
  export default compose(connect(null, mapDispatchToProps), firestoreConnect([
    {collection: 'request' }]))
    (PurchasesRequest)