import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {v4 as uuid} from 'uuid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native-paper';
import Realm from 'realm';
let realm;
export default function Register() {
  const navigation = useNavigation();

  return (
    <View style={styles.linearGradient}>
      <View
        style={{
          height: 70,
          width: '100%',
          backgroundColor: 'rgb(235,235,235)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 35, color: 'black', fontWeight: 'bold'}}>
          Wellcome
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../Images/background-person.png')}
          style={{height: 400, width: 400}}
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{marginTop: 20, marginBottom: 30, fontSize: 12}}>
          Human face recognition systems use unique mathematical patterns to
          store biometric data. Hence, they are among the safest and most
          effective identification methods in biometric technology. Facial data
          can be anonymized and kept private to reduce the risk of unauthorized
          access.
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 10,
            height: 50,
            width: 200,
            backgroundColor: '#e63946',
          }}
          onPress={() => navigation.navigate('Sections')}>
          <Text style={{color: 'white', fontSize: 22, fontWeight: '600'}}>
            Start
          </Text>
          <FontAwesome
            name="long-arrow-right"
            size={24}
            color="white"
            style={{left: 10, top: 1}}
          />
        </TouchableOpacity>
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
