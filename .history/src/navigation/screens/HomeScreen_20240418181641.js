import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
    // Function to get the greeting based on the current time
    const getGreeting = () => {
        const currentTime = new Date().getHours();
        if (currentTime >= 5 && currentTime < 12) {
            return 'Good morning,';
        } else if (currentTime >= 12 && currentTime < 18) {
            return 'Good afternoon,';
        } else {
            return 'Good evening,';
        }
    };

    // Function to navigate to each feature
    const navigateToFeature = (screen) => {
        navigation.navigate(screen);
    };

    // Function to render health tips
    const renderHealthTips = () => {
        const tips = [
            'Eat a balanced diet rich in fruits and vegetables.',
            'Stay hydrated by drinking plenty of water throughout the day.',
            'Exercise regularly to keep your body and mind healthy.',
            'Get enough sleep each night to recharge your body.',
            'Practice mindfulness and meditation to reduce stress.',
            'Avoid smoking and excessive alcohol consumption.',
            'Schedule regular check-ups with your healthcare provider.',
            'Stay socially connected with friends and family for emotional well-being.',
        ];

        return tips.map((tip, index) => (
            <View key={index} style={styles.tipContainer}>
                <Text style={styles.tipText}>{tip}</Text>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            {/* Header: Username and notifications */}
            <View style={styles.header}>
                <Text style={styles.username}>Username</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                    <Image source={require('../assets/icons8-bell-26.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            {/* Greeting */}
            <Text style={styles.greeting}>{getGreeting()}</Text>
            
            {/* Health Tips */}
            <ScrollView contentContainerStyle={styles.tipsContainer}>
                {renderHealthTips()}
            </ScrollView>

            {/* Feature Buttons */}
            <View style={styles.buttonsContainer}>
                {renderFeatureButtons()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    icon: {
        width: 24,
        height: 24,
    },
    greeting: {
        fontSize: 20,
        color: '#3085C3',
        marginBottom: 20,
    },
    tipsContainer: {
        width: '100%',
        marginBottom: 20,
    },
    tipContainer: {
        backgroundColor: '#F0F3FF',
        borderRadius: 1,
        elevation: 2,
        padding: 15,
        marginBottom: 15,
    },
    tipText: {
        fontSize: 14,
        color: 'black',
    },
    buttonsContainer: {
        width: '100%',
    },
    featureContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#F0F3FF',
        borderRadius: 1,
        elevation: 2,
        padding: 10,
        flex: 1,
        marginRight: 10,
    },
    featureIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    featureTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        flex: 1, // Ensures the title takes up remaining space
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
});

export default HomeScreen;
