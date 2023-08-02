// import React, {useState, useRef, useEffect} from 'react';
// import {TextInput} from 'react-native';
// import {StyleSheet, Text, View} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// export default function MyTextInput({
//   label,
//   style,
//   onBlur,
//   onFocus,
//   placeholder,
//   onChangeText,
//   value,
//   secureTextEntry,
//   labelStyle,
// }) {
//   const [isFocused, setIsFocused] = useState('');
//   // const [bodyWidth, setBodyWidth] = useState();
//   // useEffect(() => {}, [onChangeText]);
//   return (
//     <View style={style}>
//       <TextInput
//         style={styles.input}
//         onBlur={event => {
//           setIsFocused(false);
//           onBlur?.(event);
//         }}
//         onFocus={event => {
//           setIsFocused(true);
//           onFocus?.(event);
//         }}
//         secureTextEntry={secureTextEntry}
//         placeholder={placeholder}
//         onChangeText={onChangeText}
//       />

//       <View
//         style={[
//           styles.labelContainer,
//           {
//             top: isFocused ? -1.5 : 24,
//             backgroundColor: isFocused ? 'rgb(201,201,201)' : 'transparent',
//             left: isFocused ? 15 : 15,
//           },
//         ]}>
//         <Text
//           style={[
//             styles.label,
//             {
//               fontSize: isFocused ? 16 : 20,
//               paddingLeft: isFocused ? 3 : 0,
//               paddingRight: isFocused ? 3 : 0,
//               // color: labelColor,

//               // padding: 2,
//               // color: isFocused ? 'black' : 'black',
//               color: isFocused ? 'black' : 'transparent',
//             },
//           ]}>
//           {label}
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   // },
//   input: {
//     padding: 15,
//     fontFamily: 'Avenir-Medium',
//     fontSize: 14,
//     color: 'black',
//     width: 280,
//     borderWidth: 1,
//     marginTop: 10,
//     marginBottom: 20,
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//   },
//   labelContainer: {
//     position: 'absolute',
//     left: 10,
//     top: 0,
//     paddingHorizontal: 0,
//     // backgroundColor: '#90e0ef',
//   },
//   label: {
//     fontFamily: 'Avenir-Heavy',
//     fontSize: 20,
//     color: 'white',
//     // backgroundColor: 'transparent',
//   },
// });

// import React, {useState} from 'react';
// import {StyleSheet, TextInput, View, Text} from 'react-native';
// const TextField = props => {
//   /*
//    ** Spread operator helps to extract style prop and assign
//    ** any remaining props to the `restOfProps` variable.
//    ** It is pretty handy here as we need to support
//    ** all the props the native TextInput component has.
//    */
//   const {
//     label,
//     style,
//     onBlur,
//     onFocus,
//     placeholder,
//     errorText,
//     ...restOfProps
//   } = props;
//   const [isFocused, setIsFocused] = useState(false);
//   let color = isFocused ? '#080F9C' : '#B9C4CA';
//   if (errorText) {
//     color = '#B00020';
//   }
//   return (
//     <View style={style}>
//       <TextInput
//         style={[styles.input, {borderColor: isFocused ? 'blue' : '#B9C4CA'}]}
//         {...restOfProps}
//         placeholder={isFocused ? placeholder : ''}
//         onBlur={event => {
//           setIsFocused(false);
//           onBlur?.(event);
//         }}
//         onFocus={event => {
//           setIsFocused(true);
//           onFocus?.(event);
//         }}
//       />
//       <View
//         style={[
//           styles.labelContainer,
//           {
//             top: isFocused ? -8 : 28,
//           },
//         ]}>
//         <Text
//           style={[
//             styles.label,
//             {
//               fontSize: isFocused ? 12 : 16,
//               color: isFocused ? '#080F9C' : '#B9C4CA',
//             },
//           ]}>
//           {label}
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   labelContainer: {
//     position: 'absolute',
//     left: 16,
//     top: -9,
//     paddingHorizontal: 8,
//     backgroundColor: 'white',
//   },
//   label: {
//     fontFamily: 'Avenir-Heavy',
//     fontSize: 12,
//   },
//   input: {
//     padding: 24,
//     borderColor: '#B9C4CA',
//     borderWidth: 1,
//     borderRadius: 4,
//     fontFamily: 'Avenir-Medium',
//     fontSize: 16,
//   },
// });

// export default TextField;
//////////////////////////////////////////////////////////////////////////

// import React, {useState} from 'react';
// import {StyleSheet, TextInput, View, Text} from 'react-native';

// const TextField = props => {
//   const {
//     label,
//     style,
//     onBlur,
//     onFocus,
//     placeholder,
//     errorText,
//     ...restOfProps
//   } = props;
//   const [isFocused, setIsFocused] = useState(false);

//   const borderColor = errorText ? '#B00020' : isFocused ? 'blue' : '#B9C4CA';
//   const labelColor = errorText ? '#B00020' : isFocused ? '#080F9C' : '#B9C4CA';

//   return (
//     <View style={style}>
//       <TextInput
//         style={[styles.input, {borderColor}]}
//         {...restOfProps}
//         placeholder={isFocused ? placeholder : ''}
//         onBlur={event => {
//           setIsFocused(false);
//           onBlur?.(event);
//         }}
//         onFocus={event => {
//           setIsFocused(true);
//           onFocus?.(event);
//         }}
//       />
//       <View
//         style={[
//           styles.labelContainer,
//           {
//             top: isFocused || errorText ? -8 : 28,
//           },
//         ]}>
//         <Text
//           style={[
//             styles.label,
//             {
//               fontSize: isFocused || errorText ? 12 : 16,
//               color: labelColor,
//             },
//           ]}>
//           {label}
//         </Text>
//       </View>
//       {errorText && <Text style={styles.error}>{errorText}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   labelContainer: {
//     position: 'absolute',
//     left: 16,
//     top: -9,
//     paddingHorizontal: 8,
//     backgroundColor: 'white',
//   },
//   label: {
//     fontFamily: 'Avenir-Heavy',
//     fontSize: 12,
//   },
//   input: {
//     padding: 24,
//     borderWidth: 1,
//     borderRadius: 4,
//     fontFamily: 'Avenir-Medium',
//     fontSize: 16,
//   },
//   error: {
//     marginTop: 4,
//     marginLeft: 12,
//     fontSize: 12,
//     color: '#B00020',
//     fontFamily: 'Avenir-Medium',
//   },
// });

// export default TextField;

/////////////////////////////////////////////////////////////////////////////////////

// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   TextInput,
//   View,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const TextField = props => {
//   const {
//     label,
//     style,
//     onBlur,
//     onFocus,
//     placeholder,
//     errorText,
//     isPassword,
//     ...restOfProps
//   } = props;
//   const [isFocused, setIsFocused] = useState(false);

//   const borderColor = errorText ? '#B00020' : isFocused ? 'blue' : '#B9C4CA';
//   const labelColor = errorText ? '#B00020' : isFocused ? '#080F9C' : '#B9C4CA';

//   const leftIconName = isPassword ? 'lock-closed-outline' : 'mail-outline';
//   const rightIconName = isPassword
//     ? isFocused
//       ? 'eye-off-outline'
//       : 'eye-outline'
//     : '';

//   return (
//     <View style={[styles.container, style]}>
//       {leftIconName ? (
//         <Icon
//           name={leftIconName}
//           size={20}
//           color={labelColor}
//           style={styles.leftIcon}
//         />
//       ) : null}
//       <TextInput
//         style={[styles.input, {borderColor}]}
//         {...restOfProps}
//         placeholder={isFocused ? placeholder : ''}
//         secureTextEntry={isPassword && !isFocused}
//         onBlur={event => {
//           setIsFocused(false);
//           onBlur?.(event);
//         }}
//         onFocus={event => {
//           setIsFocused(true);
//           onFocus?.(event);
//         }}
//       />
//       {rightIconName ? (
//         <TouchableOpacity
//           onPress={() => {
//             setIsFocused(prev => !prev);
//           }}
//           style={styles.rightIconContainer}>
//           <Icon name={rightIconName} size={20} color={labelColor} />
//         </TouchableOpacity>
//       ) : null}
//       <View style={styles.labelContainer}>
//         <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
//       </View>
//       {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#B9C4CA',
//     borderWidth: 1,
//     borderRadius: 4,
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     fontFamily: 'Avenir-Medium',
//     fontSize: 16,
//     color: 'black',
//   },
//   leftIcon: {
//     marginHorizontal: 8,
//   },
//   rightIconContainer: {
//     padding: 8,
//   },
//   labelContainer: {
//     position: 'absolute',
//     left: 16,
//     top: -8,
//     paddingHorizontal: 8,
//     backgroundColor: 'white',
//   },
//   label: {
//     fontFamily: 'Avenir-Heavy',
//     fontSize: 12,
//   },
//   error: {
//     marginTop: 4,
//     marginLeft: 12,
//     fontSize: 12,
//     color: '#B00020',
//     fontFamily: 'Avenir-Medium',
//   },
// });

// export default TextField;

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

  const borderColor = errorText ? '#B00020' : isFocused ? 'blue' : '#B9C4CA';
  const labelColor = errorText ? '#B00020' : isFocused ? '#080F9C' : '#B9C4CA';

  const leftIconName = isPassword ? 'lock-closed-outline' : 'mail-outline';
  const rightIconName = isPassword
    ? isVisible
      ? 'eye-off-outline'
      : 'eye-outline'
    : '';

  return (
    <View style={style}>
      <View style={[styles.inputContainer, {borderColor}]}>
        {leftIconName ? (
          <View
            style={{
              borderRadius: 50,
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
          {top: isFocused ? -8.5 : 15, left: isFocused ? 53 : 55},
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
    borderRadius: 50,
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
    // left: 5,
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
