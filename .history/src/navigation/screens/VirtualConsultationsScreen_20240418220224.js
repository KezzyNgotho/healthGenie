import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';

const departments = [
    { id: '1', name: 'Cardiology', doctors: ['Dr. Smith', 'Dr. Johnson'] },
    { id: '2', name: 'Dermatology', doctors: ['Dr. Williams', 'Dr. Brown'] },
    { id: '3', name: 'Neurology', doctors: ['Dr. Jones', 'Dr. Davis'] },
    // Add more departments as needed
];

const VirtualConsultationsScreen = ({ navigation }) => {
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const renderDepartmentItem = ({ item }) => {
        return (
            <TouchableOpacity 
                style={styles.departmentItem} 
                onPress={() => setSelectedDepartment(item)}
            >
                <Text style={styles.departmentText}>{item.name}</Text>
            </TouchableOpacity>
        );
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

    const navigateToVideoCall = (doctor) => {
        // Navigate to the video call screen with selected doctor
        navigation.navigate('VideoCall', { doctor });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Virtual Consultations and Telemedicine</Text>
            </View>

            {/* Departments List */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Select a Department</Text>
                <FlatList 
                    data={departments}
                    renderItem={renderDepartmentItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            {/* Doctors List */}
            {selectedDepartment && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Choose a Doctor</Text>
                    <FlatList 
                        data={selectedDepartment.doctors}
                        renderItem={renderDoctorItem}
                        keyExtractor={(item) => item}
                    />
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3085C3',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3085C3',
        marginBottom: 20,
    },
    departmentItem: {
        backgroundColor: '#3085C3',
        padding: 15,
        borderRadius: 5,
        marginRight: 10,
    },
    departmentText: {
        fontSize: 16,
        color: '#fff',
    },
    doctorItem: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    doctorText: {
        fontSize: 16,
        color: '#3085C3',
    },
});

export default VirtualConsultationsScreen;
