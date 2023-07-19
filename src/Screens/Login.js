import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomTextInput from '../components/CustomTextInput';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Hello Again!</Text>
        <Text style={styles.subHeading}>Wellcome back you've</Text>
        <Text style={styles.subHeading}>been missed!</Text>
      </View>
      <View style={styles.inputsView}>
        <View
          style={{
            width: '100%',
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomTextInput label={'email'} />
        </View>
        <View style={{width: '100%'}}>
          <CustomTextInput label={'email'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(201,201,201)',
  },
  heading: {
    fontSize: 35,
    color: 'black',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 30,
    color: 'black',
    fontWeight: '300',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  inputsView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
  },
});
