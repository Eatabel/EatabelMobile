import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/tabs';
import { Home, Landing, Product, Results, Search, Settings, Setup } from './screens';

const Stack = createStackNavigator();
class App extends Component {
  state = {
    initialPage: 'Landing'
  }
  componentDidMount() {
    AsyncStorage.getItem('Setup')
      .then((data) => {
        const route = data === 'complete' ? 'Home' : 'Landing';
        this.setState({initialPage: route})
      })
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
