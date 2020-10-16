export const updateProduct = (payload,pType,priority,sName) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("productMng").doc(payload.oId).update({
            oId:payload.oId,
            sName:payload.sName,
            pType:payload.pType,
            priority:payload.priority,
            qty:payload.qty,
            date:payload.date
            //status:payload.status
        }); 
    }

}

export const insertProduct = (payload,pType,priority,sName) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('productMng').doc(payload.oId).set({
            oId:payload.oId,
            sName:sName,
            pType:pType,
            priority:priority,
            qty:payload.qty,
            date:payload.date
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteProduct = (productId) => {
    console.log(productId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('productMng').doc(productId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}