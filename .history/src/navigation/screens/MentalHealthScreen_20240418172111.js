import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image ,TextInput} from 'react-native';
import Voice from '@react-native-community/voice';
import { GoogleGenerativeAI } from "@google/generative-ai";
import microphoneIcon from '../assets/icons8-mic-30.png';
impoer 



const genAI = new GoogleGenerativeAI(require('react-native-dotenv').API_KEY);

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
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]); // Add conversation state
 

  const addMessage = () => {
    if (message.trim() !== '') {
      const updatedConversation = [...conversation, { speaker: 'user', message }];
      setConversation(updatedConversation);
      processUserMessage(message);
      setMessage('');
    }
  };
  
  

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
  const handleLevelSelect = (level, setFunction) => {
    setFunction(level);
  };
  const processUserMessage = async (message) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Replace "MODEL_NAME" with the actual model name
      const result = await model.generateContent({ prompt: message, maxTokens: 50 });
  
      const aiResponse = result.text;
  
      // Handle the AI's response, e.g., update the state or display the response to the user
      console.log(`AI's response: ${aiResponse}`);
    } catch (error) {
      console.error('There was a problem with the API request:', error.message);
      // Handle error, e.g., display an error message to the user
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mental Health Screening</Text>

      {/* Mood Assessment */}
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
 <Text style={styles.sectionTitle}>Tell me what you're feeling </Text>
      <View style={styles.inputContainer}>
      <TouchableOpacity style={styles.microphoneButton} onPress={startSpeechToText}>
                    <Image source={require('../assets/icons8-mic-30.png')} style={styles.microphoneIcon} />
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
      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}   onPress={addMessage}>
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
    borderRadius: 3,
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
