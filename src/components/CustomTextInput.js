import React, {useState, useRef, useEffect} from 'react';
import {TextInput} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CustomTextInput({
  label,
  style,
  onBlur,
  onFocus,
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  labelStyle,
}) {
  const [isFocused, setIsFocused] = useState('');
  // const [bodyWidth, setBodyWidth] = useState();
  // useEffect(() => {}, [onChangeText]);
  return (
    <View style={style}>
      <TextInput
        style={styles.input}
        onBlur={event => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onFocus={event => {
          setIsFocused(true);
          onFocus?.(event);
        }}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />

      <View
        style={[
          styles.labelContainer,
          {
            top: isFocused ? -1.5 : 24,
            backgroundColor: isFocused ? 'rgb(201,201,201)' : 'transparent',
            left: isFocused ? 15 : 15,
          },
        ]}>
        <Text
          style={[
            styles.label,
            {
              fontSize: isFocused ? 16 : 20,
              paddingLeft: isFocused ? 3 : 0,
              paddingRight: isFocused ? 3 : 0,
              // color: labelColor,

              // padding: 2,
              // color: isFocused ? 'black' : 'black',
              color: isFocused ? 'black' : 'transparent',
            },
          ]}>
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  input: {
    padding: 15,
    fontFamily: 'Avenir-Medium',
    fontSize: 14,
    color: 'black',
    width: 280,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  labelContainer: {
    position: 'absolute',
    left: 10,
    top: 0,
    paddingHorizontal: 0,
    // backgroundColor: '#90e0ef',
  },
  label: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 20,
    color: 'white',
    // backgroundColor: 'transparent',
  },
});
