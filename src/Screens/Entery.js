import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Entery() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Images/background.jpg')}
        resizeMode="stretch"
        style={styles.image}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
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
