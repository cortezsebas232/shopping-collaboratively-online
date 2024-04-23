import React, {useState, useEffect} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert } from '@material-ui/icons';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { Link, useParams } from 'react-router-dom';
import db from '../../firebase';
import "../../css/Chat.css";
import firebase from "firebase";
import {useAuth} from "../../contexts/AuthContext";
import { v1 as uuid } from "uuid";
import SurveyModal from './SurveyModal'

function Chat() {
    var [input, setInput] = useState("");
    const {roomId, roomType} = useParams();
    const [roomName, setRoomName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [messages, setMessages] = useState([]);
    const {currentUser} = useAuth();
    // eslint-disable-next-line
    var [id, setId] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log(roomId, roomType)
        if (roomId && roomType === "1") {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }

        else if (roomId) {
            db.collection('users').doc(currentUser.uid).collection('friends').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().friendName);
                setProfilePic(snapshot.data().friendProfilePic)
            });

            db.collection('users').doc(currentUser.uid).collection('friends').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    // eslint-disable-next-line
    },[roomId])

    const sendMessage = (e, customInput) => {
        e.preventDefault();
        if (customInput) {
            input = customInput;
        }
        console.log("You typed >>>> ", input);
        if (roomType === '1'){
            db.collection('rooms').doc(roomId).collection('messages').add({
                message: input,
                name: currentUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        else {
            db.collection('users').doc(currentUser.uid).collection('friends').doc(roomId).collection('messages').add({
                message: input,
                name: currentUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
    
            db.collection('users').doc(roomId).collection('friends').doc(currentUser.uid).collection('messages').add({
                message: input,
                name: currentUser.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }

        setInput("");
    }

    function create() {
        var uid = uuid();
        setId(uid);
        var customInput = `${currentUser.displayName} is inviting you to shop virtually! Please click on this message to join! ${uid}`;
        console.log(customInput.slice(0, customInput.length-36))
        var clickEvent = new Event( 'click' );
        sendMessage(clickEvent, customInput);
    }

    const showModal = () => {
        setShow(true);
    };
    
    const hideModal = () => {
        setShow(false);
    };

    if (currentUser)
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={profilePic}/>
                <div className="chat__headerInfo">
                    <h3 style={{color: 'white'}}>{roomName}</h3>
                    <p style={{color: 'white'}}>Last Seen{" "}
                    {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton onClick={create}>
                        <Link to={`/room/${id}`} target="_blank">
                            <VideoCallIcon fontSize="large" />
                        </Link>
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert  />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === currentUser.displayName && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span>
                        {!message.imageUrl? <span className="d-none"></span> : 
                        <div>
                        <Link to="/">
                            <img height="250" src={message.imageUrl} alt="" /><br />
                        </Link>
                        <SurveyModal show={show} handleClose={hideModal} image={message.imageUrl} itemId={message.productId} itemName={message.productName} userId={message.userId}>
                            <p>Modal</p>
                        </SurveyModal>
                        {message.name === currentUser.displayName? <div></div>: <div><button onClick={showModal} className="productSurvey__btn">Fill Product Survey</button><br /></div>}
                        </div>
                        }
                        {message.message.startsWith(`${message.name} is inviting you to shop virtually! Please click on this message to join!`) ? 
                            <span className="d-none">{id = message.message.slice(message.message.length-36)}</span> : 
                            <span></span>
                        }
                        <span className="chat__boxmessage">{id !== '' ? 
                            <div>
                            <Link to={`/room/${id}`} target="_blank">
                                {message.message.slice(0, message.message.length-36)}
                            </Link> 
                            {id=''}
                            </div>
                            : <span>{message.message}</span>
                        }</span>
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon fontSize="large" style={{color: '#eff2f5'}}/>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}> Send a Message</button>
                </form>
                <MicIcon fontSize="large" style={{color: '#eff2f5'}}/>
            </div>
        </div>
    )
}

export default Chat