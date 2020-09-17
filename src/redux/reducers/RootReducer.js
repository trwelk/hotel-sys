import {combineReducer, combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase';
import AttendenceReducer from './AttendenceReducer';
import FrontOfficeReducer from './FrontOfficeReducer';
import FeedbackFormReducer from './FeedbackFormReducer';

const RootReducer = combineReducers({
    firestore:firestoreReducer,
    firebase:firebaseReducer,
    attendence:AttendenceReducer,
    frontOffice:FrontOfficeReducer,
    feedbackForm:FeedbackFormReducer

})

export default RootReducer;