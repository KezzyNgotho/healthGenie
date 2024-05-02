import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native'; // Import Image from 'react-native'
//import { Icon } from 'react-native-elements'; // Remove the import for Icon
import { useNavigation } from '@react-navigation/native';
import    firebase from '../components'
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Main');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>HealthGenie</Text> 
      <View style={styles.content}>
        <Text style={styles.header}>Welcome Back!</Text>
        <Text style={styles.subHeader}>Login to continue</Text>
        <View style={styles.inputContainer}>
          <Image source={require('../assets/icons8-user-48.png')} style={styles.inputIcon} /> 
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
            style={styles.input}
            placeholderTextColor="black"
          />
        </View>
        <View style={styles.inputContainer}>
          <Image source={require('../assets/icons8-padlock-24.png')} style={styles.inputIcon} /> 
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="black"
          />
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Forgot Password?")} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Sign Up")} style={styles.signupText}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff', // White background
  },
  appName: {
    fontSize: 44,
    fontWeight: 'bold',
    color:'#3085C3' , // Adjust color as needed
    fontFamily: 'cursive', // Change font to caligraphed font
    marginBottom: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  subHeader: {
    fontSize: 16,
    color: '#3085C3',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 0.9,
    borderBottomColor: '#3085C3',
    width: '100%',
  },
  inputIcon: {
    marginRight: 10,
    width: 20, // Adjust width and height as needed
    height: 20,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#3085C3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 20, // Use margin instead of marginTop
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: 'black',
  },
  signupText: {
    marginTop: 10,
    color: '#3085C3',
  },
});

export default LoginScreen;