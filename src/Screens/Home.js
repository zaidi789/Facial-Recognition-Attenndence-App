import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#ff930f', '#ff930f']}
      style={styles.linearGradient}>
      <LinearGradient
        style={{
          height: '15%',
          width: '100%',
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        colors={['#c9def4', '#c9def4']}>
        <Text style={{fontSize: 40, color: 'black', fontWeight: 'bold'}}>
          Wellcome
        </Text>
      </LinearGradient>
      <LinearGradient
        style={{
          height: '85%',
          width: '100%',
          backgroundColor: 'green',
          //   justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 20,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        colors={['#b9dcf2', '#caefd7']}>
        <Text style={styles.buttonHeadingText}>
          Compare images please click here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <LinearGradient style={styles.button} colors={['#f756aa', '#f75672']}>
            <Text style={styles.buttonText}>Compare Images</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.buttonHeadingText}>
          Mark Attandence please click here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Attandance')}>
          <LinearGradient style={styles.button} colors={['#f756aa', '#f75672']}>
            <Text style={styles.buttonText}>Mark Attandance</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.buttonHeadingText}>
          Register a Student please click here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <LinearGradient style={styles.button} colors={['#f756aa', '#f75672']}>
            <Text style={styles.buttonText}>Register Student</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.buttonHeadingText}>
          Crop Image please click here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CropImage')}>
          <LinearGradient style={styles.button} colors={['#f756aa', '#f75672']}>
            <Text style={styles.buttonText}>Crop Images</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.buttonHeadingText}>
          Section List please click here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Sections')}>
          <LinearGradient style={styles.button} colors={['#f756aa', '#f75672']}>
            <Text style={styles.buttonText}>Section List</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.buttonHeadingText}>
          Compress Image? click here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CompressImage')}>
          <LinearGradient style={styles.button} colors={['#f756aa', '#f75672']}>
            <Text style={styles.buttonText}>Compress Image</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    height: '100%',
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    // borderRadius: ,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  buttonHeadingText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: 'black',
    backgroundColor: 'transparent',
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 2,
    width: 200,
  },
});
