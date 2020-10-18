const initState = {
    selectedRoom:null,
    selectedMonth:9,
    selectedDay:2,
    selectedCustomer:null,
    reservationType:"WEBSITE",
    numberOfPacks:0,
    reservationError:false,
    resError: "Please fill all fields",
    vertical: 'bottom',
    horizontal: 'right',

}

const FrontOfficeReducer = (state = initState, action) => {
    switch (action.type){
        case 'MASTER_ROOM_TYPE_SELECTED':
            return ({
                ...state,
                selectedRoom:action.roomType,
                reservationError:false
            });
        case 'MONTH_SELECTED':
                return ({
                    ...state,
                    selectedMonth:action.month,
                    reservationError:false

                });
        case 'DAY_SELECTED':
            console.log("reducer day",state.selectedDay)
                    return ({
                        ...state,
                        selectedDay:action.day,
                        reservationError:false

                    });
        case 'CUSTOMER_SELECTED':
                     return ({
                        ...state,
                        selectedCustomer:action.customer,
                        reservationError:false

                    });   
        case 'RESERVATION_TYPE_SELECTED':
                    return ({
                       ...state,
                       reservationType:action.reservationType,
                       reservationError:false

                       });       
        case 'NUMBER_OF_PACKS_SELECTED':
                    return ({
                       ...state,
                       numberOfPacks:action.numberOfPacks,
                       reservationError:false

                       });   
        case 'ERROR_INSERTING_RESERVATION':
                    return ({
                       ...state,
                       reservationError:true
                       });  
       case 'ERROR_INSERTING_RESERVATION':
                    return ({
                       ...state,
                      reservationError:false
                       });                                                                                  
            default :
            return state;
    }
}

export default FrontOfficeReducer