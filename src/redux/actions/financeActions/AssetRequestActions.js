// To generate default date selected by user
export const formatDate = (string) =>{
    var options = {year: 'numeric', month:'long', day:'numeric'};
    return new Date(string).toDateString([],options);
}

//CRUD Operations of Asset Management Table

//Update Asset Request
export const updateAssetRequest = (payload) => {
    console.log(payload)

    let reqDate;
    if(payload.reqDate !== null || payload.reqDate !== ""){
        reqDate = formatDate(payload.date);
    } else {
        reqDate = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('assetRequest').doc(payload.id).update({
           
            id:payload.id,
            date:reqDate,
            assetType:payload.assetType,
            description:payload.description,
            quantity:payload.quantity,
            unitPrice:payload.unitPrice,
            //totalAmount:payload.totalAmount,
            status:payload.status,
            lastUpdate:(new Date()).toDateString()
       
        }).then((response) => {
            console.log(response)
        })
    }
}

//Insert Asset Request
export const insertAssetRequest = (payload) => {
    console.log(payload)
    let reqDate;
    if(payload.reqDate !== null || payload.reqDate !== ""){
        reqDate = formatDate(payload.date);
    } else {
        reqDate = null;
    }
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('assetRequest').doc(payload.id).set({
            
            id:payload.id,
            date:reqDate,
            assetType:payload.assetType,
            description:payload.description,
            quantity:payload.quantity,
            unitPrice:payload.unitPrice,
            //totalAmount:payload.totalAmount,
            status:payload.status,
            lastUpdate:(new Date()).toDateString()

        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

//Delete Asset Request
export const deleteAssetRequest = (requestID) => {
    console.log(requestID)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('assetRequest').doc(requestID).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}