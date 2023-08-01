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
    const sections = ['A', 'B', 'C', 'D', 'E'];

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

        // Create 5 classes
        for (let classNum = 1; classNum <= 5; classNum++) {
          // Create 4 sections in each class
          for (const sectionName of sections) {
            // Create 5 students in each section
            for (let studentNum = 1; studentNum <= 5; studentNum++) {
              const studentName = `Student ${studentNum}`;
              const bFormNo = `B${classNum}${sectionName}${studentNum}`;

              const student = {
                id: `${classNum}${sectionName}${studentNum}`, // Unique ID for the student based on class, section, and student number
                student_id: `${classNum}${sectionName}${studentNum}`, // Unique ID for the student based on class, section, and student number
                school: school,
                name: studentName,
                father_name: `Father ${studentNum}`,
                b_form_no: bFormNo,
                class: classNum, // Store numeric value for class
                section: sectionName,
                attendance: [],
                image: '',
              };

              // Add the student to the school's students array
              school.students.push(student);
            }
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
        source={require('../Images/background.jpg')}
        resizeMode="stretch"
        style={styles.image}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Login');
            addDummyData();
          }}>
          <Text style={styles.text}>Let's Go</Text>
        </TouchableOpacity>
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  text: {
    color: 'white',
    fontSize: 30,
    lineHeight: 50,
    width: 200,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
    bottom: 10,
    right: 10,
  },
});
