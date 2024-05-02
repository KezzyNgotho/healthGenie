import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
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

  
  const renderHabitItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleHabitSelection(item.id)}>
      <Text style={[styles.habitItem, item.isSelected && styles.selectedHabitItem]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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

      {aiResponse && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>AI-Generated Health Plan:</Text>
          <Text style={styles.responseText}>{aiResponse}</Text>
        </View>
      )}
    </View>
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
});

export default HealthHabitScreen;
