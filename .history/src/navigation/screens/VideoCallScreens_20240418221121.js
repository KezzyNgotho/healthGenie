import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VideoCallScreen = ({ route }) => {
    const { doctor } = route.params;

    return (
        <View style={styles.container}>
            <Text>Video call with {doctor}</Text>
            {/* Actual video call component will go here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default VideoCallScreen;
