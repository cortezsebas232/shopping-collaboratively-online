import React, { useEffect, useState } from 'react'
import '../../css/Feed.css'
import MessageSender from './MessageSender'
import Post from './Post'
import StoryReel from './StoryReel'
import db from '../../firebase'
import {useAuth} from '../../contexts/AuthContext';

function Feed() {
    const {currentUser} = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts')
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
            setPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data()
            })))
        );
    }, [])

    return (
        <div className="feed">
            <StoryReel />
            <MessageSender />

            {posts.map(({ id, post }) => (
                <Post
                    key={id}
                    postId={id}
                    profilePic={post.profilePic}
                    message={post.message}
                    timestamp={post.timestamp}
                    username={post.username}
                    image={post.image}
                    userId={currentUser.uid}
                    likes={post.likes}
                />
            ))}
        </div>
    )
}

export default Feed
