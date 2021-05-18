import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { colors, icons, dietaryMappings, fontMappings, sizes } from '../constants';

const Setup = ({ navigation }) => {
  const [counterChicken, setCounterChicken] = useState(true);
  const [counterTurkey, setCounterTurkey] = useState(true);
  const [counterDuck, setCounterDuck] = useState(true);
  const [counterBeef, setCounterBeef] = useState(true);
  const [counterPork, setCounterPork] = useState(true);
  const [counterFish, setCounterFish] = useState(true);
  const [counterShellFish, setCounterShellFish] = useState(true);
  const [counterEggs, setCounterEggs] = useState(true);
  const [counterMilk, setCounterMilk] = useState(true);

  const food = {
    Chicken: [counterChicken, setCounterChicken],
    Turkey: [counterTurkey, setCounterTurkey],
    Duck: [counterDuck, setCounterDuck],
    Beef: [counterBeef, setCounterBeef],
    Pork: [counterPork, setCounterPork],
    Fish: [counterFish, setCounterFish],
    Shellfish: [counterShellFish, setCounterShellFish],
    Eggs: [counterEggs, setCounterEggs],
    Milk: [counterMilk, setCounterMilk]
  };

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
        <View style={styles.subheading}>
          <Text style={styles.heading}>Select All Dietary Restrictions</Text>
        </View>
        <View style={styles.category}>
          {dietaryMappings.map((category) => {
            return (
              <View>
                <Text style={styles.subheading}>{Object.keys(category)[0]}</Text>
                <View style={styles.row}>
                  {category[Object.keys(category)[0]].map((foodItem) => {
                    return (
                      <TouchableOpacity style={styles.foodComponent} onPress={() => {
                        food[Object.keys(foodItem)[0]][1](!food[Object.keys(foodItem)[0]][0]);
                      }}>
                        <Image
                          source={icons[foodItem[Object.keys(foodItem)[0]]]}
                          resizeMode="contain"
                          style={{
                            width: sizes.setupSize,
                            height: sizes.setupSize,
                            tintColor: food[Object.keys(foodItem)[0]][0] ? colors.primary : colors.additionalColor2,
                          }}
                        />
                        <Text style={styles.foodTitle}>{Object.keys(foodItem)[0]}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
          underlayColor='#fff'>
          <Text style={styles.startText}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  category: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  heading: {
    color: colors.additionalColor1,
    fontFamily: 'BrandonMedium',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 80,
  },
  subheading: {
    color: colors.additionalColor1,
    fontFamily: 'BrandonRegular',
    fontSize: 20,
    paddingBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
  },
  foodComponent: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  foodTitle: {
    fontFamily: 'BrandonRegular',
    color: colors.additionalColor1,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: 100,
    marginBottom: 40,
  },
  startText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'BrandonRegular',
  }

});

export default Setup;