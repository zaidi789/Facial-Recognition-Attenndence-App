import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import SectionsList from '../Screens/SectionsList';
import SectionsDetails from '../Screens/SectionsDetails';
import Login from '../Screens/Login';
import StartScreen from '../Screens/StartScreen';
import Entery from '../Screens/Entery';
import DetailsShow from '../Screens/DetailsShow';
import ClassList from '../Screens/ClassList';
import Login1 from '../Screens/Login1';

const Stack = createNativeStackNavigator();

export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Entery" component={Entery} />

        <Stack.Screen name="LoginScreen" component={Login1} />

        <Stack.Screen name="ClassList" component={ClassList} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="Sections" component={SectionsList} />
        <Stack.Screen
          name="Students Details"
          component={SectionsDetails}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name="CompressImage" component={ImageCompression} /> */}
        <Stack.Screen name="DetailsShow" component={DetailsShow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
