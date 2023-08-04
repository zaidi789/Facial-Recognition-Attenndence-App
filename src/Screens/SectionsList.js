import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, FlatList, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Timer from '../components/CustomTimer';

export default function SectionsList({route}) {
  const navigation = useNavigation();
  const {ClassId} = route.params;
  const [classID, setClassID] = useState(parseInt(ClassId));
  const [flatListItems, setFlatListItems] = useState([]);
  const [sections, setSections] = useState([]);
  // const [secLength, setSecLenght] = useState('');
  const [studentDetails, setStudentDetails] = useState({});
  const [flatListData, setFlatListData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   realm = new Realm({path: 'UserDatabase.realm'});
  //   const allSections = realm
  //     .objects('user_details')
  //     .sorted('section')
  //     .map(section => section.section);
  //   setSections(allSections);
  //   const studentsBySection = {};
  //   allSections.forEach(section => {
  //     const studentsInSection = realm
  //       .objects('user_details')
  //       .filtered('section = $0', section);
  //     studentsBySection[section] = studentsInSection;
  //   });

  //   setStudentDetails(studentsBySection);
  //   return () => {
  //     realm.close();
  //   };
  // }, []);

  useEffect(() => {
    const realm = initializeRealm();

    // Get all sections of the selected class from the 'Student' table
    const sectionsOfClass = realm
      .objects('Student')
      .filtered('class = $0', ClassId)
      .sorted('section')
      .map(student => student.section);

    // Filter out duplicates and update the state with the sections list
    const uniqueSections = [...new Set(sectionsOfClass)];
    setSections(uniqueSections);

    // Close the Realm instance
    realm.close();
  }, [ClassId]);

  const uniqueSections = [...new Set(sections)];
  const secLength = uniqueSections.length;
  // console.log('Length is', ClassId);
  // const DATA = [
  //   {
  //     id: uuid.v4(),
  //     title: '1',
  //     avatar: require('../Images/avatar.png'),
  //   },
  //   {
  //     id: uuid.v4(),
  //     title: '2',
  //     avatar: require('../Images/avatar.png'),
  //   },
  //   {
  //     id: uuid.v4(),
  //     title: '3',
  //     avatar: require('../Images/avatar.png'),
  //   },
  //   {
  //     id: uuid.v4(),
  //     title: '4',
  //     avatar: require('../Images/avatar.png'),
  //   },
  //   {
  //     id: uuid.v4(),
  //     title: '5',
  //     avatar: require('../Images/avatar.png'),
  //   },
  //   {
  //     id: uuid.v4(),
  //     title: '6',
  //     avatar: require('../Images/avatar.png'),
  //   },
  //   {
  //     id: uuid.v4(),
  //     title: '7',
  //     avatar: require('../Images/avatar.png'),
  //   },
  //   {
  //     id: uuid.v4(),
  //     title: '8',
  //     avatar: require('../Images/avatar.png'),
  //   },
  //   {
  //     id: uuid.v4(),
  //     title: '9',
  //     avatar: require('../Images/avatar.png'),
  //   },
  //   {
  //     id: uuid.v4(),
  //     title: '10',
  //     avatar: require('../Images/avatar.png'),
  //   },
  // ];

  return (
    <View style={styles.linearGradient}>
      <View
        style={{
          // height: '10%',
          // width: '100%',
          backgroundColor: 'rgb(235,235,235)',
          // justifyContent: 'space-between',
          // alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 30,
            color: 'black',
            fontWeight: 'bold',
            left: 4,
            bottom: 2,
          }}>
          Sections List
        </Text>
        <View style={{left: 30}}>
          <Timer isActive={true} />
        </View>
      </View>
      <View
        style={{
          height: '90%',
          width: '100%',
          backgroundColor: 'rgb(235,235,235)',
          paddingTop: 10,
        }}>
        <FlatList
          data={uniqueSections}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Students Details', {
                    section: item,
                    classId: ClassId,
                  });
                  // console.log(section, classId);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 25, color: 'black'}}>
                    Section-{item}
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
