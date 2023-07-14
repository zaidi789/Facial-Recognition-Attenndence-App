import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Nav from './src/navigation';

export default function App() {
  return <Nav />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
