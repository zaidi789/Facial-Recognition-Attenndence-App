import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TextField = props => {
  const {
    label,
    style,
    onBlur,
    onFocus,
    placeholder,
    errorText,
    isPassword,

    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const borderColor = errorText ? '#B00020' : isFocused ? 'green' : 'blue';
  const labelColor = errorText ? '#B00020' : isFocused ? 'green' : 'blue';

  const leftIconName = isPassword ? 'lock-closed-outline' : 'mail-outline';
  const rightIconName = isPassword
    ? isVisible
      ? 'eye-off-outline'
      : 'eye-outline'
    : '';

  return (
    <View style={style}>
      <View style={[styles.inputContainer, {borderColor}]}>
        {/* {leftIconName ? (
          <View
            style={{
              borderRadius: 10,
              borderWidth: 1,
              height: 50,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: errorText
                ? '#B00020'
                : isFocused
                ? 'blue'
                : '#B9C4CA',
            }}>
            <Icon
              name={leftIconName}
              size={20}
              color={labelColor}
              style={styles.leftIcon}
            />
          </View>
        ) : null} */}
        {leftIconName ? (
          <Icon
            name={leftIconName}
            size={20}
            color={labelColor}
            style={styles.leftIcon}
          />
        ) : null}
        <TextInput
          style={styles.input}
          {...restOfProps}
          placeholder={isFocused ? placeholder : ''}
          secureTextEntry={isVisible}
          onBlur={event => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={event => {
            setIsFocused(true);
            onFocus?.(event);
          }}
        />
        {rightIconName ? (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(!isVisible);
            }}
            style={styles.rightIconContainer}>
            <Icon name={rightIconName} size={20} color={labelColor} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={[
          styles.labelContainer,
          {top: isFocused ? -8.5 : 15, left: isFocused ? 30 : 25},
        ]}>
        <Text
          style={[
            styles.label,
            {color: labelColor, fontSize: isFocused ? 12 : 16},
          ]}>
          {label}
        </Text>
      </View>
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    left: 16,
    top: -9,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  label: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 0,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    fontFamily: 'Avenir-Medium',
    fontSize: 16,
  },
  leftIcon: {
    marginRight: 2,
    left: 5,
  },
  rightIconContainer: {
    padding: 8,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    left: 50,
    fontSize: 12,
    color: '#B00020',
    fontFamily: 'Avenir-Medium',
  },
});

export default TextField;
