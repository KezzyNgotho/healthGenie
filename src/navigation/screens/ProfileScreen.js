import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
    // Fetch user data or use context API to access user information
    const user = { name: 'John Doe', email: 'john@example.com' };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            {/* Add more profile information here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default ProfileScreen;
