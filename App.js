import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import { Home, Landing, Product, Results, Search, Settings, Setup } from './screens';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Landing'}
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Setup" component={Setup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
