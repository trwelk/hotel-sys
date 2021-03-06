import React from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { firestoreConnect } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {insertAbsence, updateAbsence, deleteAbsence} from '../../../redux/actions/hrActions/AbsenceActions'
import Button from '@material-ui/core/Button';
import jsPDF from "jspdf";
import "jspdf-autotable";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  
}));



function AbsenceList(props) {
 
    const classes = useStyles();
    const { useState } = React;
    const [columns, setColumns] = useState([
      { title: 'Absence Id', field: 'id', editable: 'never'},
      { title: 'Employee Id', field: 'employee'},
      { title: 'Absence Type', field: 'abtype', lookup: {SICK: 'Sick', CASUAL: 'Casual', NOPAY: 'No Pay Leave'}},
      { title: 'From Date', field: 'from'},
      { title: 'To Date', field: 'to'},
      { title: 'Total Days', field: 'days' },
      { title: 'Absence Reason', field: 'reason'},
      { title: 'Status', field: 'status'},
      
    ]);
    const absences = useSelector(state => state.firestore.ordered.absence)
    const data = absences ? (absences.map(absence => ({...absence,
        days:moment(absence.to, 'MM-DD-YYYY').diff(moment(absence.from),'days',true)}))) : (null)

    const monthlyAbsences = absences ? (absences.map(absence => ({...absence,month:absence.from.toDate().getMonth()}))) : (null)
    var monthlyData = [[],[],[],[],[],[],[],[],[],[],[],[]]
    let numberOfEmployees = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (let a = 0 ; a < 12 ; a++){
        monthlyData[a] = monthlyAbsences ? monthlyAbsences.filter(absence => absence.month == a) : [];
        monthlyData[a].forEach((item) => {
            console.log(parseInt(monthlyData[a]))
            numberOfEmployees[a] += item.numberOfPacks ? parseInt(item.numberOfPacks) : 0
        })
    }
    const [state, setState] = React.useState({
      open: false,
      vertical: 'bottom',
      horizontal: 'right',
    });
    const { vertical, horizontal, open ,error} = state


    const validateData___  = (data) => {
      if(data.employee == null || data.employee == ""){
        return "Field EMPLOYEE Cannot be null"
      }
      else if(data.abtype == null || data.abtype == ""){
        return "Field ABSENCE TYPE Cannot be null"
      }
      else if(data.from == null || data.from == ""){
        return "Field FROM DATE Cannot be null, Enter a date"
      }
      else if(data.to == null || data.to == ""){
        return "Field TO DATE Cannot be null"
      }
      else if(data.reason= null || data.reason == ""){
        return "Must have a reason for Absence"
      }
      else
      return null;
    }

    const handleClick = (newState) => () => {
      setState({ open: true, ...newState });
    };
  
    const handleClose = () => {
      setState({ ...state, open: false });
    };

    const exportPDF = () =>{
      const doc = new jsPDF();
      const tableColumn = ["Id", "Title", "Issue", "Status", "Closed on"];
      const tableRows = [];
    }
    const handleDemo = () => {
      props.insertAbsence({
        id:"EM125",
        emptype:"PERMANENT",
        name:"TREVENGER",
        reportsto:40,
        contactnumber:"0771231231",
        department:"FINANCE",
        designation:"SOMETHING",
        address:"ABC/d"
      });
    }
  

    const table = data ? (
        <div>
          {/* <Button variant="contained" color="secondary" onClick={()=>exportPdf()}>
            Export as Pdf
          </Button> */}
        <MaterialTable
        options={{
          exportButton: true,
          grouping: true,
          filtering: true
        }}
        columns={columns}
        data={data}
        editable={{
          /* onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
                if (error != null){
                  reject();
                  setState({ ...state, open: true,error:error });
                }
                else{
              setTimeout(() => {
                //setData([...data, newData]);
                props.insertAbsence(newData)
                resolve();
              }, 1000)}
            }) */
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const error = validateData___(newData);
                if (error != null){
                  reject();
                  setState({ ...state, open: true,error:error });
                }
                else{
              setTimeout(() => {
                
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                //setData([...dataUpdate]);
                console.log(newData,oldData)
                props.updateAbsence(newData)
                resolve();
              }, 1000)}
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                //setData([...dataDelete]);
                console.log(oldData)
                props.deleteAbsence(oldData.id)
                resolve()
              }, 1000)
            }),
        }}
        components={{
        Toolbar: props => (
          <div>
            <MTableToolbar {...props} />
            <div style={{padding: '0px 10px'}}>
              <Button onClick={handleDemo}>Demo</Button>
          </div>
          </div>
        ),
      }}
      />
      </div>
    ) : (<div>Loading</div>)


    const feedBackToast =  (<Snackbar 
      autoHideDuration={200000}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
      >
          <div className={classes.root}>

        <Alert variant="filled" severity="error" style={{display: "flex",alignItems: "center"}}>
        <h3>{error}</h3>
        
        </Alert>
        </div>
      </Snackbar>)
  

  
    return(
        <div>
             {table}
             {feedBackToast}
        </div>
       
        )
  }

 
const mapDispatchToProps = (dispatch) => {
    return {
        insertAbsence: (payload) => dispatch(insertAbsence(payload)),
        updateAbsence: (payload) => dispatch(updateAbsence(payload)),
        deleteAbsence: (abId) => dispatch(deleteAbsence(abId))
    }
}
  export default compose(connect(null,mapDispatchToProps),firestoreConnect([
    {collection: 'absence'}
  ])) (AbsenceList)