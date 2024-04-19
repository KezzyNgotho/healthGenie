import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatScreen = ({ route }) => {
    const { doctor } = route.params;

    return (
        <View style={styles.container}>
            <Text>Chat with {doctor}</Text>
            {/* Actual chat component will go here */}
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

export default ChatScreen;
