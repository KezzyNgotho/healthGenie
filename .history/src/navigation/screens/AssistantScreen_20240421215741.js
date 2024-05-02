import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Voice from '@react-native-community/voice';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const AssistantScreen = () => {
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [symptoms, setSymptoms] = useState('');

    // Initialize GenerativeAI with the correct endpoint
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY, {
        endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    });

    useEffect(() => {
        // No need to load environment variables here again
        // The GOOGLE_API_KEY is already initialized above
    }, []);

    const addMessage = () => {
        if (message.trim() !== '') {
            const updatedConversation = [...conversation, { speaker: 'user', message }];
            setConversation(updatedConversation);
            processUserMessage(message); // Pass user's message as prompt
            setMessage('');
        }
    }; 

    const processUserMessage = async (userMessage) => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(userMessage);
            const response = await result.response;
            const text = await response.text();
            
            const updatedConversation = [...conversation, { speaker: 'assistant', message: text }];
            setConversation(updatedConversation);
        } catch (error) {
            console.error('Error generating response:', error);
        }
    };
    
    const startSpeechToText = async () => {
        try {
            await Voice.start('en-US');
        } catch (error) {
            console.log('Speech recognition error:', error);
        }
    };

    Voice.onSpeechResults = (e) => {
        setMessage(e.value[0]);
    };

    const sendSymptomsAndHistory = () => {
        console.log('Sending Symptoms:', symptoms);
        console.log('Sending Medical History:', medicalHistory);
        setConversation([...conversation, { speaker: 'user', message: 'Symptoms and medical history sent.' }]);
        processUserMessage(symptoms + ' ' + medicalHistory);
    };
    const startSpeechToText = async () => {
        try {
            await Voice.start('en-US');
        } catch (error) {
            console.log('Speech recognition error:', error);
        }
    };

    Voice.onSpeechResults = (e) => {
        setMessage(e.value[0]);
    };

    const sendSymptomsAndHistory = () => {
        console.log('Sending Symptoms:', symptoms);
        console.log('Sending Medical History:', medicalHistory);
        setConversation([...conversation, { speaker: 'user', message: 'Symptoms and medical history sent.' }]);
        processUserMessage(symptoms + ' ' + medicalHistory);
    }; *

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Medical Assistant</Text>

            {/* Chat container */}
            <ScrollView contentContainerStyle={styles.chatContainer}>
                {conversation.map((item, index) => (
                    <View key={index} style={item.speaker === 'assistant' ? styles.aiResponse : styles.userMessage}>
                        <Text style={item.speaker === 'assistant' ? styles.aiText : styles.userText}>{item.message}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Input container */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message here..."
                    placeholderTextColor="#999"
                    value={message}
                    onChangeText={setMessage}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={addMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.microphoneButton} onPress={startSpeechToText}>
                    <Image source={require('../assets/icons8-mic-30.png')} style={styles.microphoneIcon} />
                </TouchableOpacity>
            </View>
           
            {/* Medical history and symptoms container */}
            <View style={styles.inputContainer1}>
                <Text style={styles.inputLabel}>Symptoms:</Text>
                <TextInput
                    style={styles.input1}
                    placeholder="Enter your symptoms here..."
                    placeholderTextColor="#000"
                    value={symptoms}
                    onChangeText={setSymptoms}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton1} onPress={sendSymptomsAndHistory}>
                    <Text style={styles.sendButtonText1}>Send Symptoms</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
        fontSize:14,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'#3085C3',
        alignContent:'center',
        alignSelf:'center',
        fontFamily: 'cursive',
    },
    chatContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    aiResponse: {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        maxWidth: '80%',
    },
    aiText: {
        fontSize: 14,
        color: '#000',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#F0F3FF',
        padding: 10,
        borderRadius: 10,
        marginBottom: 7,
        maxWidth: '80%',
    },
    userText: {
        fontSize: 14,
        color: '#3085C3',
        alignSelf: 'flex-start',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginBottom: 1,
        borderWidth: 0.4,
        borderColor: '#000',
        borderRadius: 1,
        fontSize: 16,
        paddingVertical: 6,
        paddingHorizontal: 15,
        backgroundColor:'#F0F3FF'

    },
    sendButton: {
        backgroundColor: '#3085C3',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
        marginLeft: 7,
        alignItems:'center',
        alignContent:'center',
    },
    sendButton1: {
        backgroundColor: '#3085C3',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 3,
        marginLeft: 8,
    },
    microphoneButton: {
        backgroundColor: '#f0f0f0',
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3085C3',
        marginLeft: 8,
    },
    microphoneIcon: {
        width: 30,
        height: 30,
    },
    inputLabel: {
        marginBottom: 5,
        fontSize: 16,
        color: '#000',
    },
    inputContainer1: {
        marginBottom: 10,
    },
    input1: {
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 4,
        fontSize: 16,
        padding: 10,
        minHeight: 100,
    },
    sendButtonText: {
        fontSize: 12,
        color: '#fff',
        alignSelf:'center'
    },
    sendButtonText1: {
        fontSize: 12,
        color: '#fff',
        alignSelf:'center'
    },
});

export default AssistantScreen;
