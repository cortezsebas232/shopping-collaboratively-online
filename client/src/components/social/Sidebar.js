import React from 'react';
import '../../css/SidebarSocial.css';
import SidebarRow from './SidebarRow';
import { useHistory } from 'react-router';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import {useAuth} from '../../contexts/AuthContext';
import goToChat from './Header';
import goToHome from './Header';
import goToMyBasket from './Header';
import { Link } from 'react-router-dom';

function Sidebar() {
    const {currentUser} = useAuth();
    const history = useHistory();

    const goToUsers = () => {
        let path = `/users`;
        history.push(path);
    }
    return (
        <div className="sidebar__social">
            <Link to="/dashboard" style={{textDecoration: "none"}}>
                <SidebarRow src={currentUser.photoURL} title={currentUser.displayName} />
            </Link>
            <Link to="/" style={{textDecoration: "none"}}>
            <SidebarRow Icon={HomeIcon} title="Home" onClick={goToHome}/>
            </Link>
            <Link to="/users" style={{textDecoration: "none"}}>
            <SidebarRow Icon={PeopleIcon} title="Users" onClick={goToUsers}/>
            </Link>
            <Link to="/chat" style={{textDecoration: "none"}}>
            <SidebarRow Icon={ChatIcon} title="Chat" onClick={goToChat}/>
            </Link>
            <Link to="/checkout" style={{textDecoration: "none"}}>
            <SidebarRow Icon={ShoppingBasketIcon} title="My Basket" onClick={goToMyBasket}/>
            </Link>
            <SidebarRow Icon={ExpandMoreOutlinedIcon} title="More" />
        </div>
    )
}

export default Sidebar
