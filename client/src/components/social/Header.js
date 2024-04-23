import React, { useState } from 'react'
import '../../css/HeaderSocial.css'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar, IconButton } from '@material-ui/core';
import {useAuth} from '../../contexts/AuthContext';
import { useHistory } from 'react-router';
import logo_Famista from '../../resources/logo_Famista.png'
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Tooltip } from 'reactstrap';


function Header({length, noRequests}) {
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [tooltipOpenHome, setTooltipOpenHome] = useState(false);
    const [tooltipOpenSocial, setTooltipOpenSocial] = useState(false);
    const [tooltipOpenUsers, setTooltipOpenUsers] = useState(false);
    const [tooltipOpenSharedBasket, setTooltipOpenSharedBasket] = useState(false);
    const [tooltipOpenBasket, setTooltipOpenBasket] = useState(false);
    const [tooltipOpenSurveyResults, setTooltipOpenSurveyResults] = useState(false);
    const [tooltipNotifications, setTooltipNotifications] = useState(false);
    const [tooltipChat, setTooltipChat] = useState(false);
    const [tooltipLogOut, setTooltipLogOut] = useState(false);

    const toggleHome = () => setTooltipOpenHome(!tooltipOpenHome);
    
    const toggleSocial = () => setTooltipOpenSocial(!tooltipOpenSocial);
    
    const toggleUsers = () => setTooltipOpenUsers(!tooltipOpenUsers);
    
    const toggleSharedBasket = () => setTooltipOpenSharedBasket(!tooltipOpenSharedBasket);
    
    const toggleBasket = () => setTooltipOpenBasket(!tooltipOpenBasket);
    
    const toggleSurveyResults = () => setTooltipOpenSurveyResults(!tooltipOpenSurveyResults);

    const toggleNotifications = () => setTooltipNotifications(!tooltipNotifications);

    const toggleChat = () => setTooltipChat(!tooltipChat);

    const toggleLogOut = () => setTooltipLogOut(!tooltipLogOut);

    async function handleSubmit() {
        try {
            await logout();
            history.push("/login");
        } catch {
            alert("Failed to log out");
        }
    }

    const goToHome = () => {
        let path = `/`;
        history.push(path);
    };

    const goToSurveyResults = () => {
        let path = `/surveyResults`;
        history.push(path);
    };

    const goToSocial = () => {
        let path = `/social`;
        history.push(path);
    }

    const goToFriends = () => {
        let path = `/users`;
        history.push(path);
    }

    const goToDashboard = () => {
        let path = `/dashboard`;
        history.push(path);
    }

    const goToSharedBaskets = () => {
        let path = `/baskets`;
        history.push(path);
    }

    const goToMyBasket = () => {
        let path = `/checkout`;
        history.push(path);
    }

    const goToChat = () => {
        let path = `/chat`;
        history.push(path);
    }

    const goToRequests = () => {
        let path = `/requests`;
        history.push(path);
    }

    if (currentUser)
    return (
        <div className='header__social'>
            <div className="header__left">
            <img src={logo_Famista} alt="famista-logo" onClick = {goToHome}></img>
                
                <div className="header__input">
                    <SearchIcon />
                    <input type="text" placeholder="Search FAMista" />
                </div>
            </div>
            <div className="header__middle">
                <div className="header__option header__option--active" onClick={goToHome} >
                    <HomeIcon fontSize="large" id = "home" style={{outline: "none"}} />
                    <Tooltip placement="bottom" isOpen={tooltipOpenHome} target="home" toggle={toggleHome}>
                        Home
                    </Tooltip>
                </div>
                
                <div className="header__option" onClick={goToSocial} >
                    <StorefrontOutlinedIcon fontSize="large" id = "social" style={{outline: "none"}} />
                    <Tooltip placement="bottom" isOpen={tooltipOpenSocial} target="social" toggle={toggleSocial}>
                        Social
                    </Tooltip>
                </div>
                
                <div className="header__option" onClick={goToMyBasket} >
                    <ShoppingBasketIcon fontSize="large" id = "basket" style={{outline: "none"}} />
                    <span className="header_optionLineTwo header_basketCount">{length}</span>
                    <Tooltip placement="bottom" isOpen={tooltipOpenBasket} target="basket" toggle={toggleBasket}>
                    Your Basket
                    </Tooltip>
                </div>
                
                <div className="header__option" onClick={goToSharedBaskets}>
                    <img src="https://img.icons8.com/material/80/000000/favorite-cart.png" id = "sharedBasket" 
                        style={{height: 32, width: 32, filter: "brightness(0) invert(1)", outline: "none"}} alt="shared basket icon"/>
                        <Tooltip placement="bottom" isOpen={tooltipOpenSharedBasket} target="sharedBasket" toggle={toggleSharedBasket}>
                            Shared Basket
                        </Tooltip>
                </div>
                
                <div className="header__option" onClick={goToFriends} >
                    <SupervisedUserCircleIcon fontSize="large" id="users" style={{outline: "none"}} />
                    <Tooltip placement="bottom" isOpen={tooltipOpenUsers} target="users" toggle={toggleUsers}>
                        Users
                    </Tooltip>
                </div>
                
                <div className="header__option header__option--active" onClick={goToSurveyResults} >
                    <AssignmentIcon fontSize="large" id = "surveyResult" style={{outline: "none"}} />
                    <Tooltip placement="bottom" isOpen={tooltipOpenSurveyResults} target="surveyResult" toggle={toggleSurveyResults}>
                        Survey Results
                    </Tooltip>
                </div>
                
            </div>
            <div className="header__right">
                <div className="header__info">
                    <button onClick={goToDashboard} style={{backgroundColor: "transparent", border:"none", color: "white", cursor:"pointer"}}><Avatar src={currentUser.photoURL} /></button>
                    <button onClick={goToDashboard} style={{backgroundColor: "transparent", border:"none", color: "white", cursor:"pointer"}}>{currentUser.displayName}</button>
                </div>
                <IconButton>
                    <div className="header__option2">
                        <AddIcon />
                    </div>
                </IconButton>
                <IconButton>
                    <div className="header__option2">
                        <ForumIcon id="chat" onClick={goToChat}  style={{outline: "none"}} />
                        <Tooltip placement="bottom" isOpen={tooltipChat} target="chat" toggle={toggleChat}>
                            Chat
                        </Tooltip>
                    </div>
                </IconButton>
                <IconButton>
                    <div className="header__option2">
                        <NotificationsActiveIcon id="requests" onClick={goToRequests}  style={{outline: "none"}} />
                        <sup><span style={{fontSize: "12px", marginLeft: 0}} className="header_optionLineTwo header_basketCount">{noRequests}</span></sup>
                        <Tooltip placement="bottom" isOpen={tooltipNotifications} target="requests" toggle={toggleNotifications}>
                            Friend Requests
                        </Tooltip>
                    </div>
                </IconButton>
                <IconButton onClick={handleSubmit}>
                    <div className="header__option2">
                        <ExitToAppIcon id="logOut"   style={{outline: "none"}} />
                        <Tooltip placement="bottom" isOpen={tooltipLogOut} target="logOut" toggle={toggleLogOut}>
                            Log Out
                        </Tooltip>
                    </div>
                </IconButton>
            </div>
        </div>
    )
}

export default Header
