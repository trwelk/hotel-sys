// To generate default date selected by user
export const formatDate = (string) =>{
    var options = {year: 'numeric', month:'long', day:'numeric'};
    return new Date(string).toDateString([],options);
}


//CRUD Operations of Back-Invoice Table

//Update Back-Invoice
export const updateBarInvoice = (payload) => {
    console.log(payload)

    let barDate;
    if(payload.barDate !== null || payload.barDate !== ""){
        barDate = formatDate(payload.date);
    } else {
        barDate 
        = null;
    }
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('barInvoice').doc(payload.id).update({

            id:payload.id,
            date:barDate,
            preparedBy:payload.preparedBy,
            customerType:payload.customerType,
            invoiceAmount:payload.invoiceAmount,
            serviceCharges:payload.serviceCharges,
            paymentType:payload.paymentType,
            tax:payload.tax

        });
    }

}

//Insert Back-Invoice
export const insertBarInvoice = (payload) => {
    console.log(payload)

    let barDate;
    if(payload.barDate !== null || payload.barDate !== ""){
        barDate = formatDate(payload.date);
    } else {
        barDate = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('barInvoice').doc(payload.id).set({
            
            id:payload.id,
            date:barDate,
            preparedBy:payload.preparedBy,
            customerType:payload.customerType,
            invoiceAmount:payload.invoiceAmount,
            serviceCharges:payload.serviceCharges,
            paymentType:payload.paymentType,
            tax:payload.tax

        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

//Delete Back-Invoice
export const deleteBarInvoice = (barInvoice) => {
    console.log(barInvoice)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('barInvoice').doc(barInvoice).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}