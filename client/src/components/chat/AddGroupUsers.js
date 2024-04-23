import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import db from '../../firebase';
import AddGroupUser from './AddGroupUser';
import '../../css/SidebarChat.css';

function AddGroupUsers({handleClose, setGroupName, setGroupUsers, groupUsers, groupName}) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const {currentUser} = useAuth();
    const reload=()=>window.location.reload();

    async function createGroup() {
        if(groupName){
            console.log("hello")
            await db.collection("rooms").add({
                name: groupName,
                users: groupUsers
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            setGroupUsers([currentUser.uid]);
            setGroupName('');
            handleClose();
            reload();
        }
        else {
            setError('Please input group name!');
            setGroupUsers([currentUser.uid]);
        }
        // document.getElementsByClassName("sidebarChat").style.backgroundColor = "#DAB5DA";
    }

    useEffect(() => {
        db.collection("users").doc(currentUser.uid).collection("friends")
        .onSnapshot((snapshot) => 
            setUsers(snapshot.docs.map((doc) => ({
                userId: doc.id,
                user: doc.data()
            })))
        );
    // eslint-disable-next-line
    }, [])

    return (
        <div>
            <div className="groupModal__header">
                <label>
                    Enter Group Name <br />
                    <input 
                        onChange={(e) => {
                            setGroupName(e.target.value)
                            console.log(groupName)
                        }} 
                        type="text" value={groupName} 
                        placeholder="Group Name" className="groupModal__search"/>
                </label>
            </div>
            <div className="sidebar__chats">
            {users.map(({ userId, user }) => (
                <AddGroupUser 
                  key = {userId}
                  id = {userId}
                  name = {user.friendName}
                  profilePic = {user.friendProfilePic}
                  setGroupUsers = {setGroupUsers}
                  groupUsers = {groupUsers}
                />
            ))}
            </div>
            <div className="groupModal__header">
                {error && <Alert variant="danger">{error}</Alert>}
                <button onClick={createGroup} type="submit" className="register__register">Create Group</button>
            </div>
        </div>
    )
}

export default AddGroupUsers
