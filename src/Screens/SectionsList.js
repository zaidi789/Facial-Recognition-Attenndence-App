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
      title: 'One',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: 'Two',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: 'Three',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: 'Four',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: 'Five',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: 'Six',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: 'Seven',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: 'Eight',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: 'Nine',
      avatar: require('../Images/avatar.png'),
    },
    {
      id: uuid.v4(),
      title: 'Ten',
      avatar: require('../Images/avatar.png'),
    },
  ];

  return (
    <LinearGradient
      colors={['#02c39a', '#02c39a']}
      style={styles.linearGradient}>
      <LinearGradient
        style={{
          height: '10%',
          width: '100%',
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={['#02c39a', '#02c39a', '#ffdab9']}>
        <Text style={{fontSize: 40, color: 'black', fontWeight: 'bold'}}>
          Sections List
        </Text>
      </LinearGradient>
      <LinearGradient
        style={{
          height: '90%',
          width: '100%',
          backgroundColor: 'green',
          paddingTop: 20,
        }}
        colors={['#caefd7', '#f5bfd7', '#abc9e9']}>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Students Details');
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </LinearGradient>
    </LinearGradient>
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

    // borderRadius: 5,
  },
  item: {
    backgroundColor: '#72efdd',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 32,
    color: 'black',
  },
});
