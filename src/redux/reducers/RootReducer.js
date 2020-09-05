import {combineReducer, combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase';

const RootReducer = combineReducers({
    firestore:firestoreReducer,
    firebase:firebaseReducer
})

export default RootReducer;