import { getFirestore } from "redux-firestore";
import {getFirebase} from 'react-redux-firebase'
import { firestore } from "firebase";
import { SIGNIN_SUCCESS, SIGNIN_ERROR } from "../../reducers/ActionTypes";


export const signIn = (payload) => {
    return(dispatch,getState,{getFirestore,getFirebase}) =>{
        const firebase = getFirebase();
        console.log('In action')
        firebase.auth().signInWithEmailAndPassword(
            payload.email,
            payload.password
        ).then(() =>{
            dispatch({
                type:SIGNIN_SUCCESS});
                //callback();
        }).catch((err) =>{
            console.log('error in action')
            dispatch({
                type:SIGNIN_ERROR,
                payLoad:"Invalid Login Credentials"})
        
        })
    }
}

export const setUserType = (uid) => {
    return(dispatch,getState,{getFirestore,getFirebase}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore()
        firestore.collection('user').doc(uid).get()
        .then(function(doc) {
            if (doc.exists) {
                console.log(doc.data())
                dispatch({
                    type:'USER_TYPE_SET',
                    payLoad:doc.data()})
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
         
    }
}



export const signOut = () => {
    return(dispatch,getState,{getFirestore,getFirebase}) =>{
        const firebase = getFirebase();
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });    }
}

export const updateUser = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("user").doc(payload.id).update({
          ...payload
        });
    }

}

export const insertUser = (payload) => {        
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        console.log(payload)
        const firebase = getFirebase()
        firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
            .then((response) => {
                console.log(response)
                firestore.collection('user').doc(response.user.uid).set({
                    ...payload,
                }).then((response) => {
                    console.log("response")
                }).catch((response) => {
                    console.log("response")
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const deleteUser = (User) => {   
    console.log(User)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        const firebase = getFirebase()

        firestore.collection('user').doc(User).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}