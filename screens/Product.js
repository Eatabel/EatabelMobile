import React, {useState} from 'react';
import {Component} from 'react';
import { Animated, AsyncStorage, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { colors, icons, fontMappings, restrictedMappings, sizes } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';


class Product extends Component {
  constructor (props) {
    super(props);
    this.state = {
      productData: {},
      useProductData: false,
      colors: ['#58e8b6', '#0ba341'],
      isEatabel: true,
      violations: [],
      eatabelText: 'We could not retrieve an ingredient list for this product, it may or may not be Eatabel.'
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
    AsyncStorage.getItem('foodLookup')
      .then((lookupType) => {
        if (lookupType === 'upc') {
          AsyncStorage.getItem('currentUPC')
            .then((data) => {
              return axios.get(`http://192.168.1.19:3000/searchUPC/${data}`);
            })
            .then((response) => {
              this.setState({useProduct: true, productData: response.data.hints[0]});
              if (response.data.hints[0].food.foodContentsLabel !== undefined) {
                this.isEatabel(response.data.hints[0].food.foodContentsLabel.toLowerCase().split(' '));
              } else {
                this.setState({colors: ['#ffdf69', '#bf9600']});
              }
            }
            )
        } else {
          AsyncStorage.getItem('foodItem')
            .then((stringFoodData) => {
              const foodData = JSON.parse(stringFoodData);
              this.setState({useProduct: true, productData: foodData});
              if (foodData.food.foodContentsLabel) {
                this.isEatabel(foodData.food.foodContentsLabel.toLowerCase().split(' '));
              } else {
                this.setState({colors: ['#ffdf69', '#bf9600']});
              }
            });
        }
      })
      .catch((response) => console.log('Error Fetching API Data'));
  }

  isEatabel(ingredients) {
    var restrictedIngredients = this.state.restrictions;
    var violations = [];
    var isEatabel = true;
    var cleanedIngredients = ingredients.map((ingredient) => ingredient.replace(';', '').replace(',', '').replace('.', ''));
    for (var i = 0; i < restrictedIngredients.length; i++) {
      if (cleanedIngredients.includes(restrictedIngredients[i])) {
        isEatabel = false;
        violations.push(restrictedIngredients[i]);
      }
    }
    if (!isEatabel) {
      this.setState({colors: ['#ed5374', '#c21b1b']});
    } else {
      this.setState({eatabelText: 'This Item is Eatabel!'});
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
          var restrictedIngredients = restrictedMappings[restrictions[i]];
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
    const ingredients = product.food.foodContentsLabel;
    return (
      <View style={styles.container}>
        <Image style={{width: 100, height: 100}} source={{uri: product.food.image}}></Image>
        <Text style={styles.title}>{product.food.label.split(',')[0]}</Text>
        <Text style={styles.subtitle}>{product.food.brand}</Text>
        {this.state.isEatabel ? <Text style={styles.eatabel}>{this.state.eatabelText}</Text> :
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
        <View>
          <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode="contain"
              style={{
                width: 20,
                height: 100,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
          <View style={styles.container}>
            {this.state.useProduct ? this.renderedProduct() : loadingScreen}
          </View>
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
    fontSize: 15,
  },
  eatabel: {
    marginTop: 20,
    fontFamily: 'BrandonRegular',
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  reasoning: {
    fontFamily: 'BrandonRegular',
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  backButton: {
    justifyContent: 'flex-start',
  }
});

export default Product;