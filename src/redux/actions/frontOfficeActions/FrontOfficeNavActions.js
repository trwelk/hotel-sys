export const onMasterClick = (roomType) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
             dispatch({type:'MASTER_ROOM_TYPE_SELECTED',
                        roomType:roomType})
    }
}



export const handleMonthPickReservation = (month) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        console.log(getState())

             dispatch({type:'MONTH_SELECTED',
                        month:month -1})
    }
}


export const handleDayPick = (day) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        console.log(day)

             dispatch({type:'DAY_SELECTED',
                        day:day})
    }
}