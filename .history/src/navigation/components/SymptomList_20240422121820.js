import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SymptomList = ({ symptoms, onSelectSymptom }) => {
  return (
    <View style={styles.container}>
      {symptoms.map((symptom, index) => (
        <TouchableOpacity
          key={index}
          style={styles.symptomItem}
          onPress={() => onSelectSymptom(symptom)}
        >
          <Text style={styles.symptomText}>{symptom}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  symptomItem: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 5,
  },
  symptomText: {
    fontSize: 16,
    color: '#555',
  },
});

export default SymptomList;
