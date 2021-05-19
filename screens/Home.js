import React, { Component } from 'react';
import axios from 'axios';
import { ScrollView, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, icons, fontMappings } from '../constants';
import { useFonts } from 'expo-font';

let searchTerm = '';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      showSearch: false,
      searchTerm: '',
    };
  }

  handleChange (event) {
    this.setState({searchTerm: event});
  }

  handleSearch () {
    searchTerm = this.state.searchTerm.replace(' ', '+');
    axios.get(`http://192.168.1.19:3000/search/${searchTerm}`)
      .then((response) => {
        this.setState({results: response.data, showSearch: true}
        );
      })
      .catch(() => console.log('Could not fetch data from API'));
  }

  renderSearchResults() {
    return (
      <ScrollView style={styles.searchResults}>
        {this.state.results.hints.map((food) => {
          return (
            <TouchableOpacity style={styles.searchResult} onPress={() => console.log('clicked')}>
              <View style={styles.productText}>
                <Text style={styles.title}>{food.food.label.replace(food.food.brand + ' ', '')}</Text>
                <Text style={styles.brand}>{food.food.brand}</Text>
              </View>
              <Image style={{width: 100, height: 100}} source={food.food.image ? {uri: food.food.image} : {uri: 'https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png'}}></Image>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchText} placeholder="Search"
              onChangeText={this.handleChange.bind(this)}
              onSubmitEditing={this.handleSearch.bind(this)}
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
        </View>
        <View>
          {this.state.showSearch ? this.renderSearchResults.bind(this)() : <Text />}
        </View>
      </SafeAreaView>
    );
  }
}

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
    flex: 1,
    height: 30,
  },
  center: {
    alignItems: 'center',
    marginBottom: 20,
  },
  searchResult: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 105,
    width: '100%',
    marginBottom: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  productText: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'BrandonMedium',
    fontSize: 14,
    width: 100,
    color: colors.primary,
    paddingBottom: 1,
    alignItems: 'flex-start',
  },
  brand: {
    fontFamily: 'BrandonRegular',
    fontSize: 10,
    width: 100,
    color: 'grey',
  }
});

export default Home;