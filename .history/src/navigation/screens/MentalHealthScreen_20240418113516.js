import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Voice from '@react-native-community/voice';

const LevelSelector = ({ levels, selectedLevel, onSelect }) => (
  <View style={styles.levelSelector}>
    {levels.map((level, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.levelButton, selectedLevel === level ? styles.selectedLevel : null]}
        onPress={() => onSelect(level)}
      >
        <Text style={styles.levelButtonText}>{level}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const MentalHealthScreen = () => {
  const [mood, setMood] = useState('');
  const [anxietyLevel, setAnxietyLevel] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [socialConnection, setSocialConnection] = useState('');
  const [copingMechanisms, setCopingMechanisms] = useState([]);
  const [personalThoughts, setPersonalThoughts] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const handleSpeechRecognition = async (setFunction) => {
    setIsListening(true);
    try {
      await Voice.start('en-US');
      Voice.onSpeechResults = (event) => {
        setFunction(event.value[0]);
        setIsListening(false);
      };
    } catch (error) {
      setIsListening(false);
      Alert.alert('Error', 'Failed to recognize speech');
    }
  };

  const handleLevelSelect = (level, setFunction) => {
    setFunction(level);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mental Health Screening</Text>

      {/* Mood Assessment */}
      <Text style={styles.sectionTitle}>Mood Assessment</Text>
      <TouchableOpacity
        style={styles.speechButton}
        onPress={() => handleSpeechRecognition(setMood)}
        disabled={isListening}
      >
        <Text style={styles.speechButtonText}>Speak</Text>
      </TouchableOpacity>
      <LevelSelector
        levels={['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy']}
        selectedLevel={mood}
        onSelect={(level) => handleLevelSelect(level, setMood)}
      />

      {/* Other Sections (Anxiety Level, Sleep Quality, etc.) */}
      {/* ... (Similar styling for other sections) */}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333333',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#555555',
  },
  levelSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  levelButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d0d0d0',
  },
  levelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  selectedLevel: {
    backgroundColor: '#b0c4de',
    borderColor: '#7a8ea8',
  },
  speechButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  speechButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 18,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 40,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default MentalHealthScreen;
