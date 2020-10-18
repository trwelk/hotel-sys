// To generate default date selected by user
export const formatDate = (string) =>{
    var options = {year: 'numeric', month:'long', day:'numeric'};
    return new Date(string).toDateString([],options);
}

//CRUD Operations of Cash Outflow Table

//Update Cash Outflow
export const updateCashOut = (payload) => {
    console.log(payload)
    let outDate;
    if(payload.outDate !== null || payload.outDate !== ""){
        outDate = formatDate(payload.date);
    } else {
        outDate = null;
    }
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('cashOutflow').doc(payload.id).update({
          
            id:payload.id,
            date:outDate,
            department:payload.department,
            description:payload.description,
            category:payload.category,
            subCategory:payload.subCategory,
            invoiceAmount:payload.invoiceAmount
        });
    }

}

//Insert Cash Outflow
export const insertCashOut = (payload) => {
    console.log(payload)
    let outDate;
    if(payload.outDate !== null || payload.outDate !== ""){
        outDate = formatDate(payload.date);
    } else {
        outDate = null;
    }
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('cashOutflow').doc(payload.id).set({
       
            id:payload.id,
            date:outDate,
            department:payload.department,
            description:payload.description,
            category:payload.category,
            subCategory:payload.subCategory,
            invoiceAmount:payload.invoiceAmount

        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

//Delete Cash Outflow
export const deleteCashOut = (outflowID) => {
    console.log(outflowID)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('cashOutflow').doc(outflowID).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}