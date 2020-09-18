export const updateInvRec = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('fnbInventory').doc(payload.id).update({
            id:payload.id,
            itemName:payload.itemName,
            price:payload.price,
            qty:payload.qty,
            expDate:payload.expDate.toDateString(),
            lastModified:(new Date()).toDateString(),
            stkStatus:payload.stkStatus
        });
    }

}

export const insertInvRec = (payload) => {
    console.log(payload)
    payload.lastModified = (new Date()).toDateString();
    payload.expDate = payload.expDate.toDateString();
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('fnbInventory').doc(payload.id).set({
            ...payload
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteInvRec = (InventoryId) => {
    console.log(InventoryId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('fnbInventory').doc(InventoryId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}