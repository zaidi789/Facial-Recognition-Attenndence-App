import React, {useState, useRef, useEffect} from 'react';
import {TextInput} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';

export default function CustomTextInput({
  label,
  style,
  onBlur,
  onFocus,
  placeholder,
  onChangeText,
  value,
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
      />
      <View
        style={[
          styles.labelContainer,
          {
            top: isFocused ? -6 : 24,
          },
        ]}>
        <Text
          style={[
            styles.label,
            {
              fontSize: isFocused ? 12 : 16,
              color: isFocused ? '#080F9C' : '#B9C4CA',
            },
          ]}>
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    padding: 15,
    fontFamily: 'Avenir-Medium',
    fontSize: 14,
    color: 'white',
    width: 220,
    borderWidth: 1,
  },
  labelContainer: {
    position: 'absolute',
    left: 10,
    top: -6,
    paddingHorizontal: 8,
    // backgroundColor: '#90e0ef',
  },
  label: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 12,
    backgroundColor: 'transparent',
  },
});
