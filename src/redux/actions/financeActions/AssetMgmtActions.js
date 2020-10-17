//CRUD Operations of Asset Management Table

//Update Asset List
export const updateAssetList = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('assetList').doc(payload.id).update({
        
            id:payload.id,
            requestID:payload.requestID,
            department:payload.department,
            purchaseDate:(new Date()).toDateString(),
            lifeYears:payload.lifeYears,
            purchaseValue:payload.purchaseValue,
            depriciation:payload.depriciation,
            assetStatus:payload.assetStatus

        }).then((response) => {
            console.log(response)
        })
    }
}

//Insert Asset List
export const insertAssetList = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('assetList').doc(payload.id).set({
         
            id:payload.id,
            requestID:payload.requestID,
            department:payload.department,
            purchaseDate:(new Date()).toDateString(),
            lifeYears:payload.lifeYears,
            purchaseValue:payload.purchaseValue,
            depriciation:payload.depriciation,
            assetStatus:payload.assetStatus

        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

//Delete Asset List
export const deleteAssetList = (assetID) => {
    console.log(assetID)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('assetList').doc(assetID).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}