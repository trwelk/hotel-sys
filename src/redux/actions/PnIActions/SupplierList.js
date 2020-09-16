export const updateSupplierInfo = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('supplier').doc(payload.sId).update({
            firstName:payload.firstName,
            lastName:payload.lastName,
            email:payload.email,
            phone:payload.phone,
            itemtype:payload.itemtype,
            location:payload.location,
            department:payload.department,
            date:payload.date
        }); 
    }

}

export const insertSupplierInfo = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('supplier').doc(payload.sId).set({
            sId:payload.sId,
            firstName:payload.firstName,
            lastName:payload.lastName,
            email:payload.email,
            itemtype:payload.itemtype,
            phone:payload.phone,
            location:payload.loaction,
            department:payload.department,
            date:payload.date
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