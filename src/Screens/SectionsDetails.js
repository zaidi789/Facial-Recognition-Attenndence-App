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
  FaceCaptureResponse,
} from '@regulaforensics/react-native-face-api';
import {useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Realm from 'realm';
import Timer from '../components/CustomTimer';
let realm;
LogBox.ignoreLogs(['new NativeEventEmitter']);

export default function SectionsDetails({route}) {
  const {section, classId} = route.params;
  const [profileImage, setProfileImage] = useState('');
  // const [sections, setSections] = useState();
  const [studentDetails, setStudentDetails] = useState({});
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  realm = initializeRealm();
  console.log(section, classId);
  useEffect(() => {
    const realm = initializeRealm();
    // Get students of the selected class id and section from the 'Student' table
    const studentsOfClassAndSection = realm
      .objects('Student')
      .filtered(`class = "${classId}" AND section = "${section}"`);
    // Map the Results object to an array of objects
    const studentsArray = studentsOfClassAndSection.map(student => ({
      id: student.id,
      school: student.school,
      name: student.name,
      father_name: student.father_name,
      b_form_no: student.b_form_no,
      class: student.class,
      section: student.section,
      // Add other properties as needed
    }));
    // Update the state with the array of objects
    setStudents(studentsArray);
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
    // Close the Realm instance
    // realm.close();
  }, [classId, section]);
  // const realm = initializeRealm();
  // const students1 = realm.objects('Student');
  // console.log('Students:', students);
  // console.log('------------', students);

  const pickImage = (bform, name, section) => {
    // console.log(bform, name, section);
    // return;
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
        setImage(img, bform, name, section);
      },
      e => {},
    );
  };

  const setImage = (base64, bform, name, section) => {
    // console.log(section, roll, name);
    // return;
    if (base64 == null) return;
    try {
      setProfileImage({uri: 'data:image/jpeg;base64,' + base64});
      // const updatedData = [...data];
      // updatedData[idx] = {
      //   ...data[idx],
      //   avatar: {uri: 'data:image/jpeg;base64,' + base64},
      // };
      const updatedImageData = {
        uri: 'data:image/jpeg;base64,' + base64,
      };
      // updateUser(section, roll, name, updatedImageData);
      update_user_image(section, bform, name, base64);
      // setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };
  const update_user_image = (section, bform, name, updatedImageData) => {
    // <-- Add the `realm` parameter
    // Convert the image object to a base64-encoded string
    // const base64Image = updatedImageData.uri.split(',')[1];

    realm.write(() => {
      // Find the user with the given section, roll_no, and name
      const user = realm
        .objects('Student')
        .filtered(
          'section = $0 AND b_form_no = $1 AND name = $2',
          section,
          bform,
          name,
        )[0];

      if (!user) {
        alert('User not found');
      } else {
        // Update the user's image
        realm.create(
          'Student',
          {
            student_id: user.student_id,
            school: user.school,
            name: user.name,
            father_name: user.father_name,
            b_form_no: user.b_form_no,
            class: user.class,
            section: user.section,
            image: 'data:image/jpeg;base64,' + updatedImageData, // Set the image as a base64-encoded string
          },
          true,
        ); // Setting `true` for the third argument will update the existing user with the new values

        Alert.alert(
          'Success',
          'User image updated successfully',
          [
            {
              text: 'Ok',
              // onPress: () => navigation.navigate('Log'),
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  // const update_user_image = (section, roll_no, name, updatedImageData) => {
  //   // Convert the image object to a base64-encoded string
  //   const base64Image = updatedImageData.uri.split(',')[1];

  //   realm.write(() => {
  //     // Find the user with the given section, roll_no, and name
  //     const user = realm
  //       .objects('user_details')
  //       .filtered(
  //         'section = $0 AND roll_no = $1 AND name = $2',
  //         section,
  //         roll_no,
  //         name,
  //       )[0];

  //     if (!user) {
  //       alert('User not found');
  //     } else {
  //       // Update the user's image
  //       realm.create(
  //         'user_details',
  //         {
  //           id: user.id,
  //           name: user.name,
  //           roll_no: user.roll_no,
  //           section: user.section,
  //           image: 'data:image/jpeg;base64,' + base64Image, // Set the image as a base64-encoded string
  //         },
  //         true,
  //       ); // Setting `true` for the third argument will update the existing user with the new values

  //       Alert.alert(
  //         'Success',
  //         'User image updated successfully',
  //         [
  //           {
  //             text: 'Ok',
  //             // onPress: () => navigation.navigate('Log'),
  //           },
  //         ],
  //         {cancelable: false},
  //       );
  //     }
  //   });
  // };

  return (
    <View style={styles.linearGradient}>
      <View style={styles.titleView}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 20,
              left: -30,
              // backgroundColor: 'green',
            }}>
            Section-{section}
          </Text>
          <View style={{left: 50, bottom: 3}}>
            <Timer isActive={true} />
          </View>
        </View>

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
          data={students}
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
                <Text style={{fontSize: 18, color: 'black', left: 5}}>
                  {item.b_form_no}
                </Text>
                <Text style={{fontSize: 18, color: 'black', right: 15}}>
                  {item.name}
                </Text>
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
                      pickImage(item.b_form_no, item.name, item.section);
                    }}>
                    {item.image && (
                      <Image source={item.image} style={styles.image} />
                    )}

                    {!item.image && (
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
          // onPress={() => {
          //   // console.log('here', sectionID);
          //   if (sectionID == 1) {
          //     navigation.navigate('Sections');
          //   } else {
          //     // console.log('--------------');
          //     // setSectionID(sectionID - 1);
          //     setSectionID(id => id - 1);
          //   }
          // }}
        >
          <Ionicons name="arrow-back-circle-outline" size={20} color="black" />
          <Text style={styles.bottomButtonText}> Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          // onPress={() => {
          //   // console.log('here', sectionID);
          //   if (sectionID === 1 || sectionID < length) {
          //     // setSectionID(sectionID + 1);
          //     // addSection();
          //     // setSectionID(parseInt(sectionID + 1));
          //     // setSectionID(id => parseInt(id + 1));
          //     setSectionID(prevCounter => prevCounter + 1);
          //   }
          // }}
          // disabled={length ? true : false}
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
    marginTop: 11,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 5,
    backgroundColor: '#fdfffc',
    borderWidth: Platform.OS === 'ios' ? 0.5 : 0,
    borderRadius: 2,
    borderColor:
      Platform.OS === 'ios' ? 'rgb(225, 225, 225)' : 'rgba(0,0,0,.0)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 2,
    bottom: 8,
    // top: 5,
  },
});
