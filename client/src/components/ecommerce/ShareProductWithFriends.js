import React, { useEffect, useState } from "react";
import "../../css/Checkout.css";
import ShareProduct from './ShareProduct';
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';


function ShareProductWithFriends({itemImage, itemId, itemTitle, userId, handleClose}) {
    const [friends, setFriends] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        db.collection("users").doc(currentUser.uid).collection("friends")
        .onSnapshot((snapshot) => 
            setFriends(snapshot.docs.map((doc) => ({
                friendId: doc.id,
                friend: doc.data()
            })))
        );
    // eslint-disable-next-line
    }, [])

    return (
      <div className="checkout">
      <div className="sidebar__chats">

        <div>
          <h2 className="checkout__title">Share with...</h2>
          {friends.map(({ friendId, friend }) => (
              <ShareProduct 
                key = {friendId}
                id = {friendId}
                emailAdd = {friend.friendEmail}
                name = {friend.friendName}
                profilePic = {friend.friendProfilePic}
                itemImage = {itemImage}
                itemId = {itemId}
                itemTitle = {itemTitle}
                userId={userId}
                handleClose = {handleClose}
              />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShareProductWithFriends;
