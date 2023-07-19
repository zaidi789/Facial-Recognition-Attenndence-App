import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  LogBox,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import FaceSDK, {
  FaceCaptureResponse,
  MatchFacesImage,
} from '@regulaforensics/react-native-face-api';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import RNFS from 'react-native-fs';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-paper';

LogBox.ignoreLogs(['new NativeEventEmitter']);

var image1 = new MatchFacesImage();

const Register = () => {
  const [img1, setImg1] = useState(require('../Images/ChrissEvans.jpg'));
  const [rollNo, setRollNo] = useState('');
  const [objs, setObjs] = useState([
    {name: '', image_url: '', roll_no: '', section_id: ''},
  ]);

  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [data, setData] = useState([]);
  const [preview, setPreview] = useState(false);

  const countries = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
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
              setPreview(true);
              setImage(response.assets[0].base64);
              image1.bitmap = response.assets[0].base64;
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

                saveToGallery(response.image.bitmap);
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
  ///////////////////////////////////////////////////////
  const setImage = base64 => {
    if (base64 == null) return;
    try {
      image1.bitmap = base64;
      setImg1({uri: 'data:image/png;base64,' + base64});
      data.push({
        name: name,
        roll_no: rollNo,
        section_id: section,
        image: 'data:image/jpeg;base64,' + image1.bitmap,
      });
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

  const handelSubmit = async () => {
    // console.log(data);

    // return;
    if (data[0] !== '') {
      const headers = {
        'Content-Type': 'application/json',
        'Content-Length': ['81992924'],
        // Authorization: 'JWT fefege...',
        'Access-Control-Allow-Origin': '*',
      };
      await axios
        .post('http://192.168.1.44:5000/api/students', data, {
          headers: headers,
        })
        .then(function (response) {
          console.log('sent sucessfully');
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert('Some field are missing');
    }
  };
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
        <View
          style={{
            // flex: 1,
            // backgroundColor: 'yellow',
            // height: '29%',
            marginBottom: 20,
            justifyContent: 'center',
            padding: 5,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Select Section:
          </Text>
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              setSection(selectedItem);
            }}
            defaultButtonText={'Select Section'}
            butt
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Name:
          </Text>
          <TextInput
            placeholder="Enter Your Name"
            placeholderTextColor={'#8a817c'}
            onChangeText={setName}
            keyboardType="default"
            activeUnderlineColor="green"
            value={name}
            style={{
              borderBottomWidth: 1,
              width: '100%',
              alignSelf: 'center',
              height: 40,
              backgroundColor: 'white',
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Roll No:
          </Text>
          <TextInput
            placeholder="Enter Your Roll no"
            placeholderTextColor={'#8a817c'}
            onChangeText={setRollNo}
            keyboardType="numeric"
            value={rollNo}
            activeUnderlineColor="green"
            style={{
              borderBottomWidth: 1,
              width: '100%',
              alignSelf: 'center',
              height: 40,
              backgroundColor: 'white',
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (rollNo === '' || name === '' || section === '') {
              alert('please fill above fields');
            } else {
              pickImage(true);
            }
          }}>
          <View
            style={{
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
                  marginTop: 30,
                  marginBottom: 40,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (rollNo === '' || name === '' || section === '') {
                      alert('please fill above fields');
                    } else {
                      pickImage(true);
                    }
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
                  source={img1}
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
            onPress={() => {
              handelSubmit();
            }}>
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
    borderColor: '#6c757d',
    borderRadius: 5,
  },
  dropdown1BtnTxtStyle: {
    color: '#8a817c',
    textAlign: 'auto',
    fontSize: 16,
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

export default Register;
