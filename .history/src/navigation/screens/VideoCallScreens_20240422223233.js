import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TwilioVideoLocalView, TwilioVideoParticipantView } from 'react-native-twilio-video-webrtc';
import AsyncStorage from '@react-native-community/async-storage';

const videoCameraOn = require('../assets/icons8-video-camera-100.png');
const videoCameraOff = require('../assets/icons8-no-video-40.png');
const microphoneOn = require('../assets/icons8-mic-30.png');
const microphoneOff = require('../assets/icons8-block-microphone-40.png');
const cameraSwitch = require('../assets/icons8-switch-camera-40.png');
const volumeOn = require('../assets/icons8-volume-40.png');
const volumeOff = require('../assets/icons8-no-audio-40.png');

const VideoCallScreen = ({ route }) => {
    const { doctor } = route.params;
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true);

    const [token, setToken] = useState(null);
    const [roomName, setRoomName] = useState(doctor);

    useEffect(() => {
        const fetchToken = async () => {
            // Fetch Twilio token from your server
            const fetchedToken = await AsyncStorage.getItem('twilioToken');
            setToken(fetchedToken);
        };

        fetchToken();
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
            <TwilioVideoParticipantView
                style={styles.remoteVideo}
            />
            <TwilioVideoLocalView
                enabled={isVideoEnabled}
                style={styles.localVideo}
            />

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
    remoteVideo: {
        flex: 1,
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
