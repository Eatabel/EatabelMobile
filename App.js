import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { Animated, AsyncStorage, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import { Home, Landing, Loading, Product, Results, Search, Settings, Setup } from './screens';
import * as Font from 'expo-font';
import {fontMappings} from './constants';
const Stack = createStackNavigator();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: 'Loading'
    };
  }
  componentDidMount() {
    Font.loadAsync(fontMappings);
    AsyncStorage.getItem('Setup')
      .then((data) => {
        const route = data === 'complete' ? 'Home' : 'Landing';
        this.setState({initialPage: route});
      });
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={this.state.initialPage}
        >
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Results" component={Results} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Setup" component={Setup} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
