// import React, { useState, useEffect } from 'react';
// import {auth} from '../../config/fbConfig'
// import ReactDOM from 'react-dom'
// import Navigator2 from '../layout/Navigator2'
// import {db} from '../../config/fbConfig'
// import {setUserType} from '../../redux/actions/authActions/AuthActions'
// import { connect } from 'react-redux'

// function Auth(props){
//     useEffect(() => {
//         const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//         return subscriber; // unsubscribe on unmount
//       }, []);
// function onAuthStateChanged(user){
//     if(user){
//         console.log(user)

//         db.collection("user").doc(user.uid)
//         .get()
//         .then(function(doc) {
//             if (doc.exists) {
//                 console.log("Document data:", doc.data());
//                 props.setUserType(doc.data().userType)
//             } else {
//                 // doc.data() will be undefined in this case
//                 console.log("No such document!");
//             }
//         })
//         .catch(function(error) {
//             console.log("Error getting documents: ", error);
//         });

//     }else{
//     }
// }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setUserType: (payload) => dispatch(setUserType(payload)),
//     }
// }
// export default connect    (null,mapDispatchToProps)(Auth)