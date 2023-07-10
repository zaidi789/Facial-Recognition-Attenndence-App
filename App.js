import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainScreen from './src/components/MainScreen';
import FaceApiTest from './src/components/FaceApiTest';
import Main from './src/components/Main';

export default function App() {
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
