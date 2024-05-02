import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert,TextInput ,ScrollView} from 'react-native';
import { RTCView } from 'react-native-webrtc';
import firestore from '@react-native-firebase/firestore';
import firebase from '../components/firebase';

const videoCameraOn = require('../assets/icons8-video-camera-100.png');
const videoCameraOff = require('../assets/icons8-no-video-40.png');
const microphoneOn = require('../assets/icons8-mic-30.png');
const microphoneOff = require('../assets/icons8-block-microphone-40.png');
const cameraSwitch = require('../assets/icons8-switch-camera-40.png');
const volumeOn = require('../assets/icons8-volume-40.png');
const volumeOff = require('../assets/icons8-no-audio-40.png');
const hangUpIcon = require('../assets/icons8-hang-up-30.png');
import chatIcon from '../assets/icons8-chat-50.png';

const VideoCallScreen = ({ route, navigation }) => {
    const { doctor } = route.params;
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true);
    const localStream = useRef(null);
    const remoteStream = useRef(null);
    const [callDuration, setCallDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [isChatVisible, setIsChatVisible] = useState(false);


     // Toggle chat visibility
     const toggleChatVisibility = () => {
        setIsChatVisible(prev => !prev);
    };

    const sendMessage = () => {
        if (chatMessage.trim() === '') return;

        const newMessage = {
            sender: 'user',
            message: chatMessage,
        };

        setChatMessages(prev => [...prev, newMessage]);
        setChatMessage('');
    };

    

    useEffect(() => {
        // Simulating doctor's replies every 3 seconds
        const doctorReplyTimer = setInterval(() => {
            const newMessage = {
                sender: 'doctor',
                message: 'Hello! How can I assist you?',
                timestamp: new Date().toLocaleTimeString(),
            };
            setChatMessages(prev => [...prev, newMessage]);
        }, 6000);

        return () => {
            clearInterval(doctorReplyTimer);
        };
    }, []);

    
    useEffect(() => {
        const timer = setInterval(() => {
            setCallDuration(prev => prev + 1);
        }, 1000);
        
        return () => {
            clearInterval(timer);
        };
    }, []);
    
    const toggleMuteAll = () => {
        setIsMuted(prev => !prev);
        setIsAudioEnabled(prev => !prev);
        setIsVideoEnabled(prev => !prev);
    };
    
    const endCall = () => {
        Alert.alert(
            'End Call',
            'Are you sure you want to end the call?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'End Call',
                    onPress: () => {
                        // Add hang-up logic here, for now just navigate back
                        navigation.goBack();
                    },
                },
            ],
        );
    };


    useEffect(() => {
        const db = firestore();
        const roomRef = db.collection('video-calls').doc(doctor);

        roomRef.onSnapshot(async snapshot => {
            if (snapshot.exists) {
                const data = snapshot.data();
                if (data.offer) {
                    await localStream.current.setRemoteDescription(new RTCSessionDescription(data.offer));
                    const answer = await localStream.current.createAnswer();
                    await localStream.current.setLocalDescription(answer);
                    roomRef.update({ answer: answer });
                }
            }
        });

        return () => {
            // Clean up resources on screen unmount
        };
    }, []);

    const toggleVideo = () => {
        setIsVideoEnabled(prev => !prev);
    };

    const toggleAudio = () => {
        setIsAudioEnabled(prev => !prev);
    };

    const toggleCamera = () => {
        setIsFrontCamera(prev => !prev);
    };

    const toggleSpeaker = () => {
        setIsSpeakerEnabled(prev => !prev);
    };

    const hangUp = () => {
        // Add hang-up logic here, for now just navigate back
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Video Call with {doctor}</Text>

            <View style={styles.videoContainer}>
                <RTCView 
                    streamURL={remoteStream.current ? remoteStream.current.toURL() : ''}
                    style={styles.remoteVideo}
                    objectFit="cover"
                />
                <RTCView 
                    streamURL={localStream.current ? localStream.current.toURL() : ''}
                    style={styles.localVideo}
                    objectFit="cover"
                />
            </View>

            <View style={styles.controlsContainer}>
                <TouchableOpacity style={styles.controlButton} onPress={toggleVideo}>
                    <Image source={isVideoEnabled ? videoCameraOn : videoCameraOff} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={toggleAudio}>
                    <Image source={isAudioEnabled ? microphoneOn : microphoneOff} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={toggleCamera}>
                    <Image source={cameraSwitch} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={toggleSpeaker}>
                    <Image source={isSpeakerEnabled ? volumeOn : volumeOff} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={hangUp}>
                    <Image source={hangUpIcon} style={styles.icon} />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomBar}>
                <Text style={styles.callDuration}>Call Duration: {callDuration} seconds</Text>
                
                <View style={styles.bottomControls}>
                    <TouchableOpacity style={styles.bottomControlButton} onPress={toggleMuteAll}>
                        <Text style={styles.bottomControlText}>{isMuted ? 'Unmute All' : 'Mute All'}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.bottomControlButton} onPress={endCall}>
                        <Text style={styles.bottomControlText}>End Call</Text>
                    </TouchableOpacity>

                    
            {/* Chat icon to toggle chat visibility */}
            <TouchableOpacity style={styles.bottomControlButton1} onPress={toggleChatVisibility}>
                <Image source={chatIcon} style={styles.icon1} />
            </TouchableOpacity>
                </View>
            </View>

            {isChatVisible && ( // Render chat section only if it's visible
                <View style={styles.chatContainer}>
                    <Text style={styles.chatHeader}>Chat</Text>
                    <ScrollView 
                        style={styles.chatMessages}
                        contentContainerStyle={styles.chatMessagesContent}
                        ref={(scrollView) => { this.scrollView = scrollView; }}
                        onContentSizeChange={() => {        
                            this.scrollView.scrollToEnd({ animated: true });
                        }}>
                        {chatMessages.map((msg, index) => (
                            <View key={index} style={msg.sender === 'user' ? styles.userMessage : styles.doctorMessage}>
                                <Text style={styles.messageSender}>{msg.sender === 'user' ? 'You' : 'Doctor'}</Text>
                                <Text style={styles.messageText}>{msg.message}</Text>
                                <Text style={styles.messageTimestamp}>{msg.timestamp}</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.chatInputContainer}>
                        <TextInput
                            style={styles.chatInput}
                            value={chatMessage}
                            onChangeText={text => setChatMessage(text)}
                            placeholder="Type your message..."
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: 'black',
    },
    videoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F3FF',
        borderRadius:9,
    },
    localVideo: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 100,
        height: 150,
        zIndex: 1,
        borderRadius: 10,
        backgroundColor: 'red',
    },
    remoteVideo: {
        flex: 1,
        backgroundColor: 'blue',
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
       // paddingHorizontal: 40,
        backgroundColor: '#fff',
        //marginHorizontal:6,
    },
    controlButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3085C3',
        marginHorizontal:6,
    },
    controlButton1: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3085C3',
        marginHorizontal:6,
    },
    icon: {
        width: 20,
        height: 20,
    },
    icon1: {
        width:20,
        height: 20,
    },

    bottomBar: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    callDuration: {
        fontSize: 14,
        marginBottom: 10,
        color: '#666',
    },
    bottomControls: {
        flexDirection: 'row',
    },
    bottomControlButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3085C3',
        marginHorizontal: 5,
    },
    bottomControlButton1: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        marginHorizontal: 5,
    },
    bottomControlText: {
        color: '#fff',
    },
    chatContainer: {
        flex: 1,
        backgroundColor: '#E8E8E8',
        padding: 10,
        borderRadius: 9,
        marginTop: 20,
    },
    chatHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    chatMessages: {
        flex: 1,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#3085C3',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        maxWidth: '70%',
    },
    doctorMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#DDD',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        maxWidth: '70%',
    },
    messageSender: {
        fontSize: 12,
        marginBottom: 2,
        color: '#666',
    },
    messageText: {
        color: '#fff',
    },
    messageTimestamp: {
        fontSize: 10,
        alignSelf: 'flex-end',
        color: '#aaa',
    },
    chatInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#3085C3',
        padding: 10,
        borderRadius: 5,
    },
    sendButtonText: {
        color: '#fff',
    },
});

export default VideoCallScreen;
