import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SymptomList = ({ symptoms, onSelectSymptom }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Symptoms:</Text>
      <View style={styles.symptomContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3085C3',
  },
  symptomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
