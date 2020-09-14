export const updateOrderType = (payload) => {
    console.log(payload)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection("orderProducts").doc(payload.id).update({
            ID:payload.id,
            Name:payload.ProName,
            Quntity:payload.quntity,
            Amount:payload.amount
            // tableNO: payload.tableNO,
            // room: payload.room,
            // description: payload.description,
            // status: payload.status
            // DateAndTime:payload.dateAndTime,
            // orId:payload.orId,
        });
    }
}

export const insertOrderType = (payload) => {
    console.log(payload)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('orderProducts').doc(payload.id).set({
            ...payload
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteOrderType = (orderId) => {
    console.log(orderId)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('orderProducts').doc(orderId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}



// export const updateOrderType = (payload) => {
//     console.log(payload)
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore();
//         firestore.collection("foodOrder").doc(payload.id).update({
//             tableNO: payload.tableNO,
//             room: payload.room,
//             description: payload.description,
//             status: payload.status
//             // DateAndTime:payload.dateAndTime,
//             // ID:payload.Proid,
//             // Name:payload.ProName,
//             // Quntity:payload.quntity,
//             // Amount:payload.Amount,
//             // orId:payload.orId,
//         });
//     }
// }

// export const insertOrderType = (payload) => {
//     console.log(payload)
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore();
//         firestore.collection('foodOrder').doc(payload.id).set({
//             ...payload
//         }).then((response) => {
//             console.log(response)
//         }).catch((response) => {
//             console.log(response)
//         })
//     }

// }

// export const deleteOrderType = (orderId) => {
//     console.log(orderId)
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore();
//         firestore.collection('foodOrder').doc(orderId).delete()
//             .then((response) => {
//                 console.log(response)
//             }).catch((error) => {
//                 console.log(error)
//             })
//     }

// }
// export const updateOrderType1 = (payload1) => {
//     console.log(payload1)
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore();
//         firestore.collection("orderProducts").doc(payload1.Proid).update({
//             ID: payload1.orId,
//             // TableNO:payload.tableNO,
//             // RoomNO:payload.room,
//             // description:payload.description,
//             // Status:payload.status,
//             // DateAndTime: payload1.dateAndTime,
//             ProductID: payload1.Proid,
//             ProductName: payload1.ProName,
//             Quntity: payload1.quntity,
//             Amount: payload1.Amount,
//         });
//     }
// }

// export const insertOrderType1 = (payload1) => {
//     console.log(payload1)
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore();
//         firestore.collection('orderProducts').doc(payload1.Proid).set({
//             ...payload1
//         }).then((response) => {
//             console.log(response)
//         }).catch((response) => {
//             console.log(response)
//         })
//     }

// }

// export const deleteOrderType1 = (payload1) => {
//     console.log(payload1)
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore();
//         firestore.collection('orderProducts').doc(payload1).delete()
//             .then((response) => {
//                 console.log(response)
//             }).catch((error) => {
//                 console.log(error)
//             })
//     }

// }