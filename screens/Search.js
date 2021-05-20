import React, { useState, useEffect } from 'react';
import { AsyncStorage, Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { colors, icons, fontMappings } from '../constants';

export default function Search ({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    AsyncStorage.setItem('currentUPC', data)
    .then(() => {
      AsyncStorage.setItem('foodLookup', 'upc')
    })
    .then(() => {
      navigation.navigate('Product')
    })
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Text style={styles.scanAgain} onPress={() => setScanned(false)}>Tap To Scan Again</Text>}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: 30,
  },
  scanAgain: {
    fontFamily: 'BrandonMedium',
    fontSize: 15,
    color: colors.primary,
  }
});
