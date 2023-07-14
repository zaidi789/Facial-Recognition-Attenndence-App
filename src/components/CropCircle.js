import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
});

const CropWithCircle = ({image}) => {
  const cropWithCircle = () => {
    if (!image) {
      return Alert.alert('No image', 'Please provide an image.');
    }

    ImagePicker.openCropper({
      path: image.uri,
      width: 200,
      height: 200,
    })
      .then(croppedImage => {
        console.log('received cropped image', croppedImage);
        // Handle the cropped image
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };

  return (
    <TouchableOpacity onPress={cropWithCircle} style={styles.button}>
      <Text style={styles.text}>Crop Image with Circle</Text>
    </TouchableOpacity>
  );
};

export default CropWithCircle;

import React, {useState} from 'react';
import {View, Image} from 'react-native';
import CropWithCircle from './CropWithCircle';

const MainComponent = () => {
  const [image, setImage] = useState(null);

  // ... code to handle image selection and setting the state ...

  return (
    <View>
      {image && <Image source={image} style={styles.image} />}
      <CropWithCircle image={image} />
    </View>
  );
};
