export const updateMenu = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('Menu').doc(payload.id).update({
            id:payload.id,
            menuName:payload.menuName,
            price:payload.price,
            lastModified:payload.lastModified,
            type:payload.type
        });
    }

}

export const insertMenu = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('Menu').doc(payload.id).set({
            id:payload.id,
            menuName:payload.menuName,
            price:payload.price,
            // type:payload.type
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteMenu = (MenuId) => {
    console.log(MenuId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('Menu').doc(MenuId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}