// To generate default date selected by user
export const formatDate = (string) =>{
    var options = {year: 'numeric', month:'long', day:'numeric'};
    return new Date(string).toDateString([],options);
}

//CRUD Operations of Attendance Table

//Update Attendance
export const updateAttendance = (payload) => {
    console.log(payload)

    let atDate;
    if(payload.atDate !== null || payload.atDate !== ""){
        atDate = formatDate(payload.date);
    } else {
        atDate 
        = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('attendanceFin').doc(payload.id).update({

            id:payload.id,
            employeeID:payload.employeeID,
            department:payload.department,
            month:payload.month,
            year:payload.year,
            totWDays:payload.totWDays,
            totWHours:payload.totWHours,
            actWDays:payload.actWDays,
            actWHours:payload.actWHours,
            allowances:payload.allowances,
            loan:payload.loan

        });
    }

}

//Insert Attendance
export const insertAttendance = (payload) => {
    console.log(payload)

    let atDate;
    if(payload.atDate !== null || payload.atDate !== ""){
        atDate = formatDate(payload.date);
    } else {
        atDate 
        = null;
    }

    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('attendanceFin').doc(payload.id).set({
            
            id:payload.id,
            employeeID:payload.employeeID,
            department:payload.department,
            month:payload.month,
            year:payload.year,
            totWDays:payload.totWDays,
            totWHours:payload.totWHours,
            actWDays:payload.actWDays,
            actWHours:payload.actWHours,
            allowances:payload.allowances,
            loan:payload.loan

        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

//Delete Attendance
export const deleteAttendance = (id) => {
    console.log(id)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('attendanceFin').doc(id).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}