import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  LogBox,
  TouchableOpacity,
  NativeEventEmitter,
  TextInput,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import FaceSDK, {
  Enum,
  RNFaceApi,
  FaceCaptureResponse,
  LivenessResponse,
  MatchFacesImage,
} from '@regulaforensics/react-native-face-api';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import RNFS from 'react-native-fs';

LogBox.ignoreLogs(['new NativeEventEmitter']);
// const eventManager = new NativeEventEmitter(RNFaceApi);

var image1 = new MatchFacesImage();

const Register = () => {
  const [img1, setImg1] = useState(require('../Images/ChrissEvans.jpg'));
  const [rollNo, setRollNo] = useState('');
  const [obj, setObj] = useState([{code: '', image_url: ''}]);
  const [cropImg, setCropImg] = useState(require('../Images/ChrissEvans.jpg'));
  const [tempUri, setTempUri] = useState(null);
  const [base64Image, setBase64Image] = useState('');
  const [testImage, setTestImage] = useState('');

  useEffect(() => {
    const videoEncoderCompletionEvent = json => {
      const response = JSON.parse(json);
    };

    FaceSDK.init(
      json => {
        const response = JSON.parse(json);
        if (!response['success']) {
          console.log('Init failed: ');
          console.log(json);
        }
      },
      e => {},
    );
  }, []);

  const OpenCamera = () => {
    const config = {
      cameraPositionIOS: 0,
      cameraId: 1,
      cameraSwitchEnabled: true,
      isCloseButtonEnabled: true,
    };
    Alert.alert(
      'Aler',
      'Are you sure to open',
      [
        {
          text: 'Yes Open Camera',

          onPress: () =>
            FaceSDK.presentFaceCaptureActivityWithConfig(
              config,
              result => {
                const response = FaceCaptureResponse.fromJson(
                  JSON.parse(result),
                );
                setImage(response.image.bitmap);

                saveToGallery(response.image.bitmap);
              },
              e => {
                console.log(e);
              },
            ),
        },
      ],
      {cancelable: true},
    );
  };

  const setImage = base64 => {
    if (base64 == null) return;
    try {
      image1.bitmap = base64;
      setImg1({uri: 'data:image/png;base64,' + base64});
      obj[0].image_url = 'data:image/jpeg;base64,' + image1.bitmap;
      obj[0].code = rollNo;
    } catch (error) {
      console.log(error);
    }
  };

  const saveToGallery = async base64 => {
    if (base64) {
      try {
        const filePath = `${
          RNFS.ExternalDirectoryPath
        }/FaceAttendanceApp_${Date.now()}.png`;

        await RNFS.writeFile(filePath, base64, 'base64');
        saveImageToGallery(filePath);

        Alert.alert('Success', 'Image saved to gallery.');
      } catch (error) {
        console.log('Error saving image to gallery:', error);
        Alert.alert('Error', 'Failed to save image to gallery.');
      }
    }
  };

  const saveImageToGallery = async filePath => {
    try {
      if (Platform.OS === 'android') {
        await RNFS.scanFile(filePath);
        console.log('sucessfully saved image');
      } else {
        await RNFS.copyAssetsFileIOS(
          filePath,
          RNFS.LibraryDirectoryPath + filePath,
        );
      }
    } catch (error) {
      console.log('Error saving image to gallery:', error);
    }
  };

  const handelSubmit = () => {
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': ['81992924'],
      // Authorization: 'JWT fefege...',
      'Access-Control-Allow-Origin': '*',
    };
    axios
      .post('http://192.168.1.44:5000/store', obj, {
        headers: headers,
      })
      .then(function (response) {
        console.log('sent sucessfully', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <LinearGradient colors={['#e9b7ce', '#32c4c0', '#d3f3f1']}>
      <View style={styles.container}>
        <View>
          <View>
            {tempUri && (
              <Image source={{uri: `file://${tempUri}`}} style={styles.image} />
            )}
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginBottom: 0,
          }}>
          <Text
            style={{
              fontSize: 35,
              marginTop: 20,
              marginBottom: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Register
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginTop: 0,
              marginBottom: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Complete below sections
          </Text>
        </View>

        <View style={{}}>
          <View
            style={{
              justifyContent: 'flex-start',
              padding: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                marginBottom: 10,
                marginRight: 20,
              }}>
              Please Enter your Roll No:
            </Text>
            <TextInput
              placeholder="Enter Your Roll no"
              placeholderTextColor={'#ffffff'}
              onChangeText={setRollNo}
              keyboardType="numeric"
              value={rollNo}
              color={'white'}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: '90%',
                padding: 10,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 30,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Click below to capture
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (rollNo !== '') {
                    OpenCamera(true);
                  } else {
                    Alert.alert('Warning', 'Please enter roll no');
                  }
                }}>
                <Image
                  style={{
                    height: 250,
                    width: 250,
                    resizeMode: 'center',
                  }}
                  source={img1}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 20,
                padding: 5,
                backgroundColor: '#48cae4',
                width: 150,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                handelSubmit();
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#ffafcc',
    // marginBottom: 12,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  resultsScreenBackButton: {
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
  image: {
    height: 50,
    width: 50,
  },
});

export default Register;