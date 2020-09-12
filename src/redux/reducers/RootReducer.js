import {combineReducer, combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase';
import FrontOfficeReducer from './FrontOfficeReducer';

const RootReducer = combineReducers({
    firestore:firestoreReducer,
    firebase:firebaseReducer,
    frontOffice:FrontOfficeReducer
})

export default RootReducer;