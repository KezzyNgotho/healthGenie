import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RtcEngine, AgoraView } from 'react-native-agora';
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

    const engine = useRef(null);

    useEffect(() => {
        const initAgora = async () => {
            engine.current = await RtcEngine.create('YOUR_AGORA_APP_ID');

            engine.current.enableVideo();
            engine.current.enableAudio();

            engine.current.addListener('UserJoined', (uid) => {
                console.log('UserJoined', uid);
            });

            engine.current.addListener('UserOffline', (uid, reason) => {
                console.log('UserOffline', uid, reason);
            });

            engine.current.addListener('JoinChannelSuccess', (channel, uid) => {
                console.log('JoinChannelSuccess', channel, uid);
            });

            engine.current.addListener('RemoteVideoStateChanged', (uid, state) => {
                console.log('RemoteVideoStateChanged', uid, state);
            });

            await engine.current.joinChannel(null, doctor, null, 0);
        };

        initAgora();

        return () => {
            engine.current.leaveChannel();
            RtcEngine.destroy();
        };
    }, [doctor]);

    const toggleVideo = () => {
        setIsVideoEnabled(prev => {
            prev ? engine.current.disableVideo() : engine.current.enableVideo();
            return !prev;
        });
    };

    const toggleAudio = () => {
        setIsAudioEnabled(prev => {
            prev ? engine.current.muteLocalAudioStream(true) : engine.current.muteLocalAudioStream(false);
            return !prev;
        });
    };

    const toggleCamera = () => {
        setIsFrontCamera(prev => {
            engine.current.switchCamera();
            return !prev;
        });
    };

    const toggleSpeaker = () => {
        setIsSpeakerEnabled(prev => {
            engine.current.setEnableSpeakerphone(!prev);
            return !prev;
        });
    };

    return (
        <View style={styles.container}>
            <AgoraView style={styles.remoteVideo} mode={1} />
            <AgoraView style={styles.localVideo} mode={1} zOrderMediaOverlay={true} />

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
