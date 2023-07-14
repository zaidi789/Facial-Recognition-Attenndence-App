import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FaceApiTest from '../components/FaceApiTest';
import Main from '../Screens/Main';
import Home from '../Screens/Home';
import Register from '../Screens/Register';
import Attandance from '../Screens/Attandance';
import CropImage from '../Screens/ImageCroping';

const Stack = createNativeStackNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Attandance" component={Attandance} />
        <Stack.Screen name="CropImage" component={CropImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
