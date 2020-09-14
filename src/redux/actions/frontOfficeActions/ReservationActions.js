import firebase from 'firebase/app'

export const updateReservation = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("reservation").doc(payload.id).update({
          ...payload
        });
    }

}

export const insertReservation = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        const {name,customerEmail ,additional,roomType,startDay,endDay,phone,roomId,roomNo} = payload;
        const state = getState();
        console.log(payload)
        firestore.collection('reservation').add({
            customerEmail:customerEmail,
            endDay:firebase.firestore.Timestamp.fromDate(new Date(state.frontOffice.selectedDate)),
            roomType:roomType,
            startDay:firebase.firestore.Timestamp.fromDate(new Date(state.frontOffice.selectedDate)),
            status:'Open',
            roomNo:roomNo
        }).then((doc) => {
            console.log("Document written with ID: ", doc.id);
        }).catch((error) => {
            console.log("Error writing reservation ", error);
        })
    }
}

export const deleteReservation = (ReservationId) => {
    console.log(ReservationId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('reservation').doc(ReservationId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}
