import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RTCView } from 'react-native-webrtc';

const videoCameraOn = require('../assets/icons8-video-camera-100.png');
const videoCameraOff = require('../assets/icons8-no-video-40.png');
const microphoneOn = require('../assets/microphone-30.png');
const microphoneOff = require('../assets/icons8-block-microphone-40.png');
const cameraSwitch = require('../assets/icons8-switch-camera-40.png');
const volumeOn = require('../assets/icons8-volume-40.png');
const volumeOff = require('../assets/icons8-no-');

const VideoCallScreen = ({ route }) => {
    const { doctor } = route.params;
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true);
    const localStream = useRef(null);
    const remoteStream = useRef(null);

    useEffect(() => {
        // Initialize video call here

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

    return (
        <View style={styles.container}>
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
            </View>

            <Text style={styles.doctorName}>Video call with {doctor}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    videoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    localVideo: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 100,
        height: 150,
        zIndex: 1,
        borderRadius: 10,
    },
    remoteVideo: {
        flex: 1,
        backgroundColor: '#000',
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    controlButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3085C3',
    },
    icon: {
        width: 30,
        height: 30,
    },
    doctorName: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default VideoCallScreen;
