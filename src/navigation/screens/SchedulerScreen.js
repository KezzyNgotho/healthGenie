import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SchedulerScreen = ({ route }) => {
    const { doctor } = route.params;

    return (
        <View style={styles.container}>
            <Text>Schedule a meetup with {doctor}</Text>
            {/* Scheduler component will go here */}
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

export default SchedulerScreen;
