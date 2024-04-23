import React , { useState, useEffect } from 'react'
import Feed from './Feed'
import Header from './Header'
import Sidebar from './Sidebar'
import Widgets from './Widgets'
import '../../App.css';
import {useAuth} from '../../contexts/AuthContext';
import db from '../../firebase';

function MyFeed() {
  const {currentUser} = useAuth();
  const [length, setLength] = useState(0);
  const [requests, setRequests] = useState(0);

  useEffect(() => {
      if (currentUser) {
          db.collection("users").doc(currentUser.uid).get().then(docc => {
              const data = docc.data();
              setLength(data.noItems);
          })
          db.collection("users").doc(currentUser.uid).collection("friendRequests").get().then(snapshot => {
            setRequests(snapshot.size);
        })
      }
  })
    return (
        <div>
        <Header length={length} noRequests={requests}/>
        <div className="app__bodySocial">
          <Sidebar />
          <Feed />
          <Widgets />
        </div> 
        </div>
    )
}

export default MyFeed
