import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Timmer from '../components/CustomTimer';
import TimerContext, {useTimer} from '../components/TimmerContext';

export default function DetailsShow() {
  const navigation = useNavigation();
  // const isActive = useTimer();
  const {formattedTime} = useContext(TimerContext);
  return (
    <View style={styles.container}>
      <Text></Text>
      <View style={styles.innerView}>
        <View>
          <Image
            source={require('../Images/BAbyFace.jpg')}
            style={{height: 200, width: '200'}}
          />
        </View>
        {/* <Timmer isActive={isActive} /> */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: 'black',
            alignSelf: 'center',
          }}>
          {formattedTime.hours} : {formattedTime.minutes} :{' '}
          {formattedTime.seconds}
        </Text>
        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 20, color: 'white', alignSelf: 'center'}}>
            Your assigned classes & Sections
          </Text>
          <View>
            <Text
              style={{fontSize: 16, color: 'white', marginTop: 10, left: 30}}>
              Class: 1,3,5,
            </Text>
            <Text
              style={{fontSize: 16, color: 'white', marginTop: 10, left: 30}}>
              Sections: 1('A','B'), 3('B'), 5('A')
            </Text>
            <Text
              style={{fontSize: 16, color: 'white', marginTop: 10, left: 30}}>
              Note: You have 8 Hours to Complete.
            </Text>
          </View>
        </View>
        <View style={{marginTop: 50, alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              width: 150,
              backgroundColor: '#242acf',
              height: 50,
              borderRadius: 10,
            }}
            onPress={() => {
              // setIsActive(true);
              // navigation.navigate('ClassList');
              Alert.alert(
                'Note',
                'Timer will start you have to complete task within time are You ready?',
                [
                  {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: () => navigation.navigate('ClassList'),
                  },
                ],
              );
            }}>
            <Text style={{fontSize: 18, fontWeight: '800', color: 'white'}}>
              Let's Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#103783',
    padding: 10,
    justifyContent: 'center',
  },

  innerView: {
    height: 520,
    backgroundColor: '#7191BA',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
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
