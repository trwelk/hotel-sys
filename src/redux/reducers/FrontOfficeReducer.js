const initState = {
    selectedRoom:null,
    selectedMonth:9,
    selectedDay:2,
    selectedCustomer:null

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
            console.log("reducer day",state.selectedDay)
                    return ({
                        ...state,
                        selectedDay:action.day
                    });
        case 'CUSTOMER_SELECTED':
                     return ({
                        ...state,
                        selectedCustomer:action.customer
                    });                                 
            default :
            return state;
    }
}

export default FrontOfficeReducer