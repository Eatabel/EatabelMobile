import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { AsyncStorage, Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { colors, icons, dietaryMappings, fontMappings, sizes } from '../constants';

const Settings = ({ navigation }) => {
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

  const storePreferences = () => {
    let prefString = '';
    for (var key in food) {
      if (!food[key][0]) {
        prefString += key;
        prefString += ' ';
      }
    }
    AsyncStorage.setItem('prefString', prefString);
    AsyncStorage.setItem('Setup', 'complete');
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
              <View key={Object.keys(category)[0]}>
                <Text style={styles.subheading}>{Object.keys(category)[0]}</Text>
                <View style={styles.row}>
                  {category[Object.keys(category)[0]].map((foodItem) => {
                    return (
                      <TouchableOpacity style={styles.foodComponent} key={foodItem[Object.keys(foodItem)[0]]}onPress={() => {
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
                        <Text style={food[Object.keys(foodItem)[0]][0] ? styles.foodTitle : styles.deselectedTitle}>{Object.keys(foodItem)[0]}</Text>
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
          onPress={() => {
            storePreferences();
          }}
          underlayColor='#fff'>
          <Text style={styles.startText}>Save</Text>
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
    fontSize: 25,
    textAlign: 'center',
    marginTop: 60,
  },
  subheading: {
    color: colors.additionalColor1,
    fontFamily: 'BrandonRegular',
    fontSize: 20,
    paddingBottom: 0,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
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
  deselectedTitle: {
    fontFamily: 'BrandonRegular',
    color: colors.additionalColor2,
  },
  button: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: 100,
    marginBottom: 30,
  },
  startText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'BrandonRegular',
  }

});

export default Settings;