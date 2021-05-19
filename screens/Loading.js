import React, {useState} from 'react';
import {Component} from 'react';
import { Animated, AsyncStorage, Easing, Image, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { colors, icons, fontMappings, restrictedMappings, sizes } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';

class Product extends Component {
  constructor (props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  runAnimation() {
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => {
      this.runAnimation();
    }
    );
  }

  componentDidMount() {
    this.runAnimation();
  }

  render () {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.Image
          style={{height: 50, width: 50, transform: [{rotate: spin}] }}
          source={icons.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'BrandonRegular',
    color: 'white',
    fontSize: 30,
  },
  subtitle: {
    fontFamily: 'BrandonRegular',
    color: 'white',
    fontSize: 20,
  },
  eatabel: {
    marginTop: 20,
    fontFamily: 'BrandonRegular',
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  reasoning: {
    fontFamily: 'BrandonRegular',
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },

});

export default Product;