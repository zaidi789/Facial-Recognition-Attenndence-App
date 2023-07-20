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
import Ionicons from 'react-native-vector-icons/Ionicons';
LogBox.ignoreLogs(['new NativeEventEmitter']);
var image1 = new MatchFacesImage();
const listId = uuid.v4();
export default function SectionsDetails({route}) {
  const {sectionId} = route.params;
  const [sectionID, setSectionID] = useState(sectionId);
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
      },
      e => {},
    );
  };

  const setImage = (base64, idx) => {
    if (base64 == null) return;
    try {
      setProfileImage({uri: 'data:image/jpeg;base64,' + base64});
      const updatedData = [...data];
      updatedData[idx] = {
        ...data[idx],
        avatar: {uri: 'data:image/jpeg;base64,' + base64},
      };
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.linearGradient}>
      <View style={styles.titleView}>
        <Text
          style={{
            fontSize: 25,
            color: 'black',
            fontWeight: 'bold',
            marginBottom: 35,
          }}>
          Students List Section-{sectionID}
        </Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
            }}>
            <View style={{width: '33%'}}>
              <Text style={styles.heading}> Roll_NO</Text>
            </View>
            <View style={{width: '33%', left: 10}}>
              <Text style={styles.heading}>Name</Text>
            </View>

            <View style={{width: '33%', left: 40}}>
              <Text style={styles.heading}> Image</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bodyView}>
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
                  width: '100%',
                }}>
                <Text style={{fontSize: 18, color: 'black', left: 20}}>
                  {item.roll_no}
                </Text>

                <Text style={{fontSize: 18, color: 'black'}}>{item.name}</Text>

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
                      // alignSelf: 'center',
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
                  {item.avatar && (
                    <TouchableOpacity
                      onPress={() => {
                        pickImage(index);
                      }}>
                      <Text>Retake</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.bottomButtonView}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            if (sectionId == 1) {
              navigation.navigate('Sections');
            } else {
              // setSectionID((sectionID -= 1));
            }
          }}>
          <Ionicons name="arrow-back-circle-outline" size={20} color="black" />
          <Text style={styles.bottomButtonText}> Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          // onPress={() => {
          //   if (sectionId >= 1 && sectionId <= 10) {
          //     console.log('here');
          //     setSectionID((sectionID = sectionID + 1));
          //     // navigation.navigate('Sections');
          //   }
          // }}
        >
          <Text style={styles.bottomButtonText}>Next </Text>
          <Ionicons
            name="arrow-forward-circle-outline"
            size={20}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
          <Text style={styles.bottomButtonText}>Submit </Text>
          <Ionicons
            name="checkmark-done-circle-outline"
            size={20}
            color="black"
          />
        </TouchableOpacity>
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
    height: '80%',
    width: '100%',
    // backgroundColor: 'green',
    paddingTop: 1,
  },
  bottomButtonView: {
    height: '10%',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
  },
  heading: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  bottomButton: {
    backgroundColor: 'rgb(235,235,235)',
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
    flexDirection: 'row',
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  // listView: {
  //   backgroundColor: '#fdfffc',
  //   padding: 5,
  //   marginVertical: 5,
  //   marginHorizontal: 5,
  //   // height: 75,
  //   shadowOffset: {
  //     width: 0,
  //     height: 3,
  //   },
  //   shadowRadius: 2,
  //   shadowOpacity: 12,
  //   // borderRadius: 20,
  // },
  title: {},
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
    // height: 75,
    marginTop: 11,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#fdfffc',
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
