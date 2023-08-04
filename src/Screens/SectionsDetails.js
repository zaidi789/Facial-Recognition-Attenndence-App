import React, {useContext, useEffect, useState} from 'react';
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
  BackHandler,
} from 'react-native';
import FaceSDK, {
  FaceCaptureResponse,
  LivenessResponse,
  Enum,
} from '@regulaforensics/react-native-face-api';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimerContext from '../components/TimmerContext';
LogBox.ignoreLogs(['new NativeEventEmitter']);

export default function SectionsDetails({route}) {
  const {ClassId} = route.params;
  const [classNo, setClassNo] = useState(parseInt(ClassId));
  const [profileImage, setProfileImage] = useState('');
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const [livenessStatus, setLivenessStatus] = useState('nil');
  const {formattedTime} = useContext(TimerContext);

  // console.log('recieved class no', ClassId);
  // useExitAlertOnBack(false);
  const fetchStudentsData = () => {
    const realm = initializeRealm();
    const studentsOfClass = realm
      .objects('Student')
      .filtered(`class = "${classNo}"`);
    const studentsArray = studentsOfClass.map(student => ({
      id: student.student_id,
      name: student.name,
      father_name: student.father_name,
      b_form_no: student.b_form_no,
      class: student.class,
      image: student.image,
      // Add other properties as needed
    }));
    setStudents([...studentsArray]);
    realm.close();
  };

  useEffect(() => {
    const realm = initializeRealm();

    const studentsOfClass = realm
      .objects('Student')
      .filtered(`class = "${classNo}"`);
    const studentsArray = studentsOfClass.map(student => ({
      id: student.student_id,
      name: student.name,
      father_name: student.father_name,
      b_form_no: student.b_form_no,
      class: student.class,
      image: student.image,
      // Add other properties as needed
    }));

    setStudents([...studentsArray]);

    // Close the Realm instance
    realm.close();
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
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Check if the user is on the specific screen where you want to handle the back button
        if (classNo !== 1) {
          // Handle the back button functionality for this specific screen
          // Navigate to classNo - 1 if classNo > 1
          if (classNo > 1) {
            setClassNo(prevClassNo => prevClassNo - 1);
          }
          return true; // Return true to prevent default back button behavior
        } else {
          navigation.navigate('ClassList'); // Navigate to ClassList screen if classNo === 1
          return true; // Return true to prevent default back button behavior
        }
        // return false; // Allow default back button behavior for other screens
      },
    );

    // Remove the back button listener when the component unmounts
    return () => {
      backHandler.remove(), realm.close();
    };

    // Make sure to clean up the realm instance when the component unmounts
  }, [classNo, navigation]);
  // console.log(students);

  // useEffect(() => {
  //   const realm = initializeRealm();

  //   const studentsGroupedByClass = fetchAllStudentsGroupedByClass(realm);
  //   setStudentsByClass(studentsGroupedByClass);

  //   // Close the Realm instance
  //   realm.close();

  //   // Make sure to clean up the realm instance when the component unmounts
  //   return () => {
  //     realm.close();
  //   };
  // }, []);
  // const fetchStudentsByClass = (realm, classNumber) => {
  //   return realm.objects('Student').filtered(`class = ${classNumber}`);
  // };

  // useEffect(() => {
  //   const realm = initializeRealm();
  //   const classNumber = classId; // Replace this with the desired class number from your state
  //   const studentsOfClass = fetchStudentsByClass(realm, classNumber);

  //   // Map the Results object to an array of objects
  //   const studentsArray = studentsOfClass.map(student => ({
  //     id: student.student_id,
  //     name: student.name,
  //     father_name: student.father_name,
  //     b_form_no: student.b_form_no,
  //     class: student.class,
  //     // Add other properties as needed
  //   }));

  //   // Update the state with the array of objects
  //   setStudents(studentsArray);

  //   // Close the Realm instance
  //   // realm.close();

  //   // Make sure to clean up the realm instance when the component unmounts
  //   return () => {
  //     realm.close();
  //   };
  // }, [classId]);

  // useEffect(() => {
  //   const realm = initializeRealm();
  //   // Get students of the selected class id and section from the 'Student' table
  //   const studentsOfClassAndSection = realm
  //     .objects('Student')
  //     .filtered(`class = "${classId}" AND section = "${section}"`);
  //   // Map the Results object to an array of objects
  //   const studentsArray = studentsOfClassAndSection.map(student => ({
  //     id: student.id,
  //     school: student.school,
  //     name: student.name,
  //     father_name: student.father_name,
  //     b_form_no: student.b_form_no,
  //     class: student.class,
  //     section: student.section,
  //     // Add other properties as needed
  //   }));
  //   // Update the state with the array of objects
  //   setStudents(studentsArray);
  //   FaceSDK.init(
  //     json => {
  //       const response = JSON.parse(json);
  //       if (!response['success']) {
  //         console.log('Init failed: ');
  //         console.log(json);
  //       }
  //     },
  //     e => {},
  //   );
  //   // Close the Realm instance
  //   // realm.close();
  // }, [classId, section]);
  // const realm = initializeRealm();
  // const students1 = realm.objects('Student');
  // console.log('Students:', students);
  // console.log('------------', students);

  // useEffect(() => {
  //   const realm = initializeRealm();

  //   // Get all students from the 'Student' table
  //   const allStudents = realm.objects('Student');

  //   // Filter the students based on the selected classId
  //   const studentsOfClass = allStudents.filtered(`class = ${classId}`);

  //   // Map the Results object to an array of objects
  //   const studentsArray = studentsOfClass.map(student => ({
  //     id: student.student_id,
  //     school: student.school,
  //     name: student.name,
  //     father_name: student.father_name,
  //     b_form_no: student.b_form_no,
  //     class: student.class,
  //     section: student.section,
  //     // Add other properties as needed
  //   }));

  //   // Update the state with the array of objects
  //   setStudents(studentsArray);

  //   FaceSDK.init(
  //     json => {
  //       const response = JSON.parse(json);
  //       if (!response['success']) {
  //         console.log('Init failed: ');
  //         console.log(json);
  //       }
  //     },
  //     e => {},
  //   );

  //   // Close the Realm instance
  //   // realm.close();
  // }, [classId]);

  const pickImage = (bform, name) => {
    // console.log(bform, name, section);
    // return;
    const config = {
      cameraPositionIOS: 0,
      cameraId: 1,
      cameraSwitchEnabled: true,
      isCloseButtonEnabled: true,
    };
    FaceSDK.startLiveness(
      result => {
        result = LivenessResponse.fromJson(JSON.parse(result));
        let img = result.bitmap;
        setImage(img, bform, name, classNo);
        // setImage(true, result.bitmap, Enum.ImageType.LIVE);
        // if (result.bitmap != null)
        //   // setLivenessStatus(
        //   //   result['liveness'] == Enum.LivenessStatus.PASSED
        //   //     ? 'passed'
        //   //     : 'unknown',
        //   // );
      },
      e => {},
    );
    // FaceSDK.presentFaceCaptureActivityWithConfig(
    //   config,
    //   faceCaptureResponse => {
    //     const response = FaceCaptureResponse.fromJson(
    //       JSON.parse(faceCaptureResponse),
    //     );
    //     let img = response.image.bitmap;
    //     setImage(img, bform, name, classNo);
    //   },
    //   e => {},
    // );
  };

  const setImage = (base64, bform, name, classNo) => {
    if (base64 == null) return;
    try {
      setProfileImage({uri: 'data:image/jpeg;base64,' + base64});
      const updatedImageData = {
        uri: 'data:image/jpeg;base64,' + base64,
      };
      update_user_image(classNo, bform, name, base64);
      // Call the function to fetch and update the students data again
      fetchStudentsData();
    } catch (error) {
      console.log(error);
    }
  };

  // const setImage = (base64, bform, name, classNo) => {
  //   // console.log(section, roll, name);
  //   // return;
  //   if (base64 == null) return;
  //   try {
  //     setProfileImage({uri: 'data:image/jpeg;base64,' + base64});
  //     // const updatedData = [...data];
  //     // updatedData[idx] = {
  //     //   ...data[idx],
  //     //   avatar: {uri: 'data:image/jpeg;base64,' + base64},
  //     // };
  //     const updatedImageData = {
  //       uri: 'data:image/jpeg;base64,' + base64,
  //     };
  //     // updateUser(section, roll, name, updatedImageData);
  //     update_user_image(classNo, bform, name, base64);
  //     // setData(updatedData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const update_user_image = (classNo, bform, name, base64) => {
    // Convert the image object to a base64-encoded string
    // const base64Image = updatedImageData.uri.split(',')[1];
    const realm = initializeRealm();
    realm.write(() => {
      // Find the user with the given classId, b_form_no, and name
      const user = realm
        .objects('Student')
        .filtered(
          'class = $0 AND b_form_no = $1 AND name = $2',
          classNo,
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
            image: 'data:image/jpeg;base64,' + base64, // Set the image as a base64-encoded string
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
            Class-{classNo}
          </Text>
          <View style={{left: 50, bottom: 3}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                color: 'black',
                alignSelf: 'center',
                top: 8,
              }}>
              {formattedTime.hours}h {formattedTime.minutes}m{' '}
              {formattedTime.seconds}s
            </Text>
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
              <Text style={styles.heading}> B_Form</Text>
            </View>
            <View style={{width: '33%', left: 5}}>
              <Text style={styles.heading}>Name</Text>
            </View>

            <View style={{width: '33%', left: 45}}>
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
                      pickImage(item.b_form_no, item.name);
                    }}>
                    {item.image && (
                      <Image source={{uri: item.image}} style={styles.image} />
                    )}

                    {!item.image && (
                      <FontAwesome name="camera" size={35} color="black" />
                    )}
                  </TouchableOpacity>
                  {item.image && (
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
            // console.log('here', sectionID);
            if (classNo === 1) {
              navigation.navigate('ClassList');
            } else {
              // ClassId = -1;
              // console.log('--------------');
              // setSectionID(sectionID - 1);
              setClassNo(id => id - 1);
            }
          }}>
          <Ionicons name="arrow-back-circle-outline" size={20} color="black" />
          <Text style={styles.bottomButtonText}> Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            // console.log('here', sectionID);
            if (classNo === 1 || classNo < 10) {
              // setSectionID(sectionID + 1);
              // addSection();
              // setSectionID(parseInt(sectionID + 1));
              // setSectionID(id => parseInt(id + 1));
              setClassNo(prevCounter => prevCounter + 1);
            }
          }}
          disabled={classNo == 10 ? true : false}>
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
    left: -10,
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
