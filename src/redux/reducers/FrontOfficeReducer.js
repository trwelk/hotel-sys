const initState = {
    selectedRoom:null
}

const FrontOfficeReducer = (state = initState, action) => {
    switch (action.type){
        case 'MASTER_ROOM_TYPE_SELECTED':
            return ({
                ...state,
                selectedRoom:action.roomType
            });
            default :
            return state;
    }
}

export default FrontOfficeReducer