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
      fonts: false,
      pageToNav: 'Landing',
      pageReady: false,
    };
  }
  componentDidMount() {
    Font.loadAsync(fontMappings)
      .then(() => {
        this.setState({fonts: true});
      });
    AsyncStorage.getItem('Setup')
      .then((data) => {
        const route = data === 'complete' ? 'Home' : 'Landing';
        this.setState({pageToNav: route});
        if (this.state.fonts) {
          this.setState({pageReady: true});
        }
      });
  }

  render() {
    if (!this.state.pageReady) {
      return (
        <Loading />
      );
    }
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={this.state.pageToNav}
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
