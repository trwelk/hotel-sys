export const updateEmployee = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("employee").doc(payload.id).update({
            name:payload.name,
            emptype:payload.emptype,
            department:payload.department,
            designation:payload.designation,
            joineddate:payload.joineddate,
            reportsto:payload.reportsto,
            contactnumber:payload.contactnumber,
            address:payload.address,
            dob:payload.dob
        });
    }

}

export const insertEmployee = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('employee').doc(payload.id).set({
            ...payload
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

export const deleteEmployee = (empId) => {
    console.log(empId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('employee').doc(empId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}