import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import TextField from '../components/MyTextInput';

export default function Login1() {
  return (
    <View style={styles.container}>
      <View style={styles.innerupperCon}>
        <Image
          source={require('../Images/BAbyFace.jpg')}
          style={{
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
            // marginBottom: 10,
            // bottom: ,
          }}
        />
      </View>
      <View style={styles.innerdownCon}>
        <View
          style={{
            alignItems: 'center',
            top: 10,
            borderBottomWidth: 2,
            width: 90,
            alignSelf: 'center',
            borderBlockColor: 'blue',
          }}>
          <Text
            style={{
              fontSize: 25,
              color: 'blue',
              fontWeight: '800',
              marginBottom: 5,
            }}>
            Login
          </Text>
        </View>
        <View style={{top: 20, padding: 30}}>
          <TextField placeholder={'user@mail.com'} label={'Email'} />
        </View>
        <View style={{padding: 30}}>
          <TextField
            placeholder={'secret password'}
            label={'Password'}
            isPassword={true}
          />
        </View>
        <View style={{padding: 30, alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: 200,
              backgroundColor: 'blue',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Login
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
    backgroundColor: 'green',
  },
  innerupperCon: {
    height: 250,
    width: '100%',
    backgroundColor: 'white',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 600,
    // borderBottomEndRadius: 500,
  },
  innerdownCon: {
    position: 'absolute',
    height: 530,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // alignItems: 'center',
    // padding: 30,
    top: 230,
    // marginBottom: 20,
  },
});

{
  /* <ImageBackground
style={{flex: 1}}
source={require('../Images/pxfuel3.jpg')}>
<View style={styles.innerupperCon}>
  {/* <View
  style={{
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: 'white',
  }}></View> */
}
//   <Image
//     source={require('../Images/FaceAngel.png')}
//     style={{
//       height: 150,
//       width: '100%',
//       resizeMode: 'cover',
//       borderBottomLeftRadius: 30,
//       borderBottomRightRadius: 30,
//     }}
//   />
// </View>
// <View style={styles.innerdownCon}>
//   <View style={{}}>
//     <Text style={{fontSize: 35, color: 'white'}}>Welcome!</Text>
//     <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white'}}>
//       Login
//     </Text>
//   </View>
//   <View style={{marginTop: 40}}>
//     <TextField placeholder={'user@mail.com'} label={'Email'} />
//   </View>
//   <View style={{marginTop: 30}}>
//     <TextField
//       placeholder={'secret password'}
//       label={'Password'}
//       isPassword={true}
//     />
//   </View>
//   <View style={{alignItems: 'center'}}>
//     <TouchableOpacity
//       style={{
//         height: 50,
//         width: 150,
//         backgroundColor: '#e5ad00',
//         marginTop: 50,
//         borderRadius: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}>
//       <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
//         Login
// //       </Text>
//     </TouchableOpacity>
//   </View>
// </View>
// </ImageBackground> */}
