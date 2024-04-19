import React,{useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native';

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
 const [currentIndex, setCurrentIndex] = useState(0);

 // Array of health tips
 const healthTips = [
     'Eat a balanced diet rich in fruits and vegetables.',
     'Stay hydrated by drinking plenty of water throughout the day.',
     'Exercise regularly to keep your body and mind healthy.',
     'Get enough sleep each night to recharge your body.',
     'Practice mindfulness and meditation to reduce stress.',
     'Avoid smoking and excessive alcohol consumption.',
     'Schedule regular check-ups with your healthcare provider.',
     'Stay socially connected with friends and family for emotional well-being.',
 ];

 const renderHealthTip = () => {
     return (
         <TouchableOpacity onPress={nextTip} style={styles.cloudCard}>
             <Text style={styles.tipText}>{healthTips[currentIndex]}</Text>
         </TouchableOpacity>
     );
 };

 const nextTip = () => {
     setCurrentIndex((prevIndex) => (prevIndex + 1) % healthTips.length);
 };

    // Function to render feature buttons
    const renderFeatureButtons = () => {
        const features = [
            { title: 'Personalized Health Assistant', icon: require('../assets/icons8-assistant-65.png'), screen: 'Assistant'  },
            { title: 'Symptom Checker', icon: require('../assets/icons8-symptoms-64.png'), screen: 'SymptomChecker' },
            { title: 'Decision Support', icon: require('../assets/decision.jpeg'), screen: 'DecisionSupport' },
            { title: 'Mental Health Support', icon: require('../assets/mental.jpeg'), screen: 'MentalHealth' },
            { title: 'Virtual Consultations', icon: require('../assets/virtual.jpeg'), screen: 'VirtualConsultations' },
            { title: 'Health Education', icon: require('../assets/education.jpeg'), screen: 'HealthEducation' },
            { title: 'Medication Management', icon: require('../assets/medication.jpeg'), screen: 'MedicationManagement' },
            { title: 'Community Support', icon: require('../assets/community.jpeg'), screen: 'CommunitySupport' },
        ];

        const rows = [];
        let row = [];

        features.forEach((feature, index) => {
            row.push(
                <TouchableOpacity key={index} style={styles.featureContainer} onPress={() => navigateToFeature(feature.screen)}>
                    <Image source={feature.icon} style={styles.featureIcon} />
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                </TouchableOpacity>
            );

            if (index % 2 === 1 || index === features.length - 1) {
                rows.push(<View key={index} style={styles.row}>{row}</View>);
                row = [];
            }
        });

        return rows;
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
            {/* Feature Buttons */}


            {/* Health Tips */}
            <ScrollView contentContainerStyle={styles.tipsContainer}>
                {renderHealthTip()}
            </ScrollView>

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
    tipsContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cloudCard: {
        backgroundColor: '#F0F3FF',
        borderRadius: 30,  // Adjust the border-radius to make the cloud shape
        padding: 20,
        marginBottom: 15,
        marginHorizontal: 20,  // Horizontal margin for the cloud card
        width: '80%',  // Width of the cloud card
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,  // Shadow for depth
        borderWidth: 1,
        borderColor: '#D1D9E6', // Cloud color
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4, // Android shadow
        marginBottom: 20
    },
    
    tipText: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
    },

});

export default HomeScreen;
