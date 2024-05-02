import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TextInput, 
    TouchableOpacity, 
    Linking, 
    Alert,
    ScrollView 
} from 'react-native';
import SymptomList from '../components/SymptomList';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Google Generative AI initialization
const GOOGLE_API_KEY = 'AIzaSyAzZES52JMwNuOcwT6139N_ux3AuTdcuhU';
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY, {
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
});

// Define the symptoms array
const symptoms = [
    'Fever', 'Headache', 'Cough', 'Sore throat', 'Runny nose',
    'Body aches', 'Fatigue', 'Shortness of breath', 'Loss of taste or smell'
];

const SymptomCheckerScreen = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [userDescription, setUserDescription] = useState('');
    const [suggestedSymptoms, setSuggestedSymptoms] = useState([]);
    const [educationalInfo, setEducationalInfo] = useState(null);
    const [severityRating, setSeverityRating] = useState({});
    const [emergencyContact, setEmergencyContact] = useState(null);

 
    const handleSelectSymptom = (selected) => {
        setSelectedSymptoms(prevSelected => {
            if (prevSelected.includes(selected)) {
                // Remove the symptom if already selected
                return prevSelected.filter(symptom => symptom !== selected);
            } else {
                // Add the symptom if not already selected
                return [...prevSelected, selected];
            }
        });
    };
    const handleNext = async () => {
        const info = await fetchEducationalInfo(selectedSymptoms);
        setEducationalInfo(info);
    };

    const handleDescriptionChange = async (text) => {
        setUserDescription(text);
        const suggestions = await suggestSymptoms(text);
        setSuggestedSymptoms(suggestions);
    };

    const suggestSymptoms = async (text) => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(text);
            const response = await result.response;
            return response.text().split(', ');
        } catch (error) {
            console.error('Error suggesting symptoms:', error);
            return [];
        }
    };

    const fetchEducationalInfo = async (selectedSymptoms) => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(`Educational sites for ${selectedSymptoms.join(', ')}`);
            const response = await result.response;
            return response.text().split(', ').slice(0, 3); 
        } catch (error) {
            console.error('Error generating educational info:', error);
            return null;
        }
    };
    

    const rateSymptomSeverity = (symptom, rating) => {
        setSeverityRating(prev => ({ ...prev, [symptom]: rating }));
    };

    const callEmergencyContact = () => {
        emergencyContact 
            ? Linking.openURL(`tel:${emergencyContact}`)
            : Alert.alert('Error', 'Emergency contact not set.');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Symptom Checker</Text>
            
            <TextInput
                style={styles.textInput}
                multiline
                placeholder="Describe your symptoms in detail..."
                onChangeText={handleDescriptionChange}
            />
            
            <Text style={styles.suggestionLabel}>Suggested Symptoms:</Text>
            <SymptomList 
                symptoms={suggestedSymptoms} 
                onSelectSymptom={handleSelectSymptom} 
            />
            
            <Text style={styles.instruction}>Select all symptoms you are experiencing:</Text>
            <SymptomList 
                symptoms={symptoms} 
                onSelectSymptom={handleSelectSymptom} 
            />
            
            <Text style={styles.ratingLabel}>Rate Symptom Severity:</Text>
            
            {Array.isArray(selectedSymptoms) ? (
                selectedSymptoms.map(symptom => (
                    <View key={symptom} style={styles.ratingContainer}>
                        <Text>{symptom}</Text>
                        <View style={styles.ratingButtons}>
                            {['Mild', 'Moderate', 'Severe'].map(rating => (
                                <TouchableOpacity 
                                    key={rating}
                                    onPress={() => rateSymptomSeverity(symptom, rating)}
                                >
                                    <Text 
                                        style={
                                            severityRating[symptom] === rating 
                                            ? styles.selectedRating 
                                            : styles.ratingText
                                        }
                                    >
                                        {rating}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))
            ) : (
                <Text>No symptoms selected</Text>
            )}

            <Button title="Next" onPress={handleNext} />
            
           
            
            {educationalInfo && (
    <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Educational Information:</Text>
        {educationalInfo.map((site, index) => (
            <Text key={index} style={styles.infoText}>{site}</Text>
        ))}
    </View>
)}
 <View style={styles.emergencyContainer}>
                <Button title="Call Emergency Contact" onPress={callEmergencyContact} />
                <TextInput
                    style={styles.emergencyInput}
                    placeholder="Emergency Contact Number"
                    keyboardType="phone-pad"
                    onChangeText={setEmergencyContact}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        minHeight: 100,
    },
    suggestionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    instruction: {
        fontSize: 16,
        marginBottom: 10,
    },
    ratingLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    ratingButtons: {
        flexDirection: 'row',
    },
    ratingText: {
        fontSize: 16,
        marginRight: 10,
        color: '#333',
    },
    selectedRating: {
        fontSize: 16,
        marginRight: 10,
        color: '#007bff',
        fontWeight: 'bold',
    },
    emergencyContainer: {
        marginTop: 20,
    },
    emergencyInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
    },
    infoBox: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 15,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
    },
});

export default SymptomCheckerScreen;
