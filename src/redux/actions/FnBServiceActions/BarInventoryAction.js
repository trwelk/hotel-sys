// export const  formatDate = (string) => {
//     var options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(string).toLocaleDateString([],options);
// }
export const updateBarProduct = (payload) => {
    console.log(payload)
    // let date;
    // if(payload.date != null || payload.date != ""){
    //     date = formatDate(payload.date);
    // }
    // else{
    //     date = null;
    // }
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        // payload.BIID = payload.id + payload.BarInvNo;
        firestore.collection("barInventory").doc(payload.BarInvNo).update({
            BarInvNo:payload.BarInvNo,
            itemName:payload.itemName,
            id:payload.id, 
            qty:payload.qty,
            price:payload.price,
            date:payload.date
            // date:(new Date()).toDateString()
            // lastModified:payload.lastModified
            // tableNO: payload.tableNO,
            // room: payload.room,
            // description: payload.description,
            // status: payload.status
            // DateAndTime:payload.dateAndTime,
            // orId:payload.orId,
        });
    }
}

export const insertBarProduct = (payload) => {
    console.log(payload)
//     payload.date = (new Date()).toDateString();
//     if(payload.date != null || payload.date != ""){
//         payload.date = formatDate(payload.date);
//    }
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        // payload.BIID = payload.id + payload.BarInvNo;
        firestore.collection('barInventory').doc(payload.BarInvNo).set({
            ...payload
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteBarProduct = (InvId) => {
    console.log(InvId)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('barInventory').doc(InvId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}
// export const insertBarInvRec = (payload) => {
//     console.log(payload)
//     return (dispatch,getState,{getFirestore,getFirebase}) => {
//         const firestore = getFirestore();
//         firestore.collection('barInventory').doc(payload.BarInvNo).set({
//             ...payload
//         }).then((response) => {
//             console.log(response)
//         }).catch((response) => {
//             console.log(response)
//         })
//     }

// }
// export const updateBarInvRec = (payload) => {
//     console.log(payload)
//     return (dispatch,getState,{getFirestore,getFirebase}) => {
//         const firestore = getFirestore();
//         firestore.collection('barInventory').doc(payload.id).update({
//             id:payload.id,
//             itemName:payload.itemName,
//             price:payload.price,
//             qty:payload.qty,
//             expDate:payload.expDate,
//             lastModified:payload.lastModified,
//             stkStatus:payload.stkStatus
//         });
//     }

// }



// export const deleteBarInvRec = (InventoryId) => {
//     console.log(InventoryId)
//     return (dispatch,getState,{getFirestore,getFirebase}) => {
//         const firestore = getFirestore();
//         firestore.collection('barInventory').doc(InventoryId).delete()
//             .then((response) => {
//                 console.log(response)
//             }).catch((error) => {
//                 console.log(error)
//             })
//     }

// }


//----------------------------
// export const updateBarProduct = (payload) => {
//     console.log(payload)
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore();
//         payload.BIID = payload.id + payload.BarInvNo;
//         firestore.collection("inventoryProducts").doc(payload.BIID).update({
//             BarInvNo:payload.BarInvNo,
//             BIID:payload.BIID,
//             id:payload.id,
//             itemName:payload.itemName,
//             qty:payload.qty,
//             price:payload.price,
//             // tableNO: payload.tableNO,
//             // room: payload.room,
//             // description: payload.description,
//             // status: payload.status
//             // DateAndTime:payload.dateAndTime,
//             // orId:payload.orId,
//         });
//     }
// }

// export const insertBarProduct = (payload) => {
//     console.log(payload)
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore();
//         payload.BIID = payload.id + payload.BarInvNo;
//         firestore.collection('inventoryProducts').doc(payload.BIID).set({
//             ...payload
//         }).then((response) => {
//             console.log(response)
//         }).catch((response) => {
//             console.log(response)
//         })
//     }

// }

// export const deleteBarProduct = (InvId) => {
//     console.log(InvId)
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore();
//         firestore.collection('inventoryProducts').doc(InvId.BIID).delete()
//             .then((response) => {
//                 console.log(response)
//             }).catch((error) => {
//                 console.log(error)
//             })
//     }

// }
// export const insertBarInvRec = (payload) => {
//     console.log(payload)
//     return (dispatch,getState,{getFirestore,getFirebase}) => {
//         const firestore = getFirestore();
//         firestore.collection('barInventory').doc(payload.BarInvNo).set({
//             ...payload
//         }).then((response) => {
//             console.log(response)
//         }).catch((response) => {
//             console.log(response)
//         })
//     }

// }
// export const updateBarInvRec = (payload) => {
//     console.log(payload)
//     return (dispatch,getState,{getFirestore,getFirebase}) => {
//         const firestore = getFirestore();
//         firestore.collection('barInventory').doc(payload.id).update({
//             id:payload.id,
//             itemName:payload.itemName,
//             price:payload.price,
//             qty:payload.qty,
//             expDate:payload.expDate,
//             lastModified:payload.lastModified,
//             stkStatus:payload.stkStatus
//         });
//     }

// }



// export const deleteBarInvRec = (InventoryId) => {
//     console.log(InventoryId)
//     return (dispatch,getState,{getFirestore,getFirebase}) => {
//         const firestore = getFirestore();
//         firestore.collection('barInventory').doc(InventoryId).delete()
//             .then((response) => {
//                 console.log(response)
//             }).catch((error) => {
//                 console.log(error)
//             })
//     }

// }
