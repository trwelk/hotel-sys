export const updateOrderType = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("foodOrder").doc(payload.orId).update({
            // ID:payload.orId,
            TableNO:payload.tableNO,
            RoomNO:payload.room,
            description:payload.description,
            Status:payload.status,
            // DateAndTime:payload.dateAndTime,
            // ID:payload.Proid,
            // Name:payload.ProName,
            // Quntity:payload.quntity,
            // Amount:payload.Amount,
        });
    }
}

export const insertOrderType = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('foodOrder').doc(payload.orId).set({
            ...payload
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteOrderType = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('foodOrder').doc(payload).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}
export const updateOrderType1 = (payload1) => {
    console.log(payload1)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("orderProducts").doc(payload1.id).update({
            ID:payload1.orId,
            // TableNO:payload.tableNO,
            // RoomNO:payload.room,
            // description:payload.description,
            // Status:payload.status,
            DateAndTime:payload1.dateAndTime,
            ProductID:payload1.Proid,
            ProductName:payload1.ProName,
            Quntity:payload1.quntity,
            Amount:payload1.Amount,
        });
    }
}

export const insertOrderType1 = (payload1) => {
    console.log(payload1)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('orderProducts').doc(payload1.id).set({
            ...payload1
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteOrderType1 = (payload1) => {
    console.log(payload1)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('orderProducts').doc(payload1).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}