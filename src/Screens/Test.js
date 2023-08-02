import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import MyTextInput from '../components/MyTextInput';
import TextField from '../components/MyTextInput';

export default function Test() {
  const [errorText, setErrorText] = useState('');
  const handelError = () => {
    setErrorText('please enter your email');
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1 / 2, justifyContent: 'center'}}>
        <TextField
          label={'Email'}
          placeholder={'user@mail.com'}
          errorText={errorText}
        />
      </View>
      <View style={{flex: 1 / 2, justifyContent: 'flex-start'}}>
        <TextField
          label={'Password'}
          placeholder={'min 8 char '}
          isPassword={true}
        />
        <TouchableOpacity
          style={{
            marginTop: 30,
            backgroundColor: 'blue',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            // width: 250,
            borderRadius: 10,
          }}
          onPress={() => {
            handelError();
          }}>
          <Text style={{fontSize: 18, color: 'white', fontWeight: '600'}}>
            Error Set
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    // backgroundColor: 'yellow',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
