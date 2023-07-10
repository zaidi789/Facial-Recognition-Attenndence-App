// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Button,
//   Text,
//   Image,
//   TouchableHighlight,
//   Alert,
//   LogBox,
//   NativeEventEmitter,
// } from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import FaceSDK, {
//   Enum,
//   FaceCaptureResponse,
//   LivenessResponse,
//   MatchFacesResponse,
//   MatchFacesRequest,
//   MatchFacesImage,
//   MatchFacesSimilarityThresholdSplit,
//   RNFaceApi,
// } from '@regulaforensics/react-native-face-api';

// LogBox.ignoreLogs(['new NativeEventEmitter']);
// const eventManager = new NativeEventEmitter(RNFaceApi);

// var image1 = new MatchFacesImage();
// var image2 = new MatchFacesImage();

// const Main = () => {
//   const [img1, setImg1] = useState(require('../Images/ChrissEvans.jpg'));
//   const [img2, setImg2] = useState(require('../Images/Chriss.jpg'));
//   const [similarity, setSimilarity] = useState('nil');
//   const [livenessStatus, setLivenessStatus] = useState('nil');

//   useEffect(() => {
//     const videoEncoderCompletionEvent = json => {
//       const response = JSON.parse(json);
//       const transactionId = response['transactionId'];
//       const success = response['success'];
//       console.log('video_encoder_completion:');
//       console.log('    success: ' + success);
//       console.log('    transactionId: ' + transactionId);
//     };

//     eventManager.addListener(
//       'videoEncoderCompletionEvent',
//       videoEncoderCompletionEvent,
//     );

//     FaceSDK.init(
//       json => {
//         const response = JSON.parse(json);
//         if (!response['success']) {
//           console.log('Init failed: ');
//           console.log(json);
//         }
//       },
//       e => {},
//     );

//     return () => {
//       eventManager.removeListener(
//         'videoEncoderCompletionEvent',
//         videoEncoderCompletionEvent,
//       );
//     };
//   }, []);

//   const pickImage = first => {
//     Alert.alert(
//       'Select option',
//       '',
//       [
//         {
//           text: 'Use gallery',
//           onPress: () =>
//             launchImageLibrary({includeBase64: true}, response => {
//               if (response.assets == undefined) return;
//               setImage(
//                 first,
//                 response.assets[0].base64,
//                 Enum.ImageType.PRINTED,
//               );
//             }),
//         },
//         {
//           text: 'Use camera',
//           onPress: () =>
//             FaceSDK.presentFaceCaptureActivity(
//               result => {
//                 setImage(
//                   first,
//                   FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap,
//                   Enum.ImageType.LIVE,
//                 );
//               },
//               e => {},
//             ),
//         },
//       ],
//       {cancelable: true},
//     );
//   };

//   const setImage = (first, base64, type) => {
//     if (base64 == null) return;
//     setSimilarity('nil');
//     if (first) {
//       image1.bitmap = base64;
//       image1.imageType = type;
//       setImg1({uri: 'data:image/png;base64,' + base64});
//       setLivenessStatus('nil');
//     } else {
//       image2.bitmap = base64;
//       image2.imageType = type;
//       setImg2({uri: 'data:image/png;base64,' + base64});
//     }
//   };

//   const clearResults = () => {
//     setImg1(require('../Images/Chriss.jpg'));
//     setImg2(require('../Images/ChrissEvans.jpg'));
//     setSimilarity('nil');
//     setLivenessStatus('nil');
//     image1 = new MatchFacesImage();
//     image2 = new MatchFacesImage();
//   };

//   const matchFaces = () => {
//     if (
//       image1 == null ||
//       image1.bitmap == null ||
//       image1.bitmap == '' ||
//       image2 == null ||
//       image2.bitmap == null ||
//       image2.bitmap == ''
//     )
//       return;
//     setSimilarity('Processing...');
//     const request = new MatchFacesRequest();
//     request.images = [image1, image2];
//     FaceSDK.matchFaces(
//       JSON.stringify(request),
//       response => {
//         response = MatchFacesResponse.fromJson(JSON.parse(response));
//         FaceSDK.matchFacesSimilarityThresholdSplit(
//           JSON.stringify(response.results),
//           0.75,
//           str => {
//             const split = MatchFacesSimilarityThresholdSplit.fromJson(
//               JSON.parse(str),
//             );
//             setSimilarity(
//               split.matchedFaces.length > 0
//                 ? (split.matchedFaces[0].similarity * 100).toFixed(2) + '%'
//                 : 'error',
//             );
//           },
//           e => {
//             setSimilarity(e);
//           },
//         );
//       },
//       e => {
//         setSimilarity(e);
//       },
//     );
//   };

//   const performLiveness = () => {
//     FaceSDK.startLiveness(
//       result => {
//         result = LivenessResponse.fromJson(JSON.parse(result));

//         setImage(true, result.bitmap, Enum.ImageType.LIVE);
//         if (result.bitmap != null)
//           setLivenessStatus(
//             result['liveness'] == Enum.LivenessStatus.PASSED
//               ? 'passed'
//               : 'unknown',
//           );
//       },
//       e => {},
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.container}>
//         <View style={{flexDirection: 'column', padding: 5}}>
//           <View style={{flexDirection: 'column', alignItems: 'center'}}>
//             <TouchableHighlight onPress={() => pickImage(true)}>
//               <Image
//                 style={{
//                   height: 150,
//                   width: 150,
//                 }}
//                 source={img1}
//                 resizeMode="contain"
//               />
//             </TouchableHighlight>
//           </View>
//           <View
//             style={{
//               flexDirection: 'column',
//               alignItems: 'center',
//               padding: 5,
//             }}>
//             <TouchableHighlight onPress={() => pickImage(false)}>
//               <Image
//                 style={{
//                   height: 150,
//                   width: 200,
//                 }}
//                 source={img2}
//                 resizeMode="contain"
//               />
//             </TouchableHighlight>
//           </View>
//         </View>

//         <View
//           style={{
//             flexDirection: 'column',
//             width: '100%',
//             alignItems: 'center',
//           }}>
//           <View style={{padding: 3, width: '75%'}}>
//             <Button
//               color="#4285F4"
//               onPress={() => {
//                 matchFaces();
//               }}
//               title="     Match     "
//             />
//           </View>
//           <View style={{padding: 3, width: '75%'}}>
//             <Button
//               color="#4285F4"
//               onPress={() => {
//                 performLiveness();
//               }}
//               title="     Liveness     "
//             />
//           </View>
//           <View style={{padding: 3, width: '75%'}}>
//             <Button
//               color="#4285F4"
//               onPress={() => {
//                 clearResults();
//               }}
//               title="Clear"
//             />
//           </View>
//         </View>
//         <View style={{flexDirection: 'row'}}>
//           <Text
//             style={{
//               marginLeft: -20,
//               fontSize: 20,
//               fontWeight: 'bold',
//               color: 'black',
//             }}>
//             Similarity: {similarity}
//           </Text>
//           {/* <Text
//             style={{
//               marginLeft: 20,
//               fontSize: 20,
//               fontWeight: 'bold',
//               color: 'black',
//             }}>
//             Liveness: {livenessStatus}
//           </Text> */}
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//     marginBottom: 12,
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   resultsScreenBackButton: {
//     position: 'absolute',
//     bottom: 0,
//     right: 20,
//   },
// });

// export default Main;

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

LogBox.ignoreLogs(['new NativeEventEmitter']);
const eventManager = new NativeEventEmitter(RNFaceApi);

var image1 = new MatchFacesImage();
var image2 = new MatchFacesImage();

const Main = () => {
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

  const pickImage = first => {
    Alert.alert(
      'Select option',
      '',
      [
        {
          text: 'Use gallery',
          onPress: () =>
            launchImageLibrary({includeBase64: true}, response => {
              if (response.assets == undefined) return;
              setImage(
                first,
                response.assets[0].base64,
                Enum.ImageType.PRINTED,
              );
            }),
        },
        {
          text: 'Use camera',
          onPress: () =>
            FaceSDK.presentFaceCaptureActivity(
              result => {
                setImage(
                  first,
                  FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap,
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
    setSimilarity('nil');
    if (first) {
      image1.bitmap = base64;
      image1.imageType = type;
      setImg1({uri: 'data:image/png;base64,' + base64});
      setLivenessStatus('nil');
    } else {
      image2.bitmap = base64;
      image2.imageType = type;
      setImg2({uri: 'data:image/png;base64,' + base64});
    }
  };

  const clearResults = () => {
    setImg1(require('../Images/Chriss.jpg'));
    setImg2(require('../Images/ChrissEvans.jpg'));
    setSimilarity('nil');
    setLivenessStatus('nil');
    image1 = new MatchFacesImage();
    image2 = new MatchFacesImage();
  };

  const matchFaces = () => {
    if (
      image1 == null ||
      image1.bitmap == null ||
      image1.bitmap == '' ||
      image2 == null ||
      image2.bitmap == null ||
      image2.bitmap == ''
    )
      return;
    setSimilarity('Processing...');
    const request = new MatchFacesRequest();
    request.images = [image1, image2];
    FaceSDK.matchFaces(
      JSON.stringify(request),
      response => {
        response = MatchFacesResponse.fromJson(JSON.parse(response));
        FaceSDK.matchFacesSimilarityThresholdSplit(
          JSON.stringify(response.results),
          0.75,
          str => {
            const split = MatchFacesSimilarityThresholdSplit.fromJson(
              JSON.parse(str),
            );
            setSimilarity(
              split.matchedFaces.length > 0
                ? (split.matchedFaces[0].similarity * 100).toFixed(2) + '%'
                : 'error',
            );
          },
          e => {
            setSimilarity(e);
          },
        );
      },
      e => {
        setSimilarity(e);
      },
    );
  };

  const performLiveness = () => {
    FaceSDK.startLiveness(
      result => {
        result = LivenessResponse.fromJson(JSON.parse(result));

        setImage(true, result.bitmap, Enum.ImageType.LIVE);
        if (result.bitmap != null)
          setLivenessStatus(
            result['liveness'] == Enum.LivenessStatus.PASSED
              ? 'passed'
              : 'unknown',
          );
      },
      e => {},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={{flexDirection: 'r', padding: 5}}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <TouchableHighlight onPress={() => pickImage(true)}>
              <Image
                style={{
                  height: 150,
                  width: 150,
                }}
                source={img1}
                resizeMode="contain"
              />
            </TouchableHighlight>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              padding: 5,
            }}>
            <TouchableHighlight onPress={() => pickImage(false)}>
              <Image
                style={{
                  height: 150,
                  width: 200,
                }}
                source={img2}
                resizeMode="contain"
              />
            </TouchableHighlight>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={{padding: 3, width: '75%'}}>
            <Button
              color="#4285F4"
              onPress={() => {
                matchFaces();
              }}
              title="     Match     "
            />
          </View>
          <View style={{padding: 3, width: '75%'}}>
            <Button
              color="#4285F4"
              onPress={() => {
                performLiveness();
              }}
              title="     Liveness     "
            />
          </View>
          <View style={{padding: 3, width: '75%'}}>
            <Button
              color="#4285F4"
              onPress={() => {
                clearResults();
              }}
              title="Clear"
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: -20, fontWeight: 'bold', color: 'black'}}>
            Similarity: {similarity}
          </Text>
          <Text style={{marginLeft: 20, fontWeight: 'bold', color: 'black'}}>
            Liveness: {livenessStatus}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom: 12,
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

export default Main;
