import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../Screens/Main';
import Home from '../Screens/Home';
import Register from '../Screens/Register';
import Attandance from '../Screens/Attandance';
import CropImage from '../Screens/ImageCroping';
import SectionsList from '../Screens/SectionsList';
import SectionsDetails from '../Screens/SectionsDetails';
import Login from '../Screens/Login';
// import ImageCompression from '../Screens/ImageCompression';
import StartScreen from '../Screens/StartScreen';
import {View, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entery from '../Screens/Entery';
import DetailsShow from '../Screens/DetailsShow';
import ClassList from '../Screens/ClassList';
import DataEntryPage from '../Screens/DataEntry';
import Test from '../Screens/Test';
import Login1 from '../Screens/Login1';

const Stack = createNativeStackNavigator();
function HeaderLeft({navigation}) {
  return (
    <View style={{backgroundColor: 'red'}}>
      <Icon name="angle-left" size={30} color="#1841c7" />
    </View>
  );
}
function HeaderTitleLogin({navigation}) {
  return (
    <View style={{flexDirection: 'row', marginRight: 15}}>
      {/* <View style={{justifyContent: 'center'}}>
        <Icon name="angle-left" size={30} color="#1841c7" />
      </View> */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <Image
          source={{
            uri: 'https://www.techup.co.in/wp-content/uploads/2020/03/techup_final_logo.png',
          }}
          style={{widith: 100, height: 60, resizeMode: 'contain'}}
        /> */}
        <Text style={{fontSize: 24, fontWeight: '800', color: 'black'}}>
          Login
        </Text>
      </View>
      {/* <View style={{justifyContent: 'center', padding: 5}}>
        <MaterialCommunityIcons name="cart" size={30} color="#1841c7" />
      </View> */}
    </View>
  );
}
function HeaderTitleStart({navigation}) {
  return (
    <View style={{flexDirection: 'row', marginRight: 140}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24, fontWeight: '800', color: 'black'}}>
          Start
        </Text>
      </View>
    </View>
  );
}

function HeaderTitleSection({navigation}) {
  return (
    <View style={{flexDirection: 'row', marginRight: 140}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 24, fontWeight: '800', color: 'black'}}>
          Sections
        </Text>
      </View>
    </View>
  );
}
//Unused function
function HeaderRight({navigation}) {
  return (
    <View style={{marginHorizontal: 10}}>
      <MaterialCommunityIcons name="cart" size={30} color="#1841c7" />
    </View>
  );
}

export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="DataEntryPage" component={DataEntryPage} /> */}

        {/* <Stack.Screen name="Main" component={Main} /> */}
        {/* <Stack.Screen name="Test" component={Test} /> */}

        <Stack.Screen name="Entery" component={Entery} />

        <Stack.Screen name="LoginScreen" component={Login1} />

        <Stack.Screen name="ClassList" component={ClassList} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Login"
          component={Login}
          // options={({navigation}) => {
          //   return {
          //     // headerLeft: () => <HeaderLeft navigation={navigation} />,
          //     headerTitle: () => <HeaderTitleLogin navigation={navigation} />,
          //   };
          // }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="Attandance" component={Attandance} />
        <Stack.Screen name="CropImage" component={CropImage} />
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
