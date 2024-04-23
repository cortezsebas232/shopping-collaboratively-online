import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterHeader from './components/authentication/RegisterHeader.js';
import Register from './components/authentication/Register.js';
import LoginHeader from './components/authentication/LoginHeader.js';
import Login from './components/authentication/Login.js';
import PrivateRoute from './PrivateRoute.js';
import ForgotPassword from './components/authentication/ForgotPassword.js';
import UpdateProfile from './components/authentication/UpdateProfile.js';
import { AuthProvider } from './contexts/AuthContext.js';
import Home from './components/ecommerce/Home.js';
import MyFeed from './components/social/MyFeed';
import EmptyUsers from './components/friends/EmptyUsers';
import Requests from './components/friends/Requests';
import Friends from './components/friends/Friends';
import Room from './components/videocall/Room';
import CreateRoom from './components/videocall/CreateRoom';
import EmptySharedBaskets from "./components/ecommerce/EmptySharedBaskets";
import EmptySharedFriendBasket from "./components/ecommerce/EmptySharedFriendBasket";
import MyChatEmpty from "./components/chat/MyChatEmpty";
import MyChat from "./components/chat/MyChat";
import SurveyResults from "./components/chat/SurveyResults";
import EmptyCheckout from "./components/ecommerce/EmptyCheckout";

function App() {
  return (
    <div className="App">
      <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component= {Home} />
          <PrivateRoute path="/dashboard" component={Friends} />
          <PrivateRoute path="/users" component={EmptyUsers} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <PrivateRoute path="/requests" component={Requests} />
          <Route path="/login">
            <LoginHeader />
            <Login />
          </Route>
          <Route path="/register">
            <RegisterHeader />
            <Register />
          </Route>
          <Route path="/forgot-password">
          <ForgotPassword />
          </Route>
          <Route path="/checkout">
            <EmptyCheckout /> 
          </Route>
          <PrivateRoute path="/chat/rooms/:roomId/:roomType" component={MyChat} />
          <PrivateRoute path="/chat" component={MyChatEmpty} />
          <PrivateRoute path="/call" exact component={CreateRoom} />
          <PrivateRoute path="/baskets" component={EmptySharedBaskets} />  
          {/* SharedBaskets */}
          <PrivateRoute path="/basket/:userId" component={EmptySharedFriendBasket} />
          {/* SharedFriendBasket */}
          <PrivateRoute path="/room/:roomID" component={Room} />
          <PrivateRoute path="/social" component={MyFeed} />
          <PrivateRoute path="/surveyResults" component={SurveyResults} />
        </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
