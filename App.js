import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Landing } from './screens';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Landing"}
      >
        <Stack.Screen name="Landing" component={Landing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
