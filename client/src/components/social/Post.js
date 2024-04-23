import React, { useEffect, useState } from 'react'
import '../../css/Post.css';
import  { Avatar } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NearMeIcon from '@material-ui/icons/NearMe';
import { useAuth } from '../../contexts/AuthContext'
import db from '../../firebase'
import firebase from 'firebase'
import likeIcon from '../../resources/like-16x16(1).png'

function Post({postId, profilePic, message, timestamp, username, image, userId, likes }) {
    const {currentUser} = useAuth();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState('like');
    const [show2, setShow2] = useState('textforlike');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection("posts").doc(postId).collection("comments").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);

    useEffect(() => {
        db.collection("posts").doc(postId).collection("likes").doc(userId).get().then(doc2 => {
            if (doc2.data()) {
                if (show === 'like') {
                    setShow('like blue');
                    setShow2('textforlike bluetextforlike')
                } else {
                    setShow('like');
                    setShow2('textforlike')
                }
            }
        })
        // eslint-disable-next-line
    }, [postId, userId]);

    const likeHandle = (event) => {
        event.preventDefault();
        if (show === 'like') {
            setShow('like blue');
            setShow2('textforlike bluetextforlike')
        } else {
            setShow('like');
            setShow2('textforlike')
        }

        db.collection('posts').doc(postId).get().then(docc => {
            const data = docc.data()
            console.log(show)
            if (show === 'like') {
                db.collection("posts").doc(postId).collection("likes").doc(userId).get().then(doc2 => {
                    if (doc2.data()) {
                        console.log(doc2.data())
                    } else {
                        db.collection("posts").doc(postId).collection("likes").doc(userId).set({
                            likes: 1
                        });
                        db.collection('posts').doc(postId).update({
                            likes: data.likes + 1
                        });
                    }
                })

            } else {
                db.collection('posts').doc(postId).collection('likes').doc(userId).delete().then(function () {
                    db.collection('posts').doc(postId).update({
                        likes: data.likes - 1
                    });
                })
            }
        })

    }

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: currentUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profilePhoto: currentUser.photoURL,
            email: currentUser.email,
        });
        setComment('');
    }
    return (
        <div className="post">
            <div className="post__top">
                <Avatar src={profilePic} className="post__avatar" />
                <div className="post__topInfo">
                    <h3>{username}</h3>
                    <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
            </div>

            <div className="post__bottom">
                <p>{message}</p>
            </div>

            <div className="post__image">
                <img src={image} alt="" />
            </div>

            <div className="post__likes">
            {/* eslint-disable-next-line */}
                <img src={likeIcon} alt="like" style={{height:16, width:16}} />
                <p>{likes} likes</p>
            </div>

            <div className="post__options">
                <div className="post__option post__notLiked" onClick={likeHandle}>
                    <FavoriteIcon className={show}/>
                    <p className={show2}>Like</p>
                </div>
                <div className="post__option post__comment">
                    <ChatBubbleOutlineIcon className="comment2" />
                    <p>Comment</p>
                </div>
                <div className="post__option post__share">
                    <NearMeIcon className="share2" />
                    <p>Share</p>
                </div>
            </div>
            <div className="post__commentBox">
            <form onSubmit={postComment}>
                <Avatar
                    className="post__avatar2"
                    alt=""
                    src={currentUser.photoURL}
                />
                <input className="post__commentInput" type="text" placeholder="Write a comment... " onChange={(e) => setComment(e.target.value)} />
                <button type="submit" disabled={!comment}>Submit</button>
            </form>
            {
                comments.map((comment) => (
                    <div className={`comments__show ${comment.email === currentUser.email && 'myself'}`}>
                        <Avatar
                            className="post__avatar2"
                            alt=""
                            src={comment.profilePhoto}
                        />
                        <div className="container__comments">
                            <p><span>{comment.username}</span>&nbsp; {comment.text}</p>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Post
