import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import SymptomList from '../components/SymptomList';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY, {
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
});

const symptoms = [
    'Fever', 'Headache', 'Cough', 'Sore throat', 'Runny nose',
    'Body aches', 'Fatigue', 'Shortness of breath', 'Loss of taste or smell'
];

const SymptomCheckerScreen = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [userDescription, setUserDescription] = useState('');
    const [suggestedSymptoms, setSuggestedSymptoms] = useState([]);
    const [educationalInfo, setEducationalInfo] = useState(null);

    const handleSelectSymptom = (selected) => {
        setSelectedSymptoms(selected);
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

    useEffect(() => {
        const combinedSymptoms = [...selectedSymptoms, ...suggestedSymptoms];
        handleSelectSymptom(combinedSymptoms.filter((v, i, a) => a.indexOf(v) === i));
    }, [selectedSymptoms, suggestedSymptoms]);

    const suggestSymptoms = async (text) => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(text);
            const response = await result.response;
            const symptoms = response.text().split(', ');
            return symptoms;
        } catch (error) {
            console.error('Error suggesting symptoms:', error);
            return [];
        }
    };

    const fetchEducationalInfo = async (selectedSymptoms) => {
        const response = await fetch(healthInformationAPI + selectedSymptoms.join(','));
        return { /* educational information object */ };
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Symptom Checker</Text>
            <TextInput
                style={styles.textInput}
                multiline={true}
                placeholder="Describe your symptoms in detail..."
                onChangeText={handleDescriptionChange}
            />
            <Text style={styles.label}>Suggested Symptoms:</Text>
            <SymptomList symptoms={suggestedSymptoms} onSelectSymptom={handleSelectSymptom} />
            <Text style={styles.label}>Please select all symptoms you are experiencing (including suggested):</Text>
            <SymptomList symptoms={symptoms} onSelectSymptom={handleSelectSymptom} />
            <Button title="Next" onPress={handleNext} />
            {educationalInfo && (
                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>Educational Information:</Text>
                    <Text style={styles.infoText}>{educationalInfo.information}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    textInput: {
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#555',
    },
    infoBox: {
        marginTop: 20,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    infoText: {
        fontSize: 16,
        color: '#555',
    },
});

export default SymptomCheckerScreen;
