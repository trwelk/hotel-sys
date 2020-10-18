// To generate default date selected by user
export const formatDate = (string) =>{
    var options = {year: 'numeric', month:'long', day:'numeric'};
    return new Date(string).toDateString([],options);
}

//CRUD Operations of Salary Management Table

//Update Salary Management
export const updateSalary = (payload) => {
    console.log(payload)

    let smDate;
    if(payload.smDate !== null || payload.smDate !== ""){
        smDate = formatDate(payload.date);
    } else {
        smDate 
        = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('salaryMgmt').doc(payload.id).update({
            
            id:payload.id,
            attendanceID:payload.attendanceID,
            basicSalary:payload.basicSalary,
            noPay:payload.noPay,
            otPay:payload.otPay,
            allowances:payload.allowances,
            serCharges:payload.serCharges,
            loan:payload.loan,
            epf:payload.epf
        });
    }

}

//Insert Salary Management
export const insertSalary = (payload) => {
    console.log(payload)

    let smDate;
    if(payload.smDate !== null || payload.smDate !== ""){
        smDate = formatDate(payload.date);
    } else {
        smDate 
        = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('salaryMgmt').doc(payload.id).set({
            
            id:payload.id,
            attendanceID:payload.attendanceID,
            basicSalary:payload.basicSalary,
            noPay:payload.noPay,
            otPay:payload.otPay,
            allowances:payload.allowances,
            serCharges:payload.serCharges,
            loan:payload.loan,
            epf:payload.epf

        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

//Delete Salary Management
export const deleteSalary = (salaryID) => {
    console.log(salaryID)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('salaryMgmt').doc(salaryID).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}