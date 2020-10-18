// To generate default date selected by user
export const formatDate = (string) =>{
    var options = {year: 'numeric', month:'long', day:'numeric'};
    return new Date(string).toDateString([],options);
}

//CRUD Operations of Cash Inflow Table

//Update Cash Inflow
export const updateCashIn = (payload) => {
    console.log(payload)
    let inDate;
    if(payload.inDate !== null || payload.inDate !== ""){
        inDate = formatDate(payload.date);
    } else {
        inDate = null;
    }
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('cashInflow').doc(payload.id).update({
            id:payload.id,
            date:inDate,
            description:payload.description,
            category:payload.category,
            invoiceAmount:payload.invoiceAmount

        });
    }

}

//Insert Cash Inflow
export const insertCashIn = (payload) => {
    console.log(payload)
    let inDate;
    if(payload.inDate !== null || payload.inDate !== ""){
        inDate = formatDate(payload.date);
    } else {
        inDate = null;
    }
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('cashInflow').doc(payload.id).set({

            id:payload.id,
            date:inDate,
            description:payload.description,
            category:payload.category,
            invoiceAmount:payload.invoiceAmount

        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

//Delete Cash Inflow
export const deleteCashIn = (inflowID) => {
    console.log(inflowID)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('cashInflow').doc(inflowID).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}