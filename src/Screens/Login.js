import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Reinput from 'reinput';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Hello Again!</Text>
        <Text style={styles.subHeading}>Wellcome back you've</Text>
        <Text style={styles.subHeading}>been missed!</Text>
      </View>
      <View style={styles.inputsView}>
        <Reinput
          label="Email"
          onChangeText={setEmail}
          value={email}
          // iconOverlay={<Icon name="eye" size={25} />}
        />
        <Reinput
          label="Password"
          onChangeText={setPassword}
          value={Password}
          secureTextEntry={true}
          // iconOverlay={<Icon name="eye" size={25} />}
          // icon={<Icon name="eye" size={25} />}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StartScreen')}>
          <Text style={styles.btnText}>SignIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(201,201,201)',
    alignItems: 'center',
  },
  heading: {
    fontSize: 35,
    color: 'black',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 30,
    color: 'black',
    fontWeight: '300',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  inputsView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    // backgroundColor: 'green',
  },
  input: {
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
  },
  button: {
    width: 280,
    backgroundColor: '#ef340a',
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
});
