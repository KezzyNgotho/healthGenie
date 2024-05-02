import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Google Generative AI

// Initialize GenerativeAI
// Load environment variables (replace with your actual API key)
const GOOGLE_API_KEY = 'AIzaSyAzZES52JMwNuOcwT6139N_ux3AuTdcuhU';
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY, {
  endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
});


const HealthHabitScreen = () => {
    const [habitList, setHabitList] = useState([
      { id: 1, name: 'Exercise regularly', isSelected: false },
      { id: 2, name: 'Eat a healthy diet', isSelected: false },
      { id: 3, name: 'Get enough sleep', isSelected: false },
      { id: 4, name: 'Practice meditation', isSelected: false },
      { id: 5, name: 'Spend time in nature', isSelected: false },
      // Add more health habits here
    ]);
    const [selectedHabits, setSelectedHabits] = useState([]);
    const [goalDescription, setGoalDescription] = useState('');
    const [aiResponse, setAiResponse] = useState('');
  
    const handleHabitSelection = (habitId) => {
      const updatedHabitList = habitList.map((habit) => {
        if (habit.id === habitId) {
          return { ...habit, isSelected: !habit.isSelected };
        }
        return habit;
      });
      setHabitList(updatedHabitList);
      const selectedHabitIds = updatedHabitList.filter((habit) => habit.isSelected).map((habit) => habit.id);
      setSelectedHabits(selectedHabitIds);
    };
  
    const handleGoalDescriptionChange = (text) => {
      setGoalDescription(text);
    };
  
    const generateGoalPlan = async (userMessage) => {
      try {
        // Combine selected habits and goal description into a prompt
        const prompt = `The user wants to create a health goal plan. They have selected the following health habits:\n  - ${selectedHabits.map((id) => habitList.find((h) => h.id === id).name).join('\n  - ')}.\nThe user's goal description is: ${goalDescription}`;
  
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent({ prompt, maxTokens: 100 });
        
        const aiResponse = result.text;
  
        setAiResponse(aiResponse);
      } catch (error) {
        console.error('There was a problem with the API request:', error.message);
        // Handle error, e.g., display an error message to the user
      }
    };
  
    const renderHabitItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleHabitSelection(item.id)}>
        <Text style={styles.habitItem}>{item.name}{item.isSelected ? ' (selected)' : ''}</Text>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Health Habit Creation</Text>
  
        {/* List of health habits (users can select multiple) */}
        <Text style={styles.habitListLabel}>Select health habits you want to focus on:</Text>
        <FlatList
          data={habitList}
          renderItem={renderHabitItem}
          keyExtractor={(item) => item.id.toString()}
        />
  
        {/* Goal description input */}
        <Text style={styles.goalLabel}>Describe your overall health goal (optional):</Text>
        <TextInput
          style={styles.goalInput}
          multiline={true}
          placeholder="Enter your goal description..."
          onChangeText={handleGoalDescriptionChange}
        />
  
        {/* Generate plan button */}
        <Button title="Generate Health Plan" onPress={generateGoalPlan} />
  
        {/* AI response area */}
        {aiResponse && (
          <View style={styles.aiResponseBox}>
            <Text style={styles.aiResponseTitle}>AI-Generated Health Plan:</Text>
            <Text style={styles.aiResponse}>{aiResponse}</Text>
          </View>
        )}

        </View>
    )
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
