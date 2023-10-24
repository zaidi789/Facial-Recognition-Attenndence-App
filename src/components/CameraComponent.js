import React from 'react';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const CameraComponent = () => {
  return (
    <View style={{flex: 1}}>
      <RNCamera type={RNCamera.Constants.Type.front} />
    </View>
  );
};

export default CameraComponent;
