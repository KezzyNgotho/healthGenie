import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Google Generative AI

// Initialize GenerativeAI
// Load environment variables (replace with your actual API key)
const GOOGLE_API_KEY = 'YOUR_API_KEY';
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY, {
  endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
});

const HealthHabitScreen = () => {
  // ... (rest of the code remains the same)
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow content to expand and fill the screen
    backgroundColor: '#f2f2f2', // Light background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Darker text
    textAlign: 'center',
    marginBottom: 15,
  },
  habitListLabel: {
    fontSize: 18,
    fontWeight: '500', // Medium weight for headings
    color: '#333',
    marginBottom: 10,
  },
  habitItem: {
    fontSize: 16,
    color: '#666', // Text with a slight grey tone
    paddingVertical: 5,
  },
  goalLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  goalInput: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    borderRadius: 5, // Rounded corners for a softer look
    backgroundColor: '#fff', // White background for input
    minHeight: 100, // Set a minimum height for multiline input
    textAlignVertical: 'top', // Align content at the top for better readability
  },
  aiResponseBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e0ffe0', // Light green background for AI response
  },
  aiResponseTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  aiResponse: {
    fontSize: 16,
    color: '#333',
    lineHeight: 1.5, // Add some line spacing for readability
  },
});

export default HealthHabitScreen;
