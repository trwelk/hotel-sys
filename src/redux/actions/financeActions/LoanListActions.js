// To generate default date selected by user
export const formatDate = (string) =>{
    var options = {year: 'numeric', month:'long', day:'numeric'};
    return new Date(string).toDateString([],options);
}

//CRUD Operations of Loan Issue Table

//Update Loan Issue
export const updateLoanIssue = (payload) => {
    console.log(payload)

    let liDate;
    if(payload.liDate !== null || payload.liDate !== ""){
        liDate = formatDate(payload.date);
    } else {
        liDate 
        = null;
    }

    
    let isDate;
    if(payload.isDate !== null || payload.isDate !== ""){
        isDate = formatDate(payload.date);
    } else {
        isDate 
        = null;
    }

    let fiDate;
    if(payload.fiDate !== null || payload.fiDate !== ""){
        fiDate = formatDate(payload.date);
    } else {
        fiDate 
        = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('loanIssue').doc(payload.id).update({

            id:payload.id,
            loanRequestID:payload.loanRequestID,
            //reqDate:liDate,
            //issueDate:isDate,
            duration:payload.duration,
            //finalDate:fiDate,
            loanLimit:payload.loanLimit,
            loanAmount:payload.loanAmount,
            amountPaid:payload.amountPaid
            //status:payload.status

        });
    }

}

//Update Insert Issue
export const insertLoanIssue = (payload) => {
    console.log(payload)

    let liDate;
    if(payload.liDate !== null || payload.liDate !== ""){
        liDate = formatDate(payload.date);
    } else {
        liDate 
        = null;
    }

    let isDate;
    if(payload.isDate !== null || payload.isDate !== ""){
        isDate = formatDate(payload.date);
    } else {
        isDate 
        = null;
    }

    let fiDate;
    if(payload.fiDate !== null || payload.fiDate !== ""){
        fiDate = formatDate(payload.date);
    } else {
        fiDate 
        = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('loanIssue').doc(payload.id).set({
            
            id:payload.id,
            loanRequestID:payload.loanRequestID,
            //reqDate:liDate,
            //issueDate:isDate,
            duration:payload.duration,
            //finalDate:fiDate,
            loanLimit:payload.loanLimit,
            loanAmount:payload.loanAmount,
            amountPaid:payload.amountPaid

        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

//Delete Loan Issue
export const deleteLoanIssue = (loanID) => {
    console.log(loanID)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('loanIssue').doc(loanID).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}