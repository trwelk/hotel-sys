export const updateMenu = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('Menu').doc(payload.id).update({
            id:payload.id,
            menuName:payload.menuName,
            price:payload.price,
            lastModified:payload.lastModified,
            menutype:payload.menutype
        });
    }

}

export const insertMenu = (payload,ItemsPayload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('Menu').doc(payload.id).set({
            id:payload.id,
            menuName:payload.menuName,
            price:payload.price,
            menutype:payload.menuType            
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
        if(payload.menuType == 1){
        firestore.collection('Menu').doc(payload.id).collection('MenuItems').doc(payload.id).set({
            Wlitem1:ItemsPayload.Wlitem1,
            Mditem1:ItemsPayload.Mditem1,Mditem2:ItemsPayload.Mditem2,Mditem3:ItemsPayload.Mditem3,
            Sditem1:ItemsPayload.Sditem1,Sditem2:ItemsPayload.Sditem2,Sditem3:ItemsPayload.Sditem3,
            Dsitem1:ItemsPayload.Dsitem1,Dsitem2:ItemsPayload.Dsitem2,Dsitem3:ItemsPayload.Sditem3
        })
        }
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