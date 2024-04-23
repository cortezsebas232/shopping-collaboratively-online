import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import '../../css/Room.css';
import Header from '../social/Header.js'
import {useAuth} from '../../contexts/AuthContext';
import db from '../../firebase';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import camera from '../../resources/camera.svg'
import camerastop from '../../resources/camera-stop.svg'
import microphone from '../../resources/microphone.svg'
import microphonestop from '../../resources/microphone-stop.svg'
import hangup from '../../resources/hang-up.svg'

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    // eslint-disable-next-line
    }, []);

    return (
        <video playsInline autoPlay ref={ref} className="video__card"/>
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    const [peers, setPeers] = useState([]);
    const [stream, setStream] = useState();
    const [audioMuted, setAudioMuted] = useState(false)
    const [videoMuted, setVideoMuted] = useState(false)
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const myPeer = useRef();
    const roomID = props.match.params.roomID;
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

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            setStream(stream);
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push({
                        peerID: userID,
                        peer,
                    });
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                const peerObj = {
                    peer,
                    peerID : payload.callerID
                }

                setPeers(users => [...users, peerObj]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on('user left', id => {
                const peerObj = peersRef.current.find(p => p.peerID === id);
                if (peerObj) {
                    peerObj.peer.destroy();
                }
                const peers = peersRef.current.filter(p => p.peerID !== id);
                peersRef.current = peers;
                setPeers(peers);
            })
        })
    // eslint-disable-next-line
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    function shareScreen(){
        navigator.mediaDevices.getDisplayMedia({cursor: true})
        .then(screenStream => {
            // eslint-disable-next-line
            peers.map(peer => {
                myPeer.current = peer.peer;
                myPeer.current.replaceTrack(stream.getVideoTracks()[0], screenStream.getVideoTracks()[0], stream);
                userVideo.current.srcObject = screenStream;
            })
            screenStream.getTracks()[0].onended = () => {
                // eslint-disable-next-line
                peers.map(peer => {
                    myPeer.current = peer.peer;
                    myPeer.current.replaceTrack(screenStream.getVideoTracks()[0], stream.getVideoTracks()[0], stream);
                    userVideo.current.srcObject = stream;
                })
            }
        })
    }

    function endCall() {
        window.close();
    }

    function toggleMuteAudio(){
        if(stream) {
            setAudioMuted(!audioMuted)
            stream.getAudioTracks()[0].enabled = audioMuted
        }
    }
    
    function toggleMuteVideo(){
        if(stream) {
            setVideoMuted(!videoMuted)
            stream.getVideoTracks()[0].enabled = videoMuted
        }
    }

    let hangUp=<span className="options-div" onClick={()=>endCall()}>
        <img className="video-options" src={hangup} alt="End call"/>
    </span>

    let audioControl;
    if(audioMuted){
        audioControl=<div className="options-div" onClick={()=>toggleMuteAudio()}>
            <img className="video-options" src={microphonestop} alt="Unmute audio"/>
        </div>
    } else {
        audioControl=<div className="options-div" onClick={()=>toggleMuteAudio()}>
            <img className="video-options" src={microphone} alt="Mute audio"/>
        </div>
    }

    let videoControl;
    if(videoMuted){
        videoControl=<div className="options-div" onClick={()=>toggleMuteVideo()}>
            <img className="video-options" src={camerastop} alt="Resume video"/>
        </div>
    } else {
        videoControl=<div className="options-div" onClick={()=>toggleMuteVideo()}>
            <img className="video-options" src={camera} alt="Stop audio"/>
        </div>
    }

    return (
        <div>
            <Header length = {length} noRequests={requests} />
            <h2 className="title d-none">Shop together with your friends!<img alt = "" src="https://img.icons8.com/fluent/50/000000/online-order.png" style={{marginLeft:10}}/>
            <img src="https://img.icons8.com/color/48/000000/teams.png" alt = ""/></h2>
            <div className="video__row">
                {/* <div className="room-video"> */}
                    <video muted ref={userVideo} autoPlay playsInline className="video__card"/>
                    {peers.map((peer) => {
                        return (
                            <Video key={peer.peerID} peer={peer.peer} />
                        );
                    })}
                {/* </div> */}
            </div>
            <div style={{display:"flex", justifyContent:"center", position: "sticky", bottom: "30px"}}>
                    {audioControl}
                    {videoControl}

                    <div className="options-div">
                        <ScreenShareIcon fontSize="large" className="video-options" onClick={shareScreen}></ScreenShareIcon>
                    </div>
                    {hangUp}

                        {/* <button className="sharescreen-btn" onClick={shareScreen}>Share screen</button> */}
                    
            </div>
        </div>
    );
};

export default Room;
