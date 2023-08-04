import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
} from 'react-native';
import base64 from 'react-native-base64';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Register() {
  const navigation = useNavigation();
  const [base64String, setBase64String] = useState('');
  const [decodedArray, setDecodedArray] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const decodedString = base64.decode(base64String);
    const dataArray = decodedString.split(',');
    setDecodedArray(dataArray);
  }, [base64String]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleClearText = () => {
    setBase64String('');
  };

  // useEffect(() => {
  //   if (base64String) {
  //     try {
  //       // Decode the Base64 string and split it into an array
  //       const decodedString = decode(base64String);
  //       const dataArray = decodedString.split(',');
  //       setDecodedArray(dataArray);
  //       setIsButtonDisabled(false); // Enable the button after successful decoding
  //     } catch (error) {
  //       // Handle any errors that might occur during decoding
  //       setDecodedArray([]);
  //       setIsButtonDisabled(true); // Disable the button if decoding fails
  //     }
  //   } else {
  //     setDecodedArray([]);
  //     setIsButtonDisabled(true); // Disable the button when the TextInput is empty
  //   }
  // }, [base64String]);
  // console.log(sections);
  // const handelStart = () => {
  //   const string = base64.decode(inputString);
  //   const dataArray = string.split(',');
  //   setSections(dataArray);
  //   Alert.alert(dataArray);
  // };
  const handleDecode = () => {
    // console.log('here--------');
    try {
      // Decode the Base64 string
      // console.log('here--------');
      const decodedString = base64.decode(base64String);
      const dataArray = decodedString.split(',');
      setDecodedArray(dataArray);
      console.log('here--------', decodedArray);
      alert(decodedArray);
      return;
      // Check if the decoded string contains only comma-separated numbers
      const isValidFormat = dataArray => {
        return /^(\d+,)*\d+$/.test(dataArray.trim());
      };

      if (isValidFormat) {
        setDecodedArray(decodedString.trim());
        console.log('data is ', decodedArray);
        setIsButtonDisabled(false); // Enable the button after decoding is successful
      } else {
        setDecodedArray([]);
        setIsButtonDisabled(true); // Disable the button if the string is not in the correct format
        Alert.alert(
          'Error',
          'Invalid string format. Please provide a comma-separated list of numbers.',
        );
      }
    } catch (error) {
      // Handle any other errors that might occur during decoding
      // setDecodedArray([]);
      // setIsButtonDisabled(true);
      // Alert.alert('Error', 'Invalid Base64 string');
    }
  };

  const handleInputChange = text => {
    setBase64String(text);
    setIsButtonDisabled(false); // Disable the button whenever the input changes
  };

  return (
    <View style={styles.linearGradient}>
      <View
        style={{
          height: 70,
          width: '100%',
          backgroundColor: 'rgb(235,235,235)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 35, color: 'black', fontWeight: 'bold'}}>
          Wellcome
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../Images/background-person.png')}
          style={{height: 300, width: 300}}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 30,
          paddingRight: 30,
          marginTop: 0,
        }}>
        <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
          <TextInput
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Enter text here"
            onChangeText={handleInputChange}
            value={base64String}
            // editable={false}
          />
          {base64String !== '' && (
            <TouchableOpacity
              onPress={handleClearText}
              style={styles.clearButton}>
              <Ionicons name="md-close" size={28} color="red" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            height: 50,
            width: 200,
            backgroundColor: !isButtonDisabled ? '#e63946' : '#ef340a',
          }}
          disabled={isButtonDisabled}
          onPress={() => {
            // handleDecode();
            navigation.navigate('DetailsShow');
          }}>
          <Text style={{color: 'white', fontSize: 22, fontWeight: '600'}}>
            Start
          </Text>
          <FontAwesome
            name="long-arrow-right"
            size={24}
            color="white"
            style={{left: 10, top: 1}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    height: '100%',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgb(235,235,235)',

    // borderRadius: 5,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    // paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    width: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  inputFocused: {
    borderColor: 'blue', // Change the border color when focused
  },
  input: {
    fontSize: 16,
    flex: 1,
  },
  clearButton: {
    padding: 1,
    borderWidth: 1,
    borderRadius: 50,
  },
});
