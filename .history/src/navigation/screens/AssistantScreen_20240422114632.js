import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    ScrollView, 
    Image 
} from 'react-native';
import Voice from '@react-native-community/voice';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
const GOOGLE_API_KEY = 'AIzaSyAzZES52JMwNuOcwT6139N_ux3AuTdcuhU'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY, {
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
});

const AssistantScreen = () => {
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [symptoms, setSymptoms] = useState('');

    const addMessage = () => {
        if (message.trim() !== '') {
            const updatedConversation = [...conversation, { speaker: 'user', message }];
            setConversation(updatedConversation);
            processUserMessage(message);
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
            console.error('Oups!:', error);
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
        setConversation([...conversation, { speaker: 'user', message: 'Symptoms and medical history sent.' }]);
        processUserMessage(symptoms + ' ' + medicalHistory);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Medical Assistant</Text>

            <ScrollView 
                contentContainerStyle={styles.chatContainer}
                showsVerticalScrollIndicator={false}
            >
                {conversation.map((item, index) => (
                    <View key={index} style={item.speaker === 'assistant' ? styles.aiResponse : styles.userMessage}>
                        <Text style={item.speaker === 'assistant' ? styles.aiText : styles.userText}>{item.message}</Text>
                    </View>
                ))}
            </ScrollView>

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
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#3085C3',
        textAlign: 'center',
        fontFamily: 'cursive',
    },
    chatContainer: {
        flexGrow: 1,
        paddingVertical: 10,
    },
    aiResponse: {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        maxWidth: '80%',
    },
    aiText: {
        fontSize: 16,
        color: '#000',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#F0F3FF',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        maxWidth: '80%',
    },
    userText: {
        fontSize: 16,
        color: '#3085C3',
        alignSelf: 'flex-start',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 0.4,
        borderColor: '#000',
        borderRadius: 5,
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#F0F3FF',
    },
    sendButton: {
        backgroundColor: '#3085C3',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    microphoneButton: {
        backgroundColor: '#f0f0f0',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3085C3',
    },
    microphoneIcon: {
        width: 30,
        height: 30,
    },
    inputLabel: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    inputContainer1: {
        marginBottom: 20,
    },
    input1: {
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 5,
        fontSize: 16,
        padding: 10,
        minHeight: 150,
    },
    sendButton1: {
        backgroundColor: '#3085C3',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    sendButtonText1: {
        fontSize: 16,
        color: '#fff',
    },
});

export default AssistantScreen
