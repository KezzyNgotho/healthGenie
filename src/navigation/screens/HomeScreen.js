import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Virtual Healthcare Companion</Text>
            <Text style={styles.subtitle}>Your Personalized Health Assistant</Text>
            <View style={styles.buttonsContainer}>
                <Button title="Start Consultation" onPress={() => navigation.navigate('Consultation')} />
                <Button title="View Profile" onPress={() => navigation.navigate('Profile')} />
                <Button title="Explore Services" onPress={() => navigation.navigate('Services')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        color: '#666',
    },
    buttonsContainer: {
        width: '100%',
        marginTop: 20,
    },
});

export default HomeScreen;
