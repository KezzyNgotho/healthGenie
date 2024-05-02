import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY = 'Your_API_Key';
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
  
      console.log('Sending prompt:', prompt);
  
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
  
      console.log('API Response:', result);
  
      if (result && result.response && result.response.text) {
        const text = result.response.text();
        setAiResponse(text);
      } else {
        console.error('Unexpected response:', result);
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

      <View style={styles.healthPlanContainer}>
        <Text style={styles.healthPlanTitle}>Personalized Health Plan:</Text>
        {aiResponse ? (
          <Text style={styles.healthPlanText}>{aiResponse}</Text>
        ) : (
          <Text style={styles.defaultText}>Generating health plan...</Text>
        )}
      </View>
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3085C3',
    marginBottom: 10,
    fontFamily:'cursive'
  },
  habitItem: {
    fontSize: 16,
    color: 'black',
    paddingVertical: 5,
  },
  selectedHabitItem: {
    color: 'maroon', // Selected item color
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
  healthPlanContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
  },
  healthPlanTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  healthPlanText: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultText: {
    color: '#ccc',
    fontStyle: 'italic',
  }
});

export default HealthHabitScreen;
