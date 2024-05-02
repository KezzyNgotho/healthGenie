import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
//import { createTheme, useTheme } from "@mui/material/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { BottomTabNavigator } from "./TabNavigator";
import LoginScreen from'./screens/LoginScreen'
import RegistrationScreen from "./screens/RegistrationScreen";
import HomeScreen from "./screens/HomeScreen";
import AssistantScreen from "./screens/AssistantScreen";
import MentalHealthScreen from "./screens/MentalHealthScreen";
import VirtualConsultationsScreen from "./screens/VirtualConsultationsScreen";
import ChatScreen from "./screens/ChatScreen";
import VideoCallScreen from "./screens/VideoCallScreens";
import SchedulerScreen from "./screens/SchedulerScreen";
import CommunitySupportScreen from "./screens/CommunitySupportScreen";
import PostDetailScreen from "./screens/PostDetailScreen";
const Stack = createNativeStackNavigator();

// Create a MUI theme (customize as needed)
const theme = createTheme({
  // Define your theme properties here
});

const MainStackNavigator = () => {
  return (
    <ThemeProvider theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"HomeScreen"}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Assistant" component={AssistantScreen} />
        <Stack.Screen name="MentalHealth" component={MentalHealthScreen} />
        <Stack.Screen name="VirtualConsultations" component={VirtualConsultationsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="VideoCall" component={VideoCallScreen} />
        <Stack.Screen name="Scheduler" component={SchedulerScreen} />
        <Stack.Screen name="CommunitySupport" component={CommunitySupportScreen} />
       
      </Stack.Navigator>
    </ThemeProvider>
  );
};

const LoginStackNavigator = () => {
  return (
    <ThemeProvider theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
    </ThemeProvider>
  );
};

export { MainStackNavigator, LoginStackNavigator };