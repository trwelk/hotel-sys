import { SIGNIN_SUCCESS, SIGNIN_ERROR } from "./ActionTypes";

const initState = {
    loginError:null,
    userType:null

}

const AuthReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type){
        case SIGNIN_SUCCESS :
                    return ({
                        ...state,
                        loginError:null
                    })
                                                                      
            case SIGNIN_ERROR:
                return ({
                    ...state,
                    loginError:true
                })
            case 'USER_TYPE_SET':
                return ({
                    ...state,
                    userType:action.payLoad.userType
                    })
                                                                  
        default :
            return state;
    }
}

export default AuthReducer