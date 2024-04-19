import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';

const departments = [
    // ... departments array
];

const VirtualConsultationsScreen = ({ navigation }) => {
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const renderDepartmentItem = ({ item }) => {
        // ... same as before
    };

    const renderDoctorItem = ({ item }) => {
        return (
            <TouchableOpacity 
                style={styles.doctorItem} 
                onPress={() => setSelectedDoctor(item)}
            >
                <Text style={styles.doctorText}>{item}</Text>
                <Text style={styles.onlineStatus}>Online</Text> {/* Placeholder */}
            </TouchableOpacity>
        );
    };

    const startChat = () => {
        // Navigate to chat screen with selected doctor
        navigation.navigate('Chat', { doctor: selectedDoctor });
    };

    const startVideoCall = () => {
        // Navigate to video call screen with selected doctor
        navigation.navigate('VideoCall', { doctor: selectedDoctor });
    };

    const scheduleMeetup = () => {
        // Navigate to scheduler screen with selected doctor
        navigation.navigate('Scheduler', { doctor: selectedDoctor });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* ... same as before */}
            
            {/* Chat and Actions */}
            {selectedDoctor && (
                <View style={styles.actionContainer}>
                    <TouchableOpacity 
                        style={styles.actionButton} 
                        onPress={startChat}
                    >
                        <Text style={styles.actionButtonText}>Start Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.actionButton} 
                        onPress={startVideoCall}
                    >
                        <Text style={styles.actionButtonText}>Start Video Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.actionButton} 
                        onPress={scheduleMeetup}
                    >
                        <Text style={styles.actionButtonText}>Schedule Meetup</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // ... existing styles

    onlineStatus: {
        color: 'green',
        fontSize: 12,
        marginTop: 5,
    },

    actionContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        backgroundColor: '#3085C3',
        padding: 15,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 16,
        color: '#fff',
    },
});

export default VirtualConsultationsScreen;
