import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#7400b8', '#4ea8de', '#5e60ce']}
      style={styles.linearGradient}>
      <LinearGradient
        style={{
          height: '25%',
          width: '100%',
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={['#02c39a', '#02c39a', '#ffdab9']}>
        <Text style={{fontSize: 40, color: 'black', fontWeight: 'bold'}}>
          Wellcome
        </Text>
      </LinearGradient>
      <LinearGradient
        style={{
          height: '75%',
          width: '100%',
          backgroundColor: 'green',
          //   justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 20,
        }}
        colors={['#caefd7', '#f5bfd7', '#abc9e9']}>
        <Text style={styles.buttonHeadingText}>
          Compare images please click here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <LinearGradient
            style={{
              borderRadius: 50,
              borderWidth: 1,
              marginBottom: 2,
              width: 200,
            }}
            colors={['#ede342', '#3b5998', '#ff51eb']}>
            <Text style={styles.buttonText}>Compare Images</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.buttonHeadingText}>
          Make Attandence please click here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Attandance')}>
          <LinearGradient
            style={{
              borderRadius: 50,
              borderWidth: 1,
              marginBottom: 2,
              width: 200,
            }}
            colors={['#ede342', '#3b5998', '#ff51eb']}>
            <Text style={styles.buttonText}>Mark Attandance</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.buttonHeadingText}>
          Register a Student please click here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <LinearGradient
            style={{
              borderRadius: 50,
              borderWidth: 1,
              marginBottom: 2,
              width: 200,
            }}
            colors={['#ede342', '#3b5998', '#ff51eb']}>
            <Text style={styles.buttonText}>Register Student</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.buttonHeadingText}>
          Crop Image please click here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CropImage')}>
          <LinearGradient
            style={{
              borderRadius: 50,
              borderWidth: 1,
              // marginBottom: 20,
              width: 200,
            }}
            colors={['#ede342', '#3b5998', '#ff51eb']}>
            <Text style={styles.buttonText}>Crop Images</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.buttonHeadingText}>
          Section List please click here!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Sections')}>
          <LinearGradient
            style={{
              borderRadius: 50,
              borderWidth: 1,
              // marginBottom: 20,
              width: 200,
            }}
            colors={['#ede342', '#3b5998', '#ff51eb']}>
            <Text style={styles.buttonText}>Section List</Text>
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    // borderRadius: 5,
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
});
