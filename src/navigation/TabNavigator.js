import React from "react";
import { useTheme } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Image, StyleSheet } from "react-native";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { MainStackNavigator } from "./StackNavigator";

const BottomTabNavigator = () => {
  const { colors } = useTheme();

  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
    activeColor={'#4E6C50'}
    inactiveColor={'#561C24'}
    barStyle={{ backgroundColor: '#F5E8E4' }} // Use background color from theme
    initialRouteName='HomeScreen'
    tabBarOptions={{
      labelStyle: styles.tabBarLabelStyle,
    }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={MainStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("./assets/icons8-home-32.png")}
              style={[styles.tabBarIcon, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("./assets/icons8-settings-50.png")}
              style={[styles.tabBarIcon, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Image
              source={require("./assets/icons8-user-48.png")}
              style={[styles.tabBarIcon, { tintColor: color }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  tabBarIcon: {
    width: 26,
    height: 26,
  },
});

export { BottomTabNavigator };