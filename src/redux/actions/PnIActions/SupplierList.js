export const updateSupplierInfo = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('supplier').doc(payload.sId).update({
            name:payload.sName,
            email:payload.email,
            phone:payload.phone,
            itemtype:payload.itemtype,
            location:payload.location,
            department:payload.department,
            period:payload.period
        }); 
    }

}

export const insertSupplierInfo = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('supplier').doc(payload.sId).set({
            ...payload
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteSupplierInfo = (supplierId) => {
    console.log(supplierId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('supplier').doc(supplierId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}