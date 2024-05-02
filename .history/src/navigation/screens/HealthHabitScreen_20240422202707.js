import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai";

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
  ]);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [goalDescription, setGoalDescription] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleHabitSelection = (habitId) => {
    const updatedHabitList = habitList.map((habit) => 
      habit.id === habitId ? { ...habit, isSelected: !habit.isSelected } : habit
    );
    setHabitList(updatedHabitList);
    setSelectedHabits(updatedHabitList.filter((habit) => habit.isSelected).map((habit) => habit.id));
  };

  const handleGoalDescriptionChange = (text) => {
    setGoalDescription(text);
  };

  const generateGoalPlan = async () => {
    try {
      const selectedHabitNames = selectedHabits.map((id) => habitList.find((h) => h.id === id).name);
      const prompt = `The user wants to create a health goal plan. They have selected the following health habits:\n- ${selectedHabitNames.join('\n- ')}.\nThe user's goal description is: ${goalDescription}`;
  
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
  
      if (result && result.response && result.response.data && result.response.data.text) {
        const text = result.response.data.text;
        setAiResponse(text);
      } else {
        throw new Error('Unexpected response format: Missing or invalid response data');
      }
    } catch (error) {
      console.error('Error generating response:', error);
      setAiResponse('An error occurred while generating your health plan. Please try again later.');
    }
  };
  
  
  
  const renderHabitItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleHabitSelection(item.id)}>
      <Text style={[styles.habitItem, item.isSelected && styles.selectedHabitItem]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Habit Creation</Text>

      <Text style={styles.label}>Select health habits you want to focus on:</Text>
      <FlatList
        data={habitList}
        renderItem={renderHabitItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Text style={styles.label}>Describe your overall health goal (optional):</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="Enter your goal description..."
        onChangeText={handleGoalDescriptionChange}
      />

      <Button title="Generate Health Plan" onPress={generateGoalPlan} />
      {aiResponse ? (
  <View style={styles.healthPlanContainer}>
    <Text style={styles.healthPlanTitle}>Personalized Health Plan:</Text>
    <Text style={styles.healthPlanText}>{aiResponse}</Text>
  </View>
) : (
  <Text style={styles.defaultText}>Generating health plan...</Text>
)}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  habitItem: {
    fontSize: 16,
    color: '#666',
    paddingVertical: 5,
  },
  selectedHabitItem: {
    color: '#007bff', // Selected item color
  },
  input: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  responseContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e0ffe0',
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 1.5,
  },
  healthPlanContainer:{
    backgroundColor: #f5f5f5, /* Light gray background for better readability */
    borderradius:5, /* Rounded corners for a softer look */
    padding: 15,/* Padding for spacing around content */
    margintop: 20, /* Margin for separation from previous content */
  },
  
  healthPlanTitle:{
    fontweight: 'bold',
    fontsize: 16;
    margin-bottom: 5px; /* Spacing between title and text */
  }
  
  .healthPlanText {
    line-height: 1.5; /* Improved readability for multi-line text */
  }
  
  .defaultText {
    color: #ccc; /* Lighter color for default message */
    font-style: italic;
  }
  
});

export default HealthHabitScreen;
