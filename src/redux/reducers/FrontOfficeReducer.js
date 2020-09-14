const initState = {
    selectedRoom:null,
    selectedMonth:9,
    selectedDay:2
}

const FrontOfficeReducer = (state = initState, action) => {
    switch (action.type){
        case 'MASTER_ROOM_TYPE_SELECTED':
            return ({
                ...state,
                selectedRoom:action.roomType
            });
        case 'MONTH_SELECTED':
                return ({
                    ...state,
                    selectedMonth:action.month,
                    
                });
        case 'DAY_SELECTED':
                    return ({
                        ...state,
                        selectedDay:action.day
                    });
            default :
            return state;
    }
}

export default FrontOfficeReducer