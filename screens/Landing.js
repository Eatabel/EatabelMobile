import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Icon } from 'react-native-elements';

const Landing = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={['#3393E4', '#715886']}
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}>
        <Text style={styles.Heading}>Eatabel</Text>
        <Text style={styles.SubHeading}>A Nutritional App</Text>
        <Icon color='#fff' name='search' onPress={() => console.log('hello')} size="30"/>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  Heading: {
    fontFamily: 'IkarosBold',
    color: 'white',
    fontSize: 80,
  },
  SubHeading: {
    fontFamily: 'IkarosLight',
    color: 'white',
    fontSize: 30,
  },
  container: {
    flex: 1,
  },
});

export default Landing;