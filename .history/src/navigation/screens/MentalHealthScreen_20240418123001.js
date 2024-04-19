import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import Voice from '@react-native-community/voice';
import microphoneIcon from '../assets/icons8-mic-30.png';

const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.radioButton}>
    <View style={styles.radioContainer}>
      <View style={[styles.radioCircle, selected && styles.selectedRadioCircle]} />
      <Text style={styles.radioLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const LevelSelector = ({ levels, selectedLevel, onSelect }) => {
  const rows = [];
  
  for (let i = 0; i < levels.length; i += 4) {
    const rowLevels = levels.slice(i, i + 4);
    
    rows.push(
      <View key={i} style={styles.levelRow}>
        {rowLevels.map((level, index) => (
          <RadioButton
            key={index}
            label={level}
            selected={selectedLevel === level}
            onPress={() => onSelect(level)}
          />
        ))}
      </View>
    );
  }

  return <View>{rows}</View>;
};

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mental Health Screening</Text>

      {/* Mood Assessment */}
      <Text style={styles.sectionTitle}>Mood Assessment</Text>
      <TouchableOpacity
        style={styles.speechButton}
        onPress={() => handleSpeechRecognition(setMood)}
        disabled={isListening}
      >
        <Image source={microphoneIcon} style={styles.speechButtonIcon} />
        <Text style={styles.speechButtonText}>Speak</Text>
      </TouchableOpacity>
      <LevelSelector
        levels={['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy']}
        selectedLevel={mood}
        onSelect={(level) => handleLevelSelect(level, setMood)}
      />

      {/* Anxiety Level */}
      <Text style={styles.sectionTitle}>Anxiety Level</Text>
      <LevelSelector
        levels={['Low', 'Moderate', 'High', 'Very High']}
        selectedLevel={anxietyLevel}
        onSelect={(level) => handleLevelSelect(level, setAnxietyLevel)}
      />

      {/* Sleep Quality */}
      <Text style={styles.sectionTitle}>Sleep Quality</Text>
      <LevelSelector
        levels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
        selectedLevel={sleepQuality}
        onSelect={(level) => handleLevelSelect(level, setSleepQuality)}
      />

      {/* Energy Level */}
      <Text style={styles.sectionTitle}>Energy Level</Text>
      <LevelSelector
        levels={['Low', 'Moderate', 'High', 'Very High']}
        selectedLevel={energyLevel}
        onSelect={(level) => handleLevelSelect(level, setEnergyLevel)}
      />

      {/* Stress Level */}
      <Text style={styles.sectionTitle}>Stress Level</Text>
      <LevelSelector
        levels={['Low', 'Moderate', 'High', 'Very High']}
        selectedLevel={stressLevel}
        onSelect={(level) => handleLevelSelect(level, setStressLevel)}
      />

      {/* Social Connections */}
      <Text style={styles.sectionTitle}>Social Connections</Text>
      <LevelSelector
        levels={['Very Disconnected', 'Disconnected', 'Neutral', 'Connected', 'Very Connected']}
        selectedLevel={socialConnection}
        onSelect={(level) => handleLevelSelect(level, setSocialConnection)}
      />

      {/* Coping Mechanisms */}
      <Text style={styles.sectionTitle}>Coping Mechanisms</Text>
      <LevelSelector
        levels={['Exercise', 'Meditation', 'Talking to someone', 'Hobbies', 'Professional Help']}
        selectedLevel={copingMechanisms}
        onSelect={(level) => handleLevelSelect(level, setCopingMechanisms)}
      />

      {/* Personal Thoughts */}
      <Text style={styles.sectionTitle}>Personal Thoughts</Text>
      <LevelSelector
        levels={['Hopeless', 'Difficulty concentrating', 'Loss of interest', 'Changes in appetite', 'Thoughts of self-harm']}
        selectedLevel={personalThoughts}
        onSelect={(level) => handleLevelSelect(level, setPersonalThoughts)}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
   // alignItems: 'center',
    //justifyContent: 'center',
    marginHorizontal:20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
    fontFamily: 'cursive',
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  radioButton: {
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007bff',
    marginRight: 10,
  },
  selectedRadioCircle: {
    backgroundColor: '#007bff',
  },
  radioLabel: {
    fontSize: 12,
    color: '#333333',
  },
  speechButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: '50%',
  },
  speechButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
  },
  speechButtonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#F0F3FF',
    padding: 18,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 40,
    width: '50%',
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default MentalHealthScreen;
