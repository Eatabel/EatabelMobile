import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { colors, icons, fontMappings } from '../constants';

const Landing = ({ navigation }) => {
  let [fontsLoaded] = useFonts(fontMappings);
  if (!fontsLoaded) {
    return (
      <View><Text>Loading</Text></View>
    );
  }
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
          style={styles.button}
          onPress={() => navigation.navigate('Setup')}
          underlayColor='#fff'>
          <Text style={styles.startText}>Get Started</Text>
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
  button: {
    marginTop: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  startText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'BrandonRegular',
  }

});

export default Landing;