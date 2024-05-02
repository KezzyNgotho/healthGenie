// SymptomList.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SymptomList = ({ symptoms, onSelectSymptom }) => {
    return (
        <View style={styles.container}>
            {symptoms.map(symptom => (
                <TouchableOpacity 
                    key={symptom}
                    style={styles.symptomItem}
                    onPress={() => onSelectSymptom(symptom)}
                >
                    <Text sty>{symptom}</Text>
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
        borderWidth: 0.6,
        borderColor: '#3085C3',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginBottom: 10,
    },
});

export default SymptomList;
