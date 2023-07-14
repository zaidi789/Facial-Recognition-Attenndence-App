import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  TouchableHighlight,
  Alert,
  LogBox,
  NativeEventEmitter,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import FaceSDK, {
  Enum,
  FaceCaptureResponse,
  LivenessResponse,
  MatchFacesResponse,
  MatchFacesRequest,
  MatchFacesImage,
  MatchFacesSimilarityThresholdSplit,
  RNFaceApi,
} from '@regulaforensics/react-native-face-api';
import LinearGradient from 'react-native-linear-gradient';

LogBox.ignoreLogs(['new NativeEventEmitter']);
const eventManager = new NativeEventEmitter(RNFaceApi);

var image1 = new MatchFacesImage();
var image2 = new MatchFacesImage();

const Attandance = () => {
  const [img1, setImg1] = useState(require('../Images/ChrissEvans.jpg'));
  const [img2, setImg2] = useState(require('../Images/Chriss.jpg'));
  const [similarity, setSimilarity] = useState('nil');
  const [livenessStatus, setLivenessStatus] = useState('nil');

  useEffect(() => {
    const videoEncoderCompletionEvent = json => {
      const response = JSON.parse(json);
      const transactionId = response['transactionId'];
      const success = response['success'];
      console.log('video_encoder_completion:');
      console.log('    success: ' + success);
      console.log('    transactionId: ' + transactionId);
    };

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
    Alert.alert(
      'Aler',
      'Are you sure to open',
      [
        {
          text: 'Yes Open Camera',
          onPress: () =>
            FaceSDK.presentFaceCaptureActivity(
              result => {
                setImage(
                  FaceCaptureResponse.fromJson(JSON.parse(result))?.image
                    ?.bitmap,
                  Enum.ImageType.LIVE,
                );
              },
              e => {},
            ),
        },
      ],
      {cancelable: true},
    );
  };

  const setImage = (first, base64, type) => {
    if (base64 == null) return;
    if (first) {
      image1.bitmap = base64;
      image1.imageType = type;
      setImg1({uri: 'data:image/png;base64,' + base64});
    }
  };

  // const performLiveness = () => {
  //   FaceSDK.startLiveness(
  //     result => {
  //       result = LivenessResponse.fromJson(JSON.parse(result));
  //       setImage(true, result.bitmap, Enum.ImageType.LIVE);
  //       if (result.bitmap != null)
  //         setLivenessStatus(
  //           result['liveness'] == Enum.LivenessStatus.PASSED
  //             ? 'passed'
  //             : 'unknown',
  //         );
  //     },
  //     e => {},
  //   );
  // };

  const clearResults = () => {
    setImg1(require('../Images/Chriss.jpg'));
  };
  return (
    <LinearGradient colors={['#ffcaa6', '#f86594']}>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 35,
              marginTop: 20,
              marginBottom: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Mark Attandance
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

        <View>
          <View
            style={{
              justifyContent: 'flex-start',
              padding: 10,
            }}>
            <Text style={{color: 'black', fontSize: 20, marginBottom: 10}}>
              Please Enter your Roll No:
            </Text>
            <TextInput
              placeholder="Enter Your Roll no"
              placeholderTextColor={'#ffffff'}
              keyboardType="numeric"
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
              <TouchableHighlight onPress={() => OpenCamera(true)}>
                <Image
                  style={{
                    height: 200,
                    width: 200,
                    resizeMode: 'center',
                  }}
                  source={img1}
                  resizeMode="contain"
                />
              </TouchableHighlight>
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
                clearResults();
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
});

export default Attandance;
