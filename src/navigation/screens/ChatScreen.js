import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

const ChatScreen = ({ route }) => {
    const { doctor } = route.params;
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    // Dummy data for messages
    const initialMessages = [
        { id: '1', sender: 'doctor', message: 'Hello! How can I assist you today?' },
        { id: '2', sender: 'user', message: 'I have been having headaches lately.' },
        { id: '3', sender: 'doctor', message: 'I recommend you to take a rest and drink plenty of water.' },
    ];

    useEffect(() => {
        setMessages(initialMessages);
    }, []);

    const sendMessage = () => {
        if (inputMessage.trim() === '') return;

        const newMessage = {
            id: (messages.length + 1).toString(),
            sender: 'user',
            message: inputMessage,
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');
    };

    const renderMessage = ({ item }) => {
        const messageStyle = item.sender === 'user' ? styles.userMessage : styles.doctorMessage;
        const textStyle = item.sender === 'user' ? styles.userText : styles.doctorText;

        return (
            <View style={[styles.messageContainer, messageStyle]}>
                <Text style={textStyle}>{item.message}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <View style={styles.header}>
                <Text style={styles.doctorName}>{doctor}</Text>
            </View>

            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.messagesContainer}
                inverted
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChangeText={setInputMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#3085C3',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    messagesContainer: {
        padding: 20,
        paddingBottom: 10,
    },
    messageContainer: {
        maxWidth: '80%',
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    doctorMessage: {
        backgroundColor: '#3085C3',
        alignSelf: 'flex-start',
    },
    userMessage: {
        backgroundColor: '#F0F3FF',
        alignSelf: 'flex-end',
    },
    doctorText: {
        color: '#fff',
    },
    userText: {
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        padding: 10,
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#3085C3',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ChatScreen;
