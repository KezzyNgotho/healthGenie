import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import SymptomList from './SymptomList';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY, {
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
});
