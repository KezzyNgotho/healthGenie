import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { LoginStackNavigator } from './src/navigation/StackNavigator';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#561C24',
    },
    secondary: {
      main: '#561C24',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontWeightRegular: 'normal',
    fontWeightMedium: '500',
    fontWeightLight: '300',
    fontWeightThin: '100',
  },
});

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <PaperProvider theme={DefaultTheme}>
      <ThemeProvider theme={customTheme}>
        <NavigationContainer>
          {/* Define your navigation here */}
          <LoginStackNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </PaperProvider>
  );
};

export default App;