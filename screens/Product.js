import React, {useState} from 'react';
import {Component} from 'react';
import { Animated, AsyncStorage, Easing, Image, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { colors, icons, fontMappings, sizes } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';


class Product extends Component {
  constructor (props) {
    super(props);
    this.state = {
      productData: {},
      useProductData: false,
      colors: ['#3393E4', '#715886'],
      isEatabel: true,
      violations: [],
    };
    this.restrictedMappings = {
      Beef: ['beef', 'gelatin'],
      Pork: ['pork', 'lard', 'gelatin'],
      ' ': []
    };
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
    this.getPrefs();
    AsyncStorage.setItem('currentUPC', '044300106376');
    AsyncStorage.getItem('currentUPC')
      .then((data) => {
        return axios.get(`http://192.168.1.19:3000/searchUPC/${data}`);
      })
      .then((response) => {
        this.setState({useProduct: true, productData: response.data});
        this.isEatabel(response.data.hints[0].food.foodContentsLabel.toLowerCase().split(' '));
      }
      )
      .catch((response) => console.log('Error Fetching API Data'));
  }

  isEatabel(ingredients) {
    var restrictedIngredients = this.state.restrictions;
    var violations = [];
    var isEatabel = true;
    var cleanedIngredients = ingredients.map((ingredient) => ingredient.replace(';', ''));
    for (var i = 0; i < restrictedIngredients.length; i++) {
      if (cleanedIngredients.includes(restrictedIngredients[i])) {
        isEatabel = false;
        violations.push(restrictedIngredients[i]);
      }
    }
    if (!isEatabel) {
      this.setState({colors: ['#ed5374', '#c21b1b']});
    }
    this.setState({violations, isEatabel});
  }

  getPrefs() {
    AsyncStorage.getItem('prefString')
      .then((data) => {
        const restrictions = data.split(' ');
        return restrictions;
      })
      .then((restrictions) => {
        restrictions.pop();
        var allRestrictedIngredients = [];
        for (var i = 0; i < restrictions.length; i++) {
          var restrictedIngredients = this.restrictedMappings[restrictions[i]];
          for (var j = 0; j < restrictedIngredients.length; j++) {
            if (!allRestrictedIngredients.includes(restrictedIngredients[j])) {
              allRestrictedIngredients.push(restrictedIngredients[j]);
            }
          }
        }
        this.setState({restrictions: allRestrictedIngredients});
      })
      .catch(() => console.log('Error Filtering Ingredients'));
  }

  renderedProduct () {
    let product = this.state.productData;
    const ingredients = product.hints[0].food.foodContentsLabel;
    return (
      <View style={styles.container}>
        <Image style={{width: 100, height: 100}} source={{uri: product.hints[0].food.image}}></Image>
        <Text style={styles.title}>{product.hints[0].food.brand}</Text>
        <Text style={styles.subtitle}>{product.hints[0].food.label}</Text>
        {this.state.isEatabel ? <Text style={styles.eatabel}>This Item is Eatabel!</Text> :
          <View>
            <Text style={styles.eatabel}>This item is NOT Eatabel</Text>
            <Text style={styles.reasoning}>due to the presence of {this.state.violations.map((violation) => violation)}</Text>
          </View>
        }
      </View>

    );
  }
  render () {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const loadingScreen = <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Image
        style={{height: 50, width: 50, transform: [{rotate: spin}] }}
        source={icons.loading} />
    </View>;
    return (
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={this.state.colors}
        style={{
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}>
        <View style={styles.container}>
          {this.state.useProduct ? this.renderedProduct() : loadingScreen}
        </View>
      </LinearGradient>

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