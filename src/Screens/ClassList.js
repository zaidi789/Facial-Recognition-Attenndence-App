import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, FlatList, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Realm from 'realm';
let realm;
export default function ClassList() {
  const navigation = useNavigation();
  const [classes, setClasses] = useState([]);
  const [classesNo, setClassesNo] = useState([]);

  //   useEffect(() => {
  //     realm = new Realm({path: 'UserDatabase.realm'});
  //     const allSections = realm
  //       .objects('Student')
  //       .sorted('class')
  //       .map(section => section.section);
  //     setSections(allSections);
  //     const studentsBySection = {};
  //     allSections.forEach(section => {
  //       const studentsInSection = realm
  //         .objects('Student')
  //         .filtered('section = $0', section);
  //       studentsBySection[section] = studentsInSection;
  //     });

  //     setStudentDetails(studentsBySection);
  //     return () => {
  //       realm.close();
  //     };
  //   }, []);
  useEffect(() => {
    const realm = initializeRealm();

    // Get all unique classes from the 'Student' table
    const allClasses = realm
      .objects('Student')
      .sorted('class')
      .map(student => student.class);

    // Update the state with the class list
    setClasses(allClasses);

    // Close the Realm instance
    realm.close();
  }, []);

  // useEffect(() => {
  //   const realm = initializeRealm();

  //   // Get all unique classes from the 'Student' table
  //   const allClasses = realm
  //     .objects('Student')
  //     .sorted('class')
  //     .map(student => parseInt(student.class.split(' ')[1]));

  //   // Get unique class numbers
  //   const uniqueClasses = [...new Set(allClasses)];

  //   // Update the state with the class list
  //   setClasses(uniqueClasses);

  //   // Close the Realm instance
  //   realm.close();
  // }, []);

  //   console.log(classes);
  const uniqueClasses = [...new Set(classes)];
  const secLength = uniqueClasses.length;
  console.log('Length is', uniqueClasses);

  return (
    <View style={styles.linearGradient}>
      <View
        style={{
          // height: '10%',
          // width: '100%',
          backgroundColor: 'rgb(235,235,235)',
          justifyContent: 'space-between',
          alignItems: 'center',
          // flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
            fontWeight: 'bold',
            // left: 10,
            bottom: 7,
          }}>
          Class List
        </Text>
      </View>
      <View
        style={{
          height: '90%',
          width: '100%',
          backgroundColor: 'rgb(235,235,235)',
          paddingTop: 10,
        }}>
        <FlatList
          data={uniqueClasses}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Sections', {
                    ClassId: item,
                    // length: secLength,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 25, color: 'black'}}>
                    Class - {item}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    height: '100%',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgb(235,235,235)',

    // borderRadius: 5,
  },
  item: {
    backgroundColor: '#fdfffc',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    height: 50,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 12,
    // borderRadius: 20,
  },
  title: {
    fontSize: 25,
    color: 'black',
  },
});
