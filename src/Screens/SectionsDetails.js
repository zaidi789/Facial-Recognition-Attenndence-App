import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  LogBox,
  Alert,
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
import {useNavigation} from '@react-navigation/native';
import {Avatar, Tooltip} from 'react-native-paper';
import uuid from 'react-native-uuid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
LogBox.ignoreLogs(['new NativeEventEmitter']);
var image1 = new MatchFacesImage();
const listId = uuid.v4();
export default function SectionsDetails() {
  const [profileImage, setProfileImage] = useState('');
  const [data, setData] = useState([
    {
      id: uuid.v4(),
      name: 'Sarah',
      roll_no: 1,
      section: 1,
      avatar: profileImage,
    },
    {
      id: uuid.v4(),
      name: 'Emma',
      roll_no: 2,
      section: 1,
      avatar: '',
    },
    {
      id: uuid.v4(),
      name: 'Laura',
      roll_no: 3,
      section: 1,
      avatar: '',
    },
    {
      id: uuid.v4(),
      name: 'Marie',
      roll_no: 4,
      section: 1,
      avatar: '',
    },
    {
      id: uuid.v4(),
      name: 'Emily',
      roll_no: 5,
      section: 1,
      avatar: '',
    },
  ]);
  const navigation = useNavigation();
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

  const pickImage = idx => {
    const config = {
      cameraPositionIOS: 0,
      cameraId: 1,
      cameraSwitchEnabled: true,
      isCloseButtonEnabled: true,
    };
    FaceSDK.presentFaceCaptureActivityWithConfig(
      config,
      faceCaptureResponse => {
        const response = FaceCaptureResponse.fromJson(
          JSON.parse(faceCaptureResponse),
        );
        let img = response.image.bitmap;
        setImage(img, idx);
        // ... check response.image.bitmap for capture result.
      },
      e => {},
    );
  };

  //   const pickImage = idx => {s
  //     // console.log(idx);
  //     // setImage(profileImage, idx);
  //     // return;
  //     const config = {
  //       cameraPositionIOS: 0,
  //       cameraId: 1,
  //       cameraSwitchEnabled: true,
  //       isCloseButtonEnabled: true,
  //     };

  //     Alert.alert(
  //       'Alert',
  //       'Are you Sure',
  //       [
  //         {
  //           text: 'Open Camera',

  //           onPress: () =>
  //             FaceSDK.presentFaceCaptureActivityWithConfig(
  //               config,
  //               result => {
  //                 const response = FaceCaptureResponse.fromJson(
  //                   JSON.parse(result),
  //                 );
  //                 let img = response.image.bitmap;
  //                 setImage(img, idx);
  //               },
  //               e => {
  //                 console.log(e);
  //               },
  //             ),
  //         },
  //         ,
  //       ],
  //       {cancelable: true},
  //     );
  //   };
  //   console.log;

  const setImage = (base64, idx) => {
    if (base64 == null) return;
    // console.log(id);
    try {
      image1.bitmap = base64;
      setProfileImage({uri: 'data:image/jpeg;base64,' + base64});
      //   if (data[idx]) {
      //   console.log('the index is', idx);
      //   return;
      // setData[] profileImage;
      //   setData(
      //     [...data].map((obj, index) => {
      //       if (index === idx) {
      //         console.log('index matched', idx, obj.id, obj.name);
      //         return {
      //           ...obj,
      //           avatar: {uri: 'data:image/jpeg;base64,' + base64},
      //         };
      //       } else {
      //         console.log('idx not matched');
      //       }
      //     }),
      //   );
      const key = data.findIndex((item, index) => index === idx);
      console.log('key is', key);
      return (data[key] = {
        ...data[key],
        avatar: {uri: 'data:image/jpeg;base64,' + base64},
      });
      //   return data[key];
      //   console.log('idx avtar is', data[key]);
      //   } else {
      //     console.log('error occur');
      //   }
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log('Profile image data is',);

  const DATA = [
    {
      id: uuid.v4(),
      name: 'Sarah',
      roll_no: 1,
      section: 1,
      avatar: '',
    },
    {
      id: uuid.v4(),
      name: 'Emma',
      roll_no: 2,
      section: 1,
      avatar: '',
    },
    {
      id: uuid.v4(),
      name: 'Laura',
      roll_no: 3,
      section: 1,
      avatar: '',
    },
    {
      id: uuid.v4(),
      name: 'Marie',
      roll_no: 4,
      section: 1,
      avatar: '',
    },
    {
      id: uuid.v4(),
      name: 'Emily',
      roll_no: 5,
      section: 1,
      avatar: '',
    },
    {
      id: uuid.v4(),
      name: 'Anna',
      roll_no: 6,
      section: 1,
      avatar: '',
    },
  ];
  //   console.log('--------------', data);
  //   console.log('Avataar data is _____________', DATA[0].avatar);
  return (
    <View style={styles.linearGradient}>
      <View style={styles.titleView}>
        <Text
          style={{
            fontSize: 40,
            color: 'black',
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Students List
        </Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}>
            <View style={{width: '25%'}}>
              <Text style={styles.heading}>Name</Text>
            </View>
            <View style={{width: '25%'}}>
              <Text style={styles.heading}> Roll_NO</Text>
            </View>
            <View style={{width: '25%'}}>
              <Text style={styles.heading}> Section</Text>
            </View>
            <View style={{width: '25%', left: 10}}>
              <Text style={styles.heading}> Image</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bodyView}>
        {/* {console.log('data is ', data)} */}
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <View style={styles.buttonContainerStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.title}>{item.roll_no}</Text>
                <Text style={styles.title}>{item.section}</Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: 15,
                  }}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderRadius: 30,
                      height: 50,
                      width: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      pickImage(index);
                    }}>
                    {item.avatar && (
                      <Image source={item.avatar} style={styles.image} />
                    )}

                    {!item.avatar && (
                      <FontAwesome name="camera" size={35} color="black" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      pickImage(index);
                    }}>
                    <Text>Retake</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 10,
    // borderRadius: 5,
    backgroundColor: 'rgb(235,235,235)',
  },
  titleView: {
    height: '15%',
    width: '100%',
    // backgroundColor: 'yellow',
    padding: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  bodyView: {
    height: '90%',
    width: '100%',
    // backgroundColor: 'green',
    paddingTop: 1,
  },
  heading: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  listView: {
    backgroundColor: '#fdfffc',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    height: 75,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 12,
    // borderRadius: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'center',
    borderRadius: 30,
  },
  buttonContainerStyle: {
    height: 75,
    marginTop: 11,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: 'white',
    borderWidth: Platform.OS === 'ios' ? 0.5 : 0,
    borderRadius: 2,
    borderColor:
      Platform.OS === 'ios' ? 'rgb(225, 225, 225)' : 'rgba(0,0,0,.0)',

    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,

    elevation: 2,
  },
});
