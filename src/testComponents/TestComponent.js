//in this component i have changed the camera for two pictures one for face one simple then sscanerio has changed

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
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';

LogBox.ignoreLogs(['new NativeEventEmitter']);
const eventManager = new NativeEventEmitter(RNFaceApi);

var image1 = new MatchFacesImage();

const Register = () => {
  const [img1, setImg1] = useState(require('../Images/ChrissEvans.jpg'));
  const [rollNo, setRollNo] = useState('');
  const [obj, setObj] = useState([{code: '', image_url: ''}]);
  const [cropImg, setCropImg] = useState(require('../Images/ChrissEvans.jpg'));
  const [tempUri, setTempUri] = useState(null);
  const [base64Image, setBase64Image] = useState('');
  const [testImage, setTestImage] = useState('');
  const [cropImage, setCropImage] = useState(
    require('../Images/ChrissEvans.jpg'),
  );
  const [imageUri, setImageUri] = useState({uri: ''});

  // const [image, setImage] = useState('');
  const [image, setImage] = useState(require('../Images/ChrissEvans.jpg'));

  useEffect(() => {
    const videoEncoderCompletionEvent = json => {
      const response = JSON.parse(json);
      const transactionId = response['transactionId'];
      const success = response['success'];
      // console.log('video_encoder_completion:');
      // console.log('    success: ' + success);
      // console.log('    transactionId: ' + transactionId);
    };
    // if (base64Image) {
    //   convertBase64ToURI(base64Image)
    //     .then(uri => {
    //       setTempUri(uri);
    //     })
    //     .catch(error => {
    //       console.log('Error converting base64 to URI:', error);
    //     });
    // }
    const base64String = 'Your base64 string here';

    // convertBase64ToURI(base64Image)
    //   .then(uri => {
    //     setTempUri(uri);
    //   })
    //   .catch(error => {
    //     console.log('Error converting base64 to URI:', error);
    //   });

    eventManager.addListener(
      'videoEncoderCompletionEvent',
      videoEncoderCompletionEvent,
    );

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
                setImage(
                  // FaceCaptureResponse.fromJson(JSON.parse(result))?.image
                  //   ?.imageData,
                  // Enum.ImageType.LIVE,
                  response.image.bitmap,
                );
                // setImage(response.image.bitmap);
                saveToGallery(response.image.bitmap);
                // setTestImage(response.image.bitmap);
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

  const setImageFAceApi = base64 => {
    if (base64 == null) return;
    try {
      image1.bitmap = base64;
      setImg1({uri: 'data:image/png;base64,' + base64});
      setTestImage({uri: 'data:image/png;base64,' + image1.bitmap});
      setBase64Image({uri: 'data:image/png;base64,' + base64});
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
  // const convertBase64ToURI = async base64String => {
  //   try {
  //     const tempFilePath = `${RNFS.TemporaryDirectoryPath}/tempImage.jpeg`;
  //     await RNFS.writeFile(tempFilePath, base64String, 'base64');
  //     setTempUri(tempFilePath);
  //     console.log('Path is', tempFilePath);
  //     return `file://${tempFilePath}`;
  //   } catch (error) {
  //     console.log('Error converting base64 to URI:', error);
  //     throw error;
  //   }
  // };

  const handelSubmit = () => {
    cropLast();
    console.log('wait');
    return;
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
        // handle success
        console.log('sent sucessfully', response);
        // alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        // alert(error.message);
      });
  };

  // const exampleImageUri = Image.resolveAssetSource(img1).uri;
  // const CropImage = () => {
  //   if (!tempUri) {
  //     return Alert.alert(
  //       'No image',
  //       'Before open cropping only, please select image',
  //     );
  //   } else {
  //   }

  //   ImagePicker.openCropper({
  //     uri: exampleImageUri,
  //     width: 200,
  //     height: 200,
  //   })
  //     .then(image => {
  //       console.log('received cropped image', image);
  //       // setImage({
  //       //   uri: image.path,
  //       //   width: image.width,
  //       //   height: image.height,
  //       //   mime: image.mime,
  //       // });
  //       // setImages(null);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       Alert.alert(e.message ? e.message : e);
  //     });
  // };

  const pickSingleWithCamera = () => {
    ImagePicker.openCamera({
      // cropping: true,
      width: 500,
      height: 500,
      includeExif: true,
      includeBase64: true,

      //
    }).then(image => {
      console.log('received image', image.data);
      // cropImage.uri = image.path;
      setCropImage({uri: 'data:image/jpg;base64,' + image.data});
      imageUri.uri = image.path;
      // setCropImage({
      //   uri: image.path,
      //   width: image.width,
      //   height: image.height,
      //   mime: image.mime,
      // });
      // setImages(null);
    });
    // .catch(e => alert(e));
  };
  const cropLast = () => {
    if (!image) {
      return Alert.alert(
        'No image',
        'Before open cropping only, please select image',
      );
    }

    ImagePicker.openCropper({
      path: imageUri.uri,
      width: 200,
      height: 200,
      cropperCircleOverlay: true,
    })
      .then(image => {
        console.log('received cropped image', image);
        CroppedImage;
        setImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
        setImages(null);
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };
  // console.log(JSON.stringify(img1));

  return (
    <LinearGradient colors={['#e9b7ce', '#32c4c0', '#d3f3f1']}>
      <View style={styles.container}>
        <View>
          <View></View>
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
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%',
              }}>
              {/* <Text
                style={{
                  fontSize: 16,
                  marginBottom: 30,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Click below to capture
              </Text> */}
              <TouchableOpacity
                onPress={() => {
                  if (rollNo !== '') {
                    pickSingleWithCamera(true);
                  } else {
                    Alert.alert('Warning', 'Please enter roll no');
                  }
                }}>
                <Image
                  style={{
                    height: 200,
                    width: 200,
                    resizeMode: 'center',
                  }}
                  source={cropImage}
                  resizeMode="center"
                />
              </TouchableOpacity>
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
                    height: 200,
                    width: 200,
                    resizeMode: 'center',
                  }}
                  source={cropImage}
                  resizeMode="center"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* {img1 && <Image source={img1} style={styles.image} />} */}
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
