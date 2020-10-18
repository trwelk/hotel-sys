// To generate default date selected by user
export const formatDate = (string) =>{
    var options = {year: 'numeric', month:'long', day:'numeric'};
    return new Date(string).toDateString([],options);
}

//CRUD Operations of PettyCash Table

//Update PettyCash
export const updatePettyCash = (payload) => {
    console.log(payload)

    let pmDate;
    if(payload.pmDate !== null || payload.pmDate !== ""){
        pmDate = formatDate(payload.date);
    } else {
        pmDate = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('pettycashManagement').doc(payload.id).update({
            
            id:payload.id,
            voucherNo:payload.voucherNo,
            date:pmDate,
            requestedAmount:payload.requestedAmount,
            issuedAmount:payload.issuedAmount,
            balanceAmount:payload.balanceAmount,
            variance:payload.variance

        });
    }

}

//Insert PettyCash
export const insertPettyCash = (payload) => {
    console.log(payload)

    let pmDate;
    if(payload.pmDate !== null || payload.pmDate !== ""){
        pmDate = formatDate(payload.date);
    } else {
        pmDate = null;
    }
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('pettycashManagement').doc(payload.id).set({
            
            id:payload.id,
            voucherNo:payload.voucherNo,
            date:pmDate,
            requestedAmount:payload.requestedAmount,
            issuedAmount:payload.issuedAmount,
            balanceAmount:payload.balanceAmount,
            variance:payload.variance

        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

//Delete PettyCash
export const deletePettyCash = (voucherNo) => {
    console.log(voucherNo)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('pettycashManagement').doc(voucherNo).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}