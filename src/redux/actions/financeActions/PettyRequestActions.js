// To generate default date selected by user
export const formatDate = (string) =>{
    var options = {year: 'numeric', month:'long', day:'numeric'};
    return new Date(string).toDateString([],options);
}


//CRUD Operations of PettyCash Request Table

//Update PettyCash Request
export const updatePettyRequest = (payload) => {
    console.log(payload)

    let prDate;
    if(payload.prDate !== null || payload.prDate !== ""){
        prDate = formatDate(payload.date);
    } else {
        prDate = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('pettycashRequest').doc(payload.id).update({
            
            id:payload.id,
            date:prDate,
            requestedBy:payload.requestedBy,
            department:payload.department,
            description:payload.description,
            requestedAmount:payload.requestedAmount,
            status:payload.status
        });
    }

}

//Insert PettyCash Request
export const insertPettyRequest = (payload) => {
    console.log(payload)

    let prDate;
    if(payload.prDate !== null || payload.prDate !== ""){
        prDate = formatDate(payload.date);
    } else {
        prDate = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('pettycashRequest').doc(payload.id).set({
            
            id:payload.id,
            date:prDate,
            requestedBy:payload.requestedBy,
            department:payload.department,
            description:payload.description,
            requestedAmount:payload.requestedAmount,
            status:payload.status

        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

//Delete PettyCash Request
export const deletePettyRequest = (voucherNo) => {
    console.log(voucherNo)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('pettycashRequest').doc(voucherNo).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}