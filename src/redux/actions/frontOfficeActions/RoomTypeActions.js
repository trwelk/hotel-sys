export const updateRoomType = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("roomtype").doc(payload.id).update({
            name:payload.name,
            brief:payload.brief,
            description:payload.description
        });
    }

}

export const insertRoomType = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('roomtype').doc(payload.id).set({
            ...payload
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteRoomType = (roomId) => {
    console.log(roomId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('roomtype').doc(roomId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}