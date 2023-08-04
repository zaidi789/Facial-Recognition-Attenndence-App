import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import initializeRealm from '../Realm/realm';
export default function Entery() {
  const navigation = useNavigation();

  // const addDummyData = () => {
  //   const realm = initializeRealm();
  //   const sections = ['A', 'B', 'C', 'D', 'E'];

  //   try {
  //     realm.write(() => {
  //       // Create the School
  //       const school = realm.create('School', {
  //         id: 1, // You can set any unique ID for the school
  //         school_id: 1, // You can set any unique ID for the school
  //         name: 'Sample School',
  //         address: 'Sample Address',
  //         lat: 0,
  //         long: 0,
  //         phone: 'Sample Phone',
  //         students: [],
  //       });

  //       // Create 5 classes
  //       for (let classNum = 1; classNum <= 5; classNum++) {
  //         const className = `Class ${classNum}`;

  //         // Create 4 sections in each class
  //         for (const sectionName of sections) {
  //           // Create 5 students in each section
  //           for (let studentNum = 1; studentNum <= 5; studentNum++) {
  //             const studentName = `Student ${studentNum}`;
  //             const bFormNo = `B${classNum}${sectionName}${studentNum}`;

  //             const student = {
  //               id: `${classNum}${sectionName}${studentNum}`, // Unique ID for the student based on class, section, and student number
  //               student_id: `${classNum}${sectionName}${studentNum}`, // Unique ID for the student based on class, section, and student number
  //               school: school,
  //               name: studentName,
  //               father_name: `Father ${studentNum}`,
  //               b_form_no: bFormNo,
  //               class: className,
  //               section: sectionName,
  //               attendance: [],
  //               image: '',
  //             };

  //             // Add the student to the school's students array
  //             school.students.push(student);
  //           }
  //         }
  //       }
  //     });

  //     console.log('Dummy data added successfully.');
  //   } catch (error) {
  //     console.log('Error while adding dummy data:', error);
  //   }

  //   // Close the Realm instance
  //   realm.close();
  // };

  const addDummyData = () => {
    const realm = initializeRealm();

    try {
      realm.write(() => {
        // Create the School
        const school = realm.create('School', {
          id: 1, // You can set any unique ID for the school
          school_id: 1, // You can set any unique ID for the school
          name: 'Sample School',
          address: 'Sample Address',
          lat: 0,
          long: 0,
          phone: 'Sample Phone',
          students: [],
        });

        // Create 10 classes
        for (let classNum = 1; classNum <= 10; classNum++) {
          // Create 10 students in each class
          for (let studentNum = 1; studentNum <= 10; studentNum++) {
            const studentName = `Student ${classNum}-${studentNum}`;
            const bFormNo = `B${classNum}${studentNum}`;

            const student = {
              student_id: `${classNum}${studentNum}`, // Unique ID for the student based on class and student number
              school: school,
              name: studentName,
              father_name: `Father ${studentNum}`,
              b_form_no: bFormNo,
              class: classNum,
              attendance: [],
              image: '',
            };

            // Add the student to the school's students array
            school.students.push(student);
          }
        }
      });

      console.log('Dummy data added successfully.');
    } catch (error) {
      console.log('Error while adding dummy data:', error);
    }

    // Close the Realm instance
    realm.close();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Images/BACKGROUND1.jpg')}
        resizeMode="stretch"
        style={styles.image}>
        <View
          style={{height: '30%', backgroundColor: 'transparent', padding: 25}}>
          <Text
            style={{
              fontSize: 30,
              color: 'blue',
              marginTop: 20,
              fontWeight: '900',
            }}>
            Welcome!
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#595cff',
              marginTop: 10,
              fontWeight: '900',
            }}>
            We're glad you're here.
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#595cff',
              // marginTop: 20,
              fontWeight: '900',
            }}>
            Lets get started
          </Text>
        </View>
        <View
          style={{
            height: '50%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 25,
            // backgroundColor: 'green',
          }}>
          <Text style={{color: '#595cff', textAlign: 'justify', fontSize: 16}}>
            The Face Recognition Attendance System automates school attendance
            using facial recognition. It identifies students, records real-time
            attendance, and generates automated reports. This efficient and
            secure app reduces manual work for teachers and improves
            productivity with seamless integration and instant Evaluation.
          </Text>
        </View>
        <View
          style={{
            height: '20%',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
              // addDummyData();
            }}
            style={styles.button}>
            <Text style={styles.text}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
  },
  text: {
    color: 'white',
    fontSize: 23,
    // lineHeight: 50,
    // width: 200,
    fontWeight: '500',
    textAlign: 'center',
    // // backgroundColor: '#000000c0',
    // bottom: 10,
    // right: 10,
  },
  button: {
    color: 'white',
    width: 180,
    height: 50,
    // backgroundColor: '#000000c0',
    backgroundColor: 'blue',
    bottom: 30,
    right: 25,
    borderRadius: 10,
    justifyContent: 'center',
  },
});
