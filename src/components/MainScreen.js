import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  View,
  Image,
  ImageBackground,
  AppState,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export default function MainScreen() {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [isShowCam, setIsShowCam] = useState(false);
  const [box, setBox] = useState(null);
  const [image, setImage] = useState('');
  const [capture, setCapture] = useState(true);
  // const [showBox, setShowBox] = useState(true);
  const [boxColor, setBoxColor] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [time, setTime] = useState('');

  const handelCapture = async () => {
    try {
      const options = {
        mirrorImage: false,
        quality: 1,
        playSoundOnCapture: true,
      };
      const data = await takePicture(options);
      CameraRoll.save(data.uri);
      setImage(data.uri);
      setCapture(true);
      setBox('');
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(capture);
  const handlerFace = ({faces}) => {
    // console.log(faces[0].bounds.origin.x);
    if (faces[0]) {
      setBox({
        boxs: {
          width: 210,

          height: 300,

          x: 115,

          y: 200,
          // yawAngle: faces[0].yawAngle,
          // rollAngle: faces[0].rollAngle,
        },
        // rightEyePosition: faces[0].rightEyePosition,
        // leftEyePosition: faces[0].leftEyePosition,
        // bottomMounthPosition: faces[0].bottomMounthPosition,
      });
      if (faces[0].bounds.origin.x > 130 && faces[0].bounds.origin.x < 180) {
        if (faces[0].bounds.origin.y > 250 && faces[0].bounds.origin.y < 302) {
          setBoxColor(true);
          setCapture(!capture);
          setShowTimer(!showTimer);
          // setTimeout(() => {
          //   handelCapture();
          // }, 3000);
        }
      } else {
        setShowTimer(false);
        setBoxColor(false);
      }
    } else {
    }
  };

  const Countdown = () => {
    const [countdown, setCountdown] = useState(4);

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (countdown <= 1) {
          clearInterval(intervalId);
          // Do something after countdown is finished
          // handelCapture();
        } else {
          setCountdown(countdown - 1);
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, [countdown]);

    return (
      <View
        style={{
          height: 100,
          width: 100,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green'}}>
          {countdown}
        </Text>
      </View>
    );
  };

  function TimerComponent() {
    setTimeout(() => {
      setTime(2);
    }, 3000);

    setTimeout(() => {
      setTime(1);
    }, 2000);
    setTimeout(() => {
      setTime(0);
    }, 1000);

    return (
      <View
        style={{
          height: 100,
          width: 100,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green'}}>
          {time}
        </Text>
      </View>
    );
  }

  // function Timer() {
  //   return (
  //     <CountDown
  //       size={30}
  //       until={1000}
  //       onFinish={() => alert('Finished')}
  //       digitStyle={{
  //         backgroundColor: '#FFF',
  //         borderWidth: 2,
  //         borderColor: '#1CC625',
  //       }}
  //       digitTxtStyle={{color: '#1CC625'}}
  //       timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
  //       separatorStyle={{color: '#1CC625'}}
  //       timeToShow={['H', 'M', 'S']}
  //       timeLabels={{m: null, s: null}}
  //       showSeparator
  //     />
  //   );
  // }
  return (
    <View style={styles.mainView}>
      {isShowCam && !image && (
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.front}
          onFacesDetected={res => {
            // console.log('----', res.bottomMouthPosition);
            handlerFace(res);
          }}
          // onFaceDetectionError={e => {
          //   console.log('error-----', e);
          // }}
          // whiteBalance={25}
          // zoom={0}
          // flashMode={RNCamera.Constants.FlashMode.on}
          // faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
          // // faceDetectionLandmarks={
          //   RNCamera.Constants.FaceDetection.Landmarks.all
          // }
          // // faceDetectionClassifications={
          //   RNCamera.Constants.FaceDetection.Classifications.all
          // }
          // autoFocus={RNCamera.Constants.AutoFocus.on}
        >
          {box && (
            <View
              style={[
                boxColor
                  ? styles.boundWithColor({
                      width: box.boxs.width,
                      height: box.boxs.height,
                      x: box.boxs.x,
                      y: box.boxs.y,
                    })
                  : styles.bound({
                      width: box.boxs.width,
                      height: box.boxs.height,
                      x: box.boxs.x,
                      y: box.boxs.y,
                    }),
              ]}
            />
          )}
          {/* {showTimer && Countdown()} */}

          {/* {console.log(capture)} */}
          <TouchableOpacity
            disabled={capture}
            style={{
              height: 90,
              width: 90,
              marginBottom: 20,
              borderRadius: 50,
              borderWidth: 2,
              justifyContent: 'center',
              alignContent: 'center',
            }}
            onPress={() => {
              handelCapture();
            }}>
            <Entypo
              name="camera"
              size={50}
              color="green"
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </RNCamera>
      )}

      <View style={styles.titleView}>
        <Text style={styles.title}>Wellcome</Text>
        <Text style={styles.title}> To </Text>
        <Text style={styles.title}>Face Attandnce</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 50,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.text}>Mark your Attandence Here!</Text>
          <TouchableOpacity
            onPress={() => {
              setIsShowCam(!isShowCam);
              // Timer();
            }}>
            <Entypo
              name="camera"
              size={24}
              color="black"
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            // backgroundColor: 'green',
            height: 300,
            width: 300,
            alignItems: 'center',
          }}>
          {image !== '' && (
            <Image
              // blurRadius={4}
              source={{uri: image}}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          {image && (
            <TouchableOpacity
              style={{
                height: 50,
                width: 70,
                backgroundColor: 'tomato',
                marginTop: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setImage(null);
                // setShowBox(true);
                setIsShowCam(!isShowCam);
              }}>
              <Ionicons name="close-circle-sharp" size={40} color="black" />
            </TouchableOpacity>
          )}
        </View>

        {/* {showTimer && Timer()} */}
        {/* {Countdown()} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  titleView: {
    height: '80%',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'tomato',
    elevation: 2,
    opacity: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    elevation: 2,
    opacity: 20,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  camera: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
    borderColor: 'black',
    // borderWidth: 1,
  },
  bound: ({width, height, x, y}) => {
    return {
      position: 'absolute',
      top: y,
      left: x - 30,
      height,
      width,
      borderWidth: 3,
      borderColor: 'red',
      borderStyle: 'dotted',
      borderRadius: 90,
      zIndex: 3000,
    };
  },
  boundWithColor: ({width, height, x, y}) => {
    return {
      position: 'absolute',
      top: y,
      left: x - 30,
      height,
      width,
      borderWidth: 3,
      borderColor: 'green',
      borderStyle: 'dotted',
      borderRadius: 90,
      zIndex: 3000,
    };
  },
});
