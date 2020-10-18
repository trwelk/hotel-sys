// To generate default date selected by user
export const formatDate = (string) =>{
    var options = {year: 'numeric', month:'long', day:'numeric'};
    return new Date(string).toDateString([],options);
}

//CRUD Operations of Front-Invoice Table

//Update Front-Invoice
export const updateFrontInvoice = (payload) => {
    console.log(payload)

    let inDate;
    if(payload.inDate !== null || payload.inDate !== ""){
        inDate = formatDate(payload.date);
    } else {
        inDate 
        = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('frontInvoice').doc(payload.id).update({
            
            id:payload.id,
            date:inDate,
            preparedBy:payload.preparedBy,
            customerType:payload.customerType,
            roomCharges:payload.roomCharges,
            houseCharges:payload.houseCharges,
            fnbCharges:payload.fnbCharges,
            shuttleCharges:payload.shuttleCharges,
            serviceCharges:payload.serviceCharges,
            otherCharges:payload.otherCharges,
            paymentType:payload.paymentType,
            tax:payload.tax
            //totalAmount
        });
    }

}

//Insert Front-Invoice
export const insertFrontInvoice = (payload) => {
    console.log(payload)

    let inDate;
    if(payload.inDate !== null || payload.inDate !== ""){
        inDate = formatDate(payload.date);
    } else {
        inDate 
        = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('frontInvoice').doc(payload.id).set({

            id:payload.id,
            date:inDate,
            preparedBy:payload.preparedBy,
            customerType:payload.customerType,
            roomCharges:payload.roomCharges,
            houseCharges:payload.houseCharges,
            fnbCharges:payload.fnbCharges,
            shuttleCharges:payload.shuttleCharges,
            serviceCharges:payload.serviceCharges,
            otherCharges:payload.otherCharges,
            paymentType:payload.paymentType,
            tax:payload.tax
            //totalAmount

        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

//Delete Front-Invoice
export const deleteFrontInvoice = (frontInvoice) => {
    console.log(frontInvoice)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('frontInvoice').doc(frontInvoice).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}