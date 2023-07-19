import React from 'react';
import {StyleSheet, Text, FlatList, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from 'react-native-paper';
import uuid from 'react-native-uuid';

export default function SectionsList() {
  const navigation = useNavigation();
  //   const listId = uuid.v4();
  const DATA = [
    {
      id: uuid.v4(),
      title: '1',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: '2',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: '3',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: '4',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: '5',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: '6',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: '7',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: '8',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: '9',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: '10',
      avatar: require('../Images/avatar.png'),
    },
  ];

  return (
    <View style={styles.linearGradient}>
      <View
        style={{
          height: '10%',
          width: '100%',
          backgroundColor: 'rgb(235,235,235)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 35, color: 'black', fontWeight: 'bold'}}>
          Sections List
        </Text>
      </View>
      <View
        style={{
          height: '90%',
          width: '100%',
          backgroundColor: 'rgb(235,235,235)',
          paddingTop: 20,
        }}>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Students Details', {
                    sectionId: item.id,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 25, color: 'black'}}>Section</Text>
                  <Text style={{fontSize: 25, color: 'black', right: 20}}>
                    {item.title}
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
