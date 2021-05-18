import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, icons, fontMappings } from '../constants';
import { useFonts } from 'expo-font';

let searchTerm = '';

const handleChange = (event) => {
  searchTerm = event;
};

const Home = () => {
  let [fontsLoaded] = useFonts(fontMappings);
  const renderHeader = () => {
    return (
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchText} placeholder="Search"
          onChangeText={handleChange}
          onSubmitEditing={() => console.log(searchTerm)}
        ></TextInput>
        <Image
          source={icons.search}
          resizeMode="contain"
          style={{
            width: 15,
            height: 15,
            tintColor: colors.primary,
          }}
        />
      </View>
    );
  };
  if (!fontsLoaded) {
    return (
      <View><Text>Loading</Text></View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 30,
    width: '75%',
  },
  searchText: {
    fontSize: 15,
    color: colors.primary,
    fontFamily: 'BrandonBold',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    height: 30,
  },
});

export default Home;