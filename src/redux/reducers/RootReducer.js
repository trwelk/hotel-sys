import {combineReducer, combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase';
import AttendenceReducer from './AttendenceReducer';

const RootReducer = combineReducers({
    firestore:firestoreReducer,
    firebase:firebaseReducer,
    attendence:AttendenceReducer
})

export default RootReducer;