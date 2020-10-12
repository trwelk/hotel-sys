import MyEmail from './Email'
import { renderEmail } from 'react-html-email'
import React from 'react'
import axios from 'axios';

export const updateCustomer = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("customer").doc(payload.id).update({
          ...payload
        });
    }

}

export const insertCustomer = (payload) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('customer').doc(payload.id).set({
            ...payload,
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

export const deleteCustomer = (roomId) => {
    console.log(roomId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('customer').doc(roomId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}

export const sendMail = (payload) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
    
        const messageHtml =  renderEmail(<MyEmail name="Trewon"> This is my message</MyEmail>);
        const firestore = getFirestore();
   
        axios({
            method: "POST", 
            url:"http://localhost:9000/send", 
            data: {
      	name: payload.name,
      	email: payload.email,
      	messageHtml: messageHtml
            }
        }).then((response)=>{
            if (response.data.msg === 'success'){
                alert("Email sent, awesome!"); 
                this.resetForm()
            }else if(response.data.msg === 'fail'){
                alert("Oops, something went wrong. Try again")
            }
        })
    }
}
