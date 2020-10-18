// To generate default date selected by user
export const formatDate = (string) =>{
    var options = {year: 'numeric', month:'long', day:'numeric'};
    return new Date(string).toDateString([],options);
}

//CRUD Operations of Loan Request Table

//Update Loan Request
export const updateLoanRequest = (payload) => {
    console.log(payload)

    let lrDate;
    if(payload.lrDate !== null || payload.lrDate !== ""){
        lrDate = formatDate(payload.date);
    } else {
        lrDate 
        = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('loanRequest').doc(payload.id).update({
            
            id:payload.id,
            date:lrDate,
            appliedBy:payload.appliedBy,
            department:payload.department,
            loanAmount:payload.loanAmount,
            duration:payload.duration,
            status:payload.status

        });
    }

}

//Insert Loan Request
export const insertLoanRequest = (payload) => {
    console.log(payload)

    let lrDate;
    if(payload.lrDate !== null || payload.lrDate !== ""){
        lrDate = formatDate(payload.date);
    } else {
        lrDate 
        = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('loanRequest').doc(payload.id).set({
            
            id:payload.id,
            date:lrDate,
            appliedBy:payload.appliedBy,
            department:payload.department,
            loanAmount:payload.loanAmount,
            duration:payload.duration,
            status:payload.status   

        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

//Delete Loan Request
export const deleteLoanRequest = (loanRequest) => {
    console.log(loanRequest)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('loanRequest').doc(loanRequest).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}