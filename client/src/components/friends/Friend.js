import { Avatar } from '@material-ui/core';
import React from 'react'
import '../../css/Users.css';
import emailIcon from '../../resources/email.png';

function Friend({key, id, emailAdd, name, profilePic}) {
    return (
        <div class="card" style={{height: "fit-content"}}>
            <div class="card-header">
            </div>
            <div class="card-body">
                <div className='card-inline'><Avatar src={profilePic} />&nbsp;&nbsp;
                    <h3>{name}</h3>
                </div>
                <br/>
                <p><span><img src={emailIcon} alt="like" style={{height:22, width:22, marginRight:5}} /></span>{emailAdd}</p>
            </div>
        </div>
    )
}

export default Friend
