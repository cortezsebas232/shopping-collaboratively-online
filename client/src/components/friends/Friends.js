import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../css/Checkout.css";
import Friend from './Friend';
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';
import { Avatar } from "@material-ui/core";
import Header from "../social/Header";
import '../../css/Users.css';
import emailIcon from '../../resources/email.png';
import likeIcon from '../../resources/like-16x16(1).png';
import Post from "../social/Post";

function Friends({id, emailAdd, gender, name, profilePic}) {
    const history = useHistory();
    const [friends, setFriends] = useState([]);
    const { currentUser} = useAuth();
    const [length, setLength] = useState(0);
    const [posts, setPosts] = useState([]);
    const [Gender, setGender] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [requests, setRequests] = useState(0);

    useEffect(() => {
        if (currentUser) {
            db.collection("users").doc(currentUser.uid).get().then(docc => {
                const data = docc.data();
                setLength(data.noItems);
                setPhoneNumber(data.phoneNumber);
                setGender(data.gender)
            })
            db.collection("users").doc(currentUser.uid).collection("friendRequests").get().then(snapshot => {
              setRequests(snapshot.size);
          })
        }
    })

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

    useEffect(() => {
      db.collection('posts')
      .orderBy("timestamp", "desc")
      .get().then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          if (doc.data().userId === currentUser.uid) {
            const postObj = {
              id: doc.id,
              post : doc.data()
            }
            if (!posts.find(obj => obj.id === postObj.id))
              setPosts(posts => [...posts, postObj]);
          }
        })
      })
    // eslint-disable-next-line
    }, [])

    const goToUpdateProfile = () => {
      let path = `/update-profile`;
      history.push(path);
    }

  return (
    <div>
    <Header length = {length} noRequests={requests} />
    <div className="row" style={{width: "99%"}}>
      <div className="col-md-8" style={{alignItems: "center"}}>
      <h2 className="users-heading">Your Profile</h2>
      <div class="card" style={{width:"68.7%", marginLeft: "15%"}}>
            <div class="card-header" style={{width:"100%", height: "150px"}}>
                
            </div>
            <div class="card-body" style={{width:"100%", paddingRight:20}}>
                <div className='card-inline'><Avatar src={currentUser.photoURL} />&nbsp;&nbsp;
                    <h3>{currentUser.displayName}</h3>
                </div>
                <p><span><img src={likeIcon} alt="like" style={{height:16, width:16, marginRight:10}} /></span>{Gender}</p>
                <p><span><img src={emailIcon} alt="like" style={{height:22, width:22, marginRight:5, marginTop:5}} /></span>{currentUser.email}</p>
                <p><span><img src="https://img.icons8.com/ultraviolet/40/000000/phone.png" style={{height:22, width:22, marginRight:5, marginTop:5}} alt="" /></span>{phoneNumber}</p>
                <button onClick={goToUpdateProfile} style={{marginTop:20}}>Update Profile</button>
            </div>
      </div>
      <div className="feed">
      {posts.map(({ id, post }) => (
          <Post
              key={id}
              postId={id}
              profilePic={post.profilePic}
              message={post.message}
              timestamp={post.timestamp}
              username={post.username}
              image={post.image}
              userId={currentUser.uid}
              likes={post.likes}
          />
      ))}
      </div>
      </div>
      <div className="col-md-4">
      <h2 className="users-heading">Your Shopping Buddies <span><img src="https://img.icons8.com/emoji/48/000000/purple-heart.png" alt="emoji" />
        <img src="https://img.icons8.com/color/48/000000/friends-hanging-out.png" alt="emoji" /></span></h2>
      <div className="user__row">
      {friends.map(({ friendId, friend }) => (
             <Friend 
              key = {friendId}
              id = {friendId}
              emailAdd = {friend.friendEmail}
              name = {friend.friendName}
              profilePic = {friend.friendProfilePic}
            />
         ))}
      </div>
      </div>
    </div>
    </div>
  );
}

export default Friends;
