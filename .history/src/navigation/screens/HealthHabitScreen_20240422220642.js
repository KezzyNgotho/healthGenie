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
  style={styles.habitListContainer}
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

     
      <TouchableOpacity
  style={styles.generateButton}
  onPress={generateGoalPlan}
>
  <Text style={styles.generateButtonText}>Generate Health Plan</Text>
</TouchableOpacity>

<View style={styles.healthPlanContainer}>
        <Text style={styles.healthPlanTitle}>Personalized Health Plan:</Text>
        
        {aiResponse ? (
          <View style={styles.aiResponseContainer}>
            <Text style={styles.healthPlanText}>{aiResponse}</Text>
          </View>
        ) : (
          <Text style={styles.defaultText}>Generating health plan...</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

    generateButton: {
        backgroundColor: '#F0F3FF',  // Button background color
        borderRadius: 5,
        borderWidth:0.7,
        paddingVertical: 6,
        paddingHorizontal: 20,
        width:130,
        elevation: 2,  // For Android shadow
        shadowColor: '#000',  // For iOS shadow
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        alignItems: 'center',
        justifyContent: 'center',
      },
      generateButtonText: {
        fontSize: 18,
        color: '#000',  // Button text color
        fontWeight: 'bold',
        fontFamily:'cursive',
      },
      
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      marginBottom: 15,
    },
    label: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#3085C3',
      marginBottom: 10,
      fontFamily:'cursive'
    },
    habitItem: {
      fontSize: 16,
      color: '#000',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    selectedHabitItem: {
      color: '#3085C3', // Selected item color
      fontWeight: 'bold',
    },
    input: {
      fontSize: 16,
      color: '#000',
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      minHeight: 100,
      textAlignVertical: 'top',
      marginBottom: 20,
    },
    habitListContainer: {
      marginTop: 20,
      borderRadius: 7,
      backgroundColor: '#ffffff',
      elevation: 2, // For Android shadow
      shadowColor: '#000', // For iOS shadow
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
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
      color:'black'
    },
    defaultText: {
      color: '#ccc',
      fontStyle: 'italic',
    },
    aiResponseContainer: {
        marginTop: 10,
        padding: 10,
        borderRadius: 3,
        backgroundColor: '#ffffff',
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
      },
  });
  
export default HealthHabitScreen;
