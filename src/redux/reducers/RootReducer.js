import {combineReducer, combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase';
import FrontOfficeReducer from './FrontOfficeReducer';
import FeedbackFormReducer from './FeedbackFormReducer';

const RootReducer = combineReducers({
    firestore:firestoreReducer,
    firebase:firebaseReducer,
    frontOffice:FrontOfficeReducer,
    feedbackForm:FeedbackFormReducer

})

export default RootReducer;