import React, {useEffect, useState} from 'react';
import "../../css/SidebarChat.css";
import {Avatar} from "@material-ui/core";
import db from "../../firebase";
import {Link} from "react-router-dom";
import {useAuth} from '../../contexts/AuthContext';
import AddGroupUsersModal from './AddGroupUsersModal';

function SidebarChat({id, name, profilePic, addNewChat, group}) {
    const {currentUser} = useAuth();
    const [messages, setMessages] = useState("");
    const [groupName, setGroupName] = useState("");
    const [groupUsers, setGroupUsers] = useState([currentUser.uid]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(id && !group) {
            db.collection('users').doc(currentUser.uid).collection('friends').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data())))
            );
        }
        else if (id && group) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data())))
            );
        }
    // eslint-disable-next-line
    }, [id])

    const showModal = () => {
        setShow(true);
        // document.getElementsByClassName("sidebarChat").style.backgroundColor = "#DAB5DA";
    };
    
    const hideModal = () => {
        setShow(false);
        setGroupUsers([currentUser.uid]);
    };

    return !addNewChat ? (
        <div className="chat__side">
        {group? 
            <Link to={`/chat/rooms/${id}/${group}`} key={id}>
                <div className="sidebarChat">
                    <Avatar src={profilePic}/>
                    <div className="sidebarChat__info">
                        <h2 style={{color: '#440a67'}}>{name}</h2>
                        {/*<p>{messages[0]?.message.startsWith(`${name} is inviting you to shop virtually! Please click on this message to join!`) ? messages[0]?.message.slice(0, messages[0]?.message.length-36): messages[0]?.message}</p>*/}
                        <p>{messages[0]?.message}</p>
                    </div>
                </div>
            </Link> :
            <Link to={`/chat/rooms/${id}/${2}`} key={id}>
                <div className="sidebarChat">
                    <Avatar src={profilePic}/>
                    <div className="sidebarChat__info">
                        <h2 style={{color: '#440a67'}}>{name}</h2>
                        <p>{messages[0]?.message}</p>
                    </div>
                </div>
            </Link>
        }
        </div>
    ) : (
        <div>
        <div onClick={showModal} className="sidebarChat">
            <h3 className="add-new-chat-title" style={{color: '#440a67'}}>Create Group</h3>
        </div>
        <AddGroupUsersModal show={show} handleClose={hideModal} setGroupName={setGroupName} setGroupUsers={setGroupUsers} groupUsers={groupUsers} groupName={groupName}>
            <p>Modal</p>
        </AddGroupUsersModal>
        </div>
    )
}

export default SidebarChat
