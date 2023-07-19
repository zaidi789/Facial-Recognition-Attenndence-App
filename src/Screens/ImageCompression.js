import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  LogBox,
  TouchableOpacity,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  RootTagContext,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

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
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-paper';
import ImageResizer from 'react-native-image-resizer';
import ImageCropPicker from 'react-native-image-crop-picker';

LogBox.ignoreLogs(['new NativeEventEmitter']);
const eventManager = new NativeEventEmitter(RNFaceApi);

var image1 = new MatchFacesImage();

const ImageCompression = () => {
  const [img1, setImg1] = useState('');
  const [preview, setPreview] = useState(false);

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

  // s
  const pickImage = () => {
    const config = {
      cameraPositionIOS: 0,
      cameraId: 1,
      cameraSwitchEnabled: true,
      isCloseButtonEnabled: true,
    };

    Alert.alert(
      'Select option',
      'chose one of the following',
      [
        {
          text: 'Open Gallery',
          onPress: () =>
            launchImageLibrary({includeBase64: true}, response => {
              if (response.assets == undefined) return;
              // console.log(response);
              setPreview(true);
              setImage(response.assets[0].base64);
              image1.bitmap = response.assets[0].base64;
              // setImg1({
              //   uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
              // });
              // console.log(img1);
            }),
        },
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
                setPreview(true);

                // saveToGallery(response.image.bitmap);
              },
              e => {
                console.log(e);
              },
            ),
        },
        ,
      ],
      {cancelable: true},
    );
  };

  const setImage = async base64 => {
    try {
      const compressedImage = await ImageResizer.createResizedImage(
        `data:image/png;base64,${base64}`,
        512, // desired width
        512, // desired height
        'JPEG',
        80, // quality (0-100)
      );
      setImg1(compressedImage.uri);
      console.log('--Compressed Image--', compressedImage.size);
      const compressedBase64 = await convertToBase64(compressedImage.uri);
      console.log('--Compressed Image--', compressedBase64);
      // Use the compressed image base64 string as needed
    } catch (error) {
      console.log(error);
    }
  };

  const convertToBase64 = async uri => {
    try {
      const fileContent = await RNFS.readFile(uri, 'base64');
      return `data:image/jpeg;base64,${fileContent}`;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to convert to base64');
    }
  };

  ////////////////////////////////////////////////////////
  ////////////ERRRRRRROOOOOOOOOOOORRRRRRRR////////////
  //   const setImage = async base64 => {
  //     try {
  //       const compressedImage = await ImageResizer.createResizedImage(
  //         `data:image/png;base64,${base64}`,
  //         800, // desired width
  //         800, // desired height
  //         'JPEG',
  //         80, // quality (0-100)
  //       );

  //       const compressedBase64 = await convertToBase64(compressedImage.uri);
  //       console.log('--Compressed Image--', compressedBase64);
  //       // Use the compressed image base64 string as needed
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const convertToBase64 = uri => {
  //     return new Promise((resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.onload = function () {
  //         const base64 = xhr.responseText;
  //         resolve(base64);
  //       };
  //       xhr.onerror = function () {
  //         reject(new Error('Failed to convert to base64'));
  //       };
  //       xhr.open('GET', uri);
  //       xhr.responseType = 'text';
  //       xhr.send();
  //     });
  //   };
  /////////////////////////////////////////////////
  //   const setImage = async image => {
  //     try {
  //       const compressedImage = await ImageCropPicker.cleanSingle(image, {
  //         compressImageMaxWidth: 800, // desired width
  //         compressImageMaxHeight: 800, // desired height
  //         compressImageQuality: 0.8, // Adjust the quality as desired (0-1)
  //       });

  //       console.log('--Compressed Image--', compressedImage);
  //       // Access compressedImage.data for the base64 representation of the compressed image
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const setImage = async base64 => {
  //     if (base64 == null) return;
  //     try {
  //       const compressedImage = await ImageResizer.createResizedImage(
  //         `data:image/png;base64,${base64}`,
  //         800, // desired width
  //         800, // desired height
  //         'JPEG',
  //         80, // quality (0-100)
  //       );

  //       const compressedBase64 = await ImageResizer.createResizedImage(
  //         compressedImage.uri,
  //         compressedImage.width,
  //         compressedImage.height,
  //         'JPEG',
  //         80, // quality (0-100)
  //         0, // rotation
  //         undefined, // output path (optional)
  //         'base64', // output format
  //       );

  //       console.log('--Compressed Image--', compressedBase64);
  //       // Use the compressed image base64 string as needed (e.g., setImg1(compressedBase64))
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  /////////////////////////////////////////////////////////////////////////////
  //   const setImage = async base64 => {
  //     if (base64 == null) return;
  //     try {
  //       const compressedImage = await ImageResizer.createResizedImage(
  //         `data:image/png;base64,${base64}`,
  //         512, // desired width
  //         512, // desired height
  //         'JPEG',
  //         80,
  //          // quality (0-100)
  //       );
  //       setImg1(compressedImage.uri);

  //       console.log('--Compressed Image--', compressedImage);
  //       // Use the compressed image URI as needed (e.g., setImg1(compressedImage.uri))
  //     } catch (error) {
  //       console.log(error);
  //     }
  // try {
  //   image1.bitmap = base64;
  //   setImg1({uri: 'data:image/png;base64,' + base64});
  //   const result = await Image.compress(img1, {
  //     compressionMethod: 'auto',
  //   });
  //   console.log('--Compressed Image--', result);
  // } catch (error) {
  //   console.log(error);
  // }
  //   };

  //   const saveToGallery = async base64 => {
  //     if (base64) {
  //       try {
  //         const filePath = `${
  //           RNFS.ExternalDirectoryPath
  //         }/FaceAttendanceApp_${Date.now()}.png`;

  //         await RNFS.writeFile(filePath, base64, 'base64');
  //         saveImageToGallery(filePath);

  //         Alert.alert('Success', 'Image saved to gallery.');
  //       } catch (error) {
  //         console.log('Error saving image to gallery:', error);
  //         Alert.alert('Error', 'Failed to save image to gallery.');
  //       }
  //     }
  //   };

  //   const saveImageToGallery = async filePath => {
  //     try {
  //       if (Platform.OS === 'android') {
  //         await RNFS.scanFile(filePath);
  //         console.log('sucessfully saved image');
  //       } else {
  //         await RNFS.copyAssetsFileIOS(
  //           filePath,
  //           RNFS.LibraryDirectoryPath + filePath,
  //         );
  //       }
  //     } catch (error) {
  //       console.log('Error saving image to gallery:', error);
  //     }
  //   };

  return (
    <LinearGradient colors={['#ddb4f6', '#8dd0fc']}>
      <View style={styles.container}>
        <View
          style={{
            // flex: 1,
            // backgroundColor: 'green',
            // height: '19%',
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 45,
              marginTop: 20,
              marginBottom: 10,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Image Compression
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
        <TouchableOpacity
          onPress={() => {
            pickImage(true);
          }}>
          <View
            style={{
              // backgroundColor: 'green',
              // flex: 1,
              height: '50%',
              width: '100%',
              marginBottom: 10,
              borderWidth: 2,
              borderStyle: 'dashed',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {preview === false ? (
              <View
                style={{
                  // flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 0,
                  marginBottom: 40,
                  //   height: 250,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    pickImage(true);
                  }}>
                  <Ionicons
                    name="cloud-upload-outline"
                    size={75}
                    color="blue"
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  Click to Select / Capture
                </Text>
              </View>
            ) : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{
                    height: 200,
                    width: 200,
                    resizeMode: 'center',
                    // marginTop: 2,
                  }}
                  source={{uri: img1}}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <View
          style={{
            // backgroundColor: 'orange',
            height: '20%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              backgroundColor: '#48cae4',
              width: 250,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => {}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
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
  dropdown1BtnStyle: {
    // flex: 1,
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    // borderBottomColor: 'black',
    borderColor: '#6c757d',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // alignSelf: 'center',
    borderRadius: 5,
  },
  dropdown1BtnTxtStyle: {
    color: '#8a817c',
    textAlign: 'auto',
    // backgroundColor: 'green',
    fontSize: 16,
    // left: 15,
  },
  focus: {
    borderBottomColor: 'blue',
  },
  dropdown1DropdownStyle: {
    backgroundColor: 'green',
  },
  dropdown1RowStyle: {
    backgroundColor: '#c6f8ff',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {
    color: 'black',
    textAlign: 'center',
  },
});

export default ImageCompression;
