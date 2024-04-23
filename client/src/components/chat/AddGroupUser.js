import { Avatar } from '@material-ui/core'
import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

function AddGroupUser({key, id, name, profilePic, setGroupUsers, groupUsers}) {
    const {currentUser} = useAuth();
    const addUser = () => {
        console.log("here")
        setGroupUsers([...groupUsers, id]);
        document.getElementById(`user${id}`).style.backgroundColor = "#93329E";
    }

    if (currentUser.uid === id) {
        return (
            <div style={{display:'none'}}>
            </div>
        )
    }

    return (
        <div id={`user${id}`} className="sidebarChat" onClick={addUser}>
            <Avatar src={profilePic}/>
            <div className="sidebarChat__info">
                <h2 style={{color: '#440a67'}}>{name}</h2>
            </div>
        </div>
    )
}

export default AddGroupUser
