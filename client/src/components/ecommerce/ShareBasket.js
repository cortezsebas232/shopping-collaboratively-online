import React, { useEffect, useState } from 'react'
import '../../css/CheckoutProduct.css';
import db from '../../firebase';
import {useAuth} from "../../contexts/AuthContext";
import {Button} from 'react-bootstrap';
import { Avatar } from '@material-ui/core';

function ShareProduct({key, id, emailAdd, name, profilePic, handleClose}) {
    const {currentUser} = useAuth();
    const [checked, setChecked] = useState(false);
    const [alreadyReadPermission, setAlreadyReadPermission] = useState(false);
    const [alreadyWritePermission, setAlreadyWritePermission] = useState(false);

    useEffect(() => {
        db.collection('users').doc(id).collection('friends').doc(currentUser.uid).get().then((doc) => {
            if (doc.data().read === true && doc.data().write === true) {
                setAlreadyWritePermission(true);
            }
            else if (doc.data().read === true) {
                setAlreadyReadPermission(true);
            }
        })
    // eslint-disable-next-line
    }, [])

    const revokeAccess = () => {
        db.collection('users').doc(id).collection('friends').doc(currentUser.uid).update({
            read: false,
            write: false
        })
    }

    const revokeEditAccess = () => {
        db.collection('users').doc(id).collection('friends').doc(currentUser.uid).update({
            write: false
        })
    }

    const giveEditAccess = () => {
        db.collection('users').doc(id).collection('friends').doc(currentUser.uid).update({
            write: true
        })
    }

    const share = () => {
        db.collection('users').doc(id).collection('friends').doc(currentUser.uid).update({
            read: true,
            write: false
        })

        if (checked) {
            db.collection('users').doc(id).collection('friends').doc(currentUser.uid).update({
                write: true
            })
        }
        handleClose();
    }

    const handleCheck = () => {
        setChecked(!checked);
    }

    return (
            <div className="sidebarChat__info">
                <div style={{display: "flex", flexDirection: "row"}}>
                <Avatar src={profilePic}/>&nbsp;&nbsp;
                    <div>
                        <p className="checkoutProduct_title">
                            {name}
                        </p>
                        <p className="checkoutProduct_price">
                            <strong>{emailAdd}</strong>
                        </p>
                    </div>
                </div>
                {alreadyWritePermission? 
                    <div>
                        <Button variant="flat" style={{margin:10}} onClick={revokeEditAccess}>Revoke Edit Access</Button> <br/>
                        <Button variant="flat" style={{margin:10}} onClick={revokeAccess}>Revoke Complete Access</Button>
                    </div>: 
                    [(alreadyReadPermission? 
                        <div>
                            <Button variant="flat" style={{margin:10}} onClick={giveEditAccess}>Give Edit Access</Button> <br/>
                            <Button variant="flat" style={{margin:10}} onClick={revokeAccess}>Revoke Access</Button>
                        </div>:
                        <div>
                            <input type="checkbox" onChange={handleCheck} defaultChecked={checked}/>&nbsp; Give edit access <br />
                            <Button variant="flat" style={{margin:10}} onClick={share}>Share Your Basket</Button>
                        </div> 
                    )]   
                }
            </div>
    )
}

export default ShareProduct