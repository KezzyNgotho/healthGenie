import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { RTCView } from 'react-native-webrtc'; // Assuming you're using react-native-webrtc for video calls

const VideoCallScreen = ({ route }) => {
    const { doctor } = route.params;
    const [isVideoEnabled, setIsVideoEnabled] = useState(true); // Video toggle
    const [isAudioEnabled, setIsAudioEnabled] = useState(true); // Audio toggle
    const [isFrontCamera, setIsFrontCamera] = useState(true); // Camera toggle
    const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true); // Speaker toggle
    const localStream = useRef(null);
    const remoteStream = useRef(null);

    useEffect(() => {
        // Initialize video call here
        // You can use WebRTC, Agora, or any other library for video conferencing

        return () => {
            // Clean up resources on screen unmount
        };
    }, []);

    const toggleVideo = () => {
        // Toggle local video
        setIsVideoEnabled(prev => !prev);
    };

    const toggleAudio = () => {
        // Toggle local audio
        setIsAudioEnabled(prev => !prev);
    };

    const toggleCamera = () => {
        // Toggle camera front/back
        setIsFrontCamera(prev => !prev);
    };

    const toggleSpeaker = () => {
        // Toggle speaker
        setIsSpeakerEnabled(prev => !prev);
    };

    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                {/* Remote Video Stream */}
                <RTCView 
                    streamURL={remoteStream.current ? remoteStream.current.toURL() : ''}
                    style={styles.remoteVideo}
                    objectFit="cover"
                />
                {/* Local Video Stream */}
                <RTCView 
                    streamURL={localStream.current ? localStream.current.toURL() : ''}
                    style={styles.localVideo}
                    objectFit="cover"
                />
            </View>

            <View style={styles.controlsContainer}>
                <TouchableOpacity style={styles.controlButton} onPress={toggleVideo}>
                    <Text style={styles.controlButtonText}>{isVideoEnabled ? 'Turn off Video' : 'Turn on Video'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={toggleAudio}>
                    <Text style={styles.controlButtonText}>{isAudioEnabled ? 'Mute' : 'Unmute'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={toggleCamera}>
                    <Text style={styles.controlButtonText}>{isFrontCamera ? 'Switch to Back Camera' : 'Switch to Front Camera'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={toggleSpeaker}>
                    <Text style={styles.controlButtonText}>{isSpeakerEnabled ? 'Use Earpiece' : 'Use Speaker'}</Text>
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
    controlButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    doctorName: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default VideoCallScreen;
