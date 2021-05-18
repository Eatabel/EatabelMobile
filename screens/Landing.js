import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { colors, icons, fontMappings } from '../constants';

const Landing = () => {
  let [fontsLoaded] = useFonts(fontMappings);
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
        <TouchableOpacity
          style={styles.loginScreenButton}
          onPress={() => navigate('Home')}
          underlayColor='#fff'>
          <Text style={styles.loginText}>Get Started</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  Heading: {
    fontFamily: 'BrandonRegular',
    color: 'white',
    fontSize: 80,
  },
  SubHeading: {
    fontFamily: 'BrandonLight',
    color: 'white',
    fontSize: 30,
  },
  container: {
    flex: 1,
  },
  loginScreenButton: {
    marginTop: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
  }

});

export default Landing;