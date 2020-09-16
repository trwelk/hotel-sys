export const updateCustomer = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("customer").doc(payload.id).update({
          ...payload
        });
    }

}

export const insertCustomer = (payload) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('customer').doc(payload.id).set({
            ...payload,
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

export const deleteCustomer = (roomId) => {
    console.log(roomId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('customer').doc(roomId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}
