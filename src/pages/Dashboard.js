import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from '../components/layout/Navigator';
import Content from '../components/layout/LayoutContent';
import Header from '../components/layout/Header';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import LayoutContent from '../components/layout/LayoutContent';
import ReservatonBoxView from '../components/frontOffice/reservation/ReservationBoxView';
//import Finance from '../components/frontOffice/Finance';
import Editable from '../components/frontOffice/rooms/Editable';
import fnbProdMgmt from '../components/F&bProduction/management/fnbProdMgmt';
import EmployeeList from '../components/hr/employee/EmployeeList';
import PettyRequest from '../components/finance/petty/PettyRequest';
import PettyCashManagement from '../components/finance/petty/PettyCashManagement';
import PettyCashMain from '../components/finance/petty/PettyCashMain';
import CashFlowMain from '../components/finance/cashflow/CashFlowMain';
import CashInflow from '../components/finance/cashflow/CashInflow';
import CashOutFlow from '../components/finance/cashflow/CashOutFlow';
import AssetMain from '../components/finance/asset/AssetMain';
import AssetRequest from '../components/finance/asset/AssetRequest';
import AssetList from '../components/finance/asset/AssetList';
import BarInvoice from '../components/finance/invoice/BarInvoice';
import FrontInvoice from '../components/finance/invoice/FrontInvoice';
import InvoiceMain from '../components/finance/invoice/InvoiceMain';
import LoanMain from '../components/finance/loan/LoanMain';
import Loan from '../components/finance/loan/Loan';
import LoanIssue from '../components/finance/loan/LoanIssue';
import SalaryMain from '../components/finance/salary/SalaryMain';
import Attendance from '../components/finance/salary/Attendance';
import SalaryMgmt from '../components/finance/salary/SalaryMgmt';


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

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
};

function Dashboard(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <main className={classes.main}>

            <Switch>    
            <Route exact path='/' component={LayoutContent}/>
            <Route exact path='/res' component={ReservatonBoxView}/>
            <Route exact path='/ed' component={Editable}/>
            <Route exact path='/Food & Beverages' component={fnbProdMgmt}/>
            <Route exact path="/hr/employee" component={EmployeeList}/>
            <Route exact path='/finance/assetmain' component={AssetMain} />
            <Route exact path = '/finance/assetrequest' component = {AssetRequest} />
            <Route exact path='/finance/assetlist' component={AssetList} />
            <Route exact path='/finance/cashmain' component={CashFlowMain}/>
            <Route exact path='/finance/cashin' component={CashInflow}/>
            <Route exact path='/finance/cashout' component={CashOutFlow}/>
            <Route exact path='/finance/invoicemain' component={InvoiceMain}/>
            <Route exact path='/finance/invoicefront' component={FrontInvoice}/>
            <Route exact path='/finance/invoicebar' component={BarInvoice}/>
            <Route exact path='/finance/loanmain' component={LoanMain} />
            <Route exact path='/finance/loanrequest' component={Loan} />
            <Route exact path='/finance/loanissue' component={LoanIssue} />
            <Route exact path='/finance/pettymain' component={PettyCashMain} />
            <Route exact path="/finance/pettyrequest" component={PettyRequest}/>
            <Route exact path='/finance/pettymanagement' component={PettyCashManagement} />
            <Route exact path = '/finance/salarymain' component = {SalaryMain} />
            <Route exact path = '/finance/salattendance' component = {Attendance} />
            <Route exact path = '/finance/salary' component = {SalaryMgmt} />


           
          
            </Switch>

          </main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
    </BrowserRouter>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);