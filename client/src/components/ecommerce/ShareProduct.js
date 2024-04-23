import React from 'react'
import '../../css/CheckoutProduct.css';
import db from '../../firebase';
import firebase from "firebase";
import {useAuth} from "../../contexts/AuthContext";
import { Avatar } from '@material-ui/core';

function ShareProduct({key, id, emailAdd, name, profilePic, itemImage, itemId, itemTitle, userId, handleClose}) {
    const {currentUser} = useAuth();

    const share = () => {
        db.collection('users').doc(currentUser.uid).collection('friends').doc(id).collection('messages').add({
            message: "Please share your review of this product!",
            name: currentUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: itemImage,
            productId: itemId,
            productName: itemTitle,
            userId: userId
        })

        db.collection('users').doc(id).collection('friends').doc(currentUser.uid).collection('messages').add({
            message: "Please share your review of this product!",
            name: currentUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: itemImage,
            productId: itemId,
            productName: itemTitle,
            userId: userId
        })

        handleClose();
    }

    return (
        <div className="sidebarChat" onClick={share}>
            <Avatar src={profilePic}/>
            <div className="sidebarChat__info">
                <h2 style={{color: '#440a67'}}>{name}</h2>
                <strong style={{color: '#440a67'}}>Email ID: {emailAdd}</strong>
            </div>
        </div>
    )
}

export default ShareProduct