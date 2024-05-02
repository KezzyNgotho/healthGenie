import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, TextInput } from 'react-native';
import Voice from '@react-native-community/voice';
import { GoogleGenerativeAI } from "@google/generative-ai";
import microphoneIcon from '../assets/icons8-mic-30.png';

const GOOGLE_API_KEY = 'AIzaSyAzZES52JMwNuOcwT6139N_ux3AuTdcuhU';
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY, {
  endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
});

const LevelSelector = ({ levels, selectedLevel, onSelect, category }) => {
  const rows = [];

  for (let i = 0; i < levels.length; i += 4) {
    const rowLevels = levels.slice(i, i + 4);

    rows.push(
      <View key={i} style={styles.levelRow}>
        {rowLevels.map((level, index) => (
          <TouchableOpacity key={index} onPress={() => onSelect(level)} style={styles.radioButton}>
            <View style={styles.radioContainer}>
              <View style={[styles.radioCircle, selectedLevel === level && styles.selectedRadioCircle]} />
              <Text style={styles.radioLabel}>{level}</Text>
            </View>
          </TouchableOpacity>
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
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const initialAssessmentDetails = {
    mood: '',
    anxietyLevel: '',
    sleepQuality: '',
    energyLevel: '',
    stressLevel: '',
    socialConnection: '',
    copingMechanisms: [],
    personalThoughts: [],
  };

  const [assessmentDetails, setAssessmentDetails] = useState(initialAssessmentDetails);

  
  const addMessage = () => {
    try {
      if (!mood || !anxietyLevel || !sleepQuality || !energyLevel || !stressLevel) {
        Alert.alert('Error', 'Please select all mood assessment levels.');
        return;
      }
      const userMessageStr = message.trim() ? `User's Message: ${message.trim()}\n` : '';
  
      const combinedMessage = `
        ${userMessageStr}
        Mood: ${mood}
        Anxiety Level: ${anxietyLevel}
        Sleep Quality: ${sleepQuality}
        Energy Level: ${energyLevel}
        Stress Level: ${stressLevel}
        Social Connections: ${socialConnection || 'Not selected'}
        Coping Mechanisms: ${Array.isArray(copingMechanisms) ? copingMechanisms.join(', ') : 'Not selected'}
        Personal Thoughts: ${Array.isArray(personalThoughts) ? personalThoughts.join(', ') : 'Not selected'}
      `.trim();
  
      const updatedConversation = [...conversation, { speaker: 'user', message: combinedMessage }];
      setConversation(updatedConversation);
  
      processUserMessage(combinedMessage);
  
      setMessage('');
      setMood('');
      setAnxietyLevel('');
      setSleepQuality('');
      setEnergyLevel('');
      setStressLevel('');
      setSocialConnection('');
      setCopingMechanisms([]);
      setPersonalThoughts([]);
  
    } catch (error) {
      console.error('There was a problem processing the message:', error.message);
    }
  };
  
  const handleLevelSelect = (level, setFunction) => {
    setFunction(level);
  };

  const processUserMessage = async (userMessage) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = await response.text();

      let aiResponse = text;
      if (mood === 'Very Sad' || anxietyLevel === 'Very High' || stressLevel === 'Very High') {
        aiResponse += '\n\nIt seems you are feeling particularly low. Consider reaching out to a mental health professional for support.';
      } else if (mood === 'Happy' && energyLevel === 'High') {
        aiResponse += '\n\nGreat to hear that you are feeling happy and energetic! Keep up the good vibes.';
      } else if (sleepQuality === 'Poor' && stressLevel === 'High') {
        aiResponse += '\n\nPoor sleep quality combined with high stress can be tough. Consider trying relaxation techniques before bed.';
      }

      const updatedConversation = [...conversation, { speaker: 'AI', message: aiResponse }];
      setConversation(updatedConversation);
    } catch (error) {
      console.error('Error generating response:', error);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mental Health Screening</Text>

      <Text style={styles.sectionTitle}>Mood Assessment</Text>
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

      <Text style={styles.sectionTitle}>Tell me what you're feeling</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.microphoneButton} onPress={startSpeechToText}>
          <Image source={microphoneIcon} style={styles.microphoneIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type your message here..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={addMessage}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Conversation</Text>
      <Conversation conversation={conversation} />
    </ScrollView>
  );
};

const Conversation = ({ conversation }) => (
  <View style={styles.conversationContainer}>
    {conversation.map((item, index) => (
      <View key={index} style={styles.messageContainer}>
        <Text style={item.speaker === 'AI' ? styles.aiMessage : styles.userMessage}>
          {item.message}
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  conversationContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
  },
  messageContainer: {
    marginBottom: 10,
  },
  userMessage: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignSelf: 'flex-start',
    maxWidth: '80%', // Limit the message width
  },
  aiMessage: {
    padding: 10,
    backgroundColor: '#cfe8fc',
    borderRadius: 5,
    alignSelf: 'flex-end',
    maxWidth: '90%', // Limit the message width
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    marginHorizontal: 20,
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
  submitButton: {
    backgroundColor: '#3085C3',
    padding: 10,
    borderRadius: 2,
    alignItems: 'center',
    marginTop: 40,
    width: '60%',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    flex: 1,
    marginBottom: 1,
    borderWidth: 0.4,
    borderColor: '#000',
    borderRadius: 2,
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor:'#F0F3FF'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  microphoneButton: {
    backgroundColor: '#f0f0f0',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3085C3',
    marginRight: 8,
  },
  microphoneIcon: {
    width: 30,
    height: 30,
  },
});

export default MentalHealthScreen;
