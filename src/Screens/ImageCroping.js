// import React, {Component} from 'react';
// import {
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
// import Video from 'react-native-video';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: 'blue',
//     marginBottom: 10,
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//     textAlign: 'center',
//   },
// });

// export default class CropImage extends Component {
//   constructor() {
//     super();
//     this.state = {
//       image: null,
//       images: null,
//     };
//   }

//   pickSingleWithCamera(cropping, mediaType = 'photo') {
//     ImagePicker.openCamera({
//       cropping: cropping,
//       width: 500,
//       height: 500,
//       includeExif: true,
//       mediaType,
//     })
//       .then(image => {
//         console.log('received image', image);
//         this.setState({
//           image: {
//             uri: image.path,
//             width: image.width,
//             height: image.height,
//             mime: image.mime,
//           },
//           images: null,
//         });
//       })
//       .catch(e => alert(e));
//   }

//   pickSingleBase64(cropit) {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 300,
//       cropping: cropit,
//       includeBase64: true,
//       includeExif: true,
//     })
//       .then(image => {
//         console.log('received base64 image');
//         this.setState({
//           image: {
//             uri: `data:${image.mime};base64,` + image.data,
//             width: image.width,
//             height: image.height,
//           },
//           images: null,
//         });
//       })
//       .catch(e => alert(e));
//   }

//   cleanupImages() {
//     ImagePicker.clean()
//       .then(() => {
//         console.log('removed tmp images from tmp directory');
//       })
//       .catch(e => {
//         alert(e);
//       });
//   }

//   cleanupSingleImage() {
//     let image =
//       this.state.image ||
//       (this.state.images && this.state.images.length
//         ? this.state.images[0]
//         : null);
//     console.log('will cleanup image', image);

//     ImagePicker.cleanSingle(image ? image.uri : null)
//       .then(() => {
//         console.log(`removed tmp image ${image.uri} from tmp directory`);
//       })
//       .catch(e => {
//         alert(e);
//       });
//   }

//   cropLast() {
//     if (!this.state.image) {
//       return Alert.alert(
//         'No image',
//         'Before open cropping only, please select image',
//       );
//     }

//     ImagePicker.openCropper({
//       path: this.state.image.uri,
//       width: 200,
//       height: 200,
//     })
//       .then(image => {
//         console.log('received cropped image', image);
//         this.setState({
//           image: {
//             uri: image.path,
//             width: image.width,
//             height: image.height,
//             mime: image.mime,
//           },
//           images: null,
//         });
//       })
//       .catch(e => {
//         console.log(e);
//         Alert.alert(e.message ? e.message : e);
//       });
//   }

//   pickSingle(cropit, circular = false, mediaType) {
//     ImagePicker.openPicker({
//       width: 500,
//       height: 500,
//       cropping: cropit,
//       cropperCircleOverlay: circular,
//       sortOrder: 'none',
//       compressImageMaxWidth: 1000,
//       compressImageMaxHeight: 1000,
//       compressImageQuality: 1,
//       compressVideoPreset: 'MediumQuality',
//       includeExif: true,
//       cropperStatusBarColor: 'white',
//       cropperToolbarColor: 'white',
//       cropperActiveWidgetColor: 'white',
//       cropperToolbarWidgetColor: '#3498DB',
//     })
//       .then(image => {
//         console.log('received image', image);
//         this.setState({
//           image: {
//             uri: image.path,
//             width: image.width,
//             height: image.height,
//             mime: image.mime,
//           },
//           images: null,
//         });
//       })
//       .catch(e => {
//         console.log(e);
//         Alert.alert(e.message ? e.message : e);
//       });
//   }

//   pickMultiple() {
//     ImagePicker.openPicker({
//       multiple: true,
//       waitAnimationEnd: false,
//       sortOrder: 'desc',
//       includeExif: true,
//       forceJpg: true,
//     })
//       .then(images => {
//         this.setState({
//           image: null,
//           images: images.map(i => {
//             console.log('received image', i);
//             return {
//               uri: i.path,
//               width: i.width,
//               height: i.height,
//               mime: i.mime,
//             };
//           }),
//         });
//       })
//       .catch(e => alert(e));
//   }

//   scaledHeight(oldW, oldH, newW) {
//     return (oldH / oldW) * newW;
//   }

//   renderVideo(video) {
//     console.log('rendering video');
//     return (
//       <View style={{height: 300, width: 300}}>
//         <Video
//           source={{uri: video.uri, type: video.mime}}
//           style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
//           rate={1}
//           paused={false}
//           volume={1}
//           muted={false}
//           resizeMode={'cover'}
//           onError={e => console.log(e)}
//           onLoad={load => console.log(load)}
//           repeat={true}
//         />
//       </View>
//     );
//   }

//   renderImage(image) {
//     return (
//       <Image
//         style={{width: 300, height: 300, resizeMode: 'contain'}}
//         source={image}
//       />
//     );
//   }

//   renderAsset(image) {
//     if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
//       return this.renderVideo(image);
//     }

//     return this.renderImage(image);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView>
//           {this.state.image ? this.renderAsset(this.state.image) : null}
//           {this.state.images
//             ? this.state.images.map(i => (
//                 <View key={i.uri}>{this.renderAsset(i)}</View>
//               ))
//             : null}
//         </ScrollView>

//         <TouchableOpacity
//           onPress={() => this.pickSingleWithCamera(false)}
//           style={styles.button}>
//           <Text style={styles.text}>Select Single Image With Camera</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() =>
//             this.pickSingleWithCamera(false, (mediaType = 'video'))
//           }
//           style={styles.button}>
//           <Text style={styles.text}>Select Single Video With Camera</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => this.pickSingleWithCamera(true)}
//           style={styles.button}>
//           <Text style={styles.text}>
//             Select Single With Camera With Cropping
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => this.pickSingle(false)}
//           style={styles.button}>
//           <Text style={styles.text}>Select Single</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => this.cropLast()} style={styles.button}>
//           <Text style={styles.text}>Crop Last Selected Image</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => this.pickSingleBase64(false)}
//           style={styles.button}>
//           <Text style={styles.text}>Select Single Returning Base64</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => this.pickSingle(true)}
//           style={styles.button}>
//           <Text style={styles.text}>Select Single With Cropping</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => this.pickSingle(true, true)}
//           style={styles.button}>
//           <Text style={styles.text}>Select Single With Circular Cropping</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={this.pickMultiple.bind(this)}
//           style={styles.button}>
//           <Text style={styles.text}>Select Multiple</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={this.cleanupImages.bind(this)}
//           style={styles.button}>
//           <Text style={styles.text}>Cleanup All Images</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={this.cleanupSingleImage.bind(this)}
//           style={styles.button}>
//           <Text style={styles.text}>Cleanup Single Image</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

import React, {useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

const CropImage = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState(null);

  const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then(image => {
        console.log('received image', image);
        setImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
        setImages(null);
      })
      .catch(e => alert(e));
  };

  const pickSingleBase64 = cropit => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    })
      .then(image => {
        console.log('received base64 image');
        setImage({
          uri: `data:${image.mime};base64,` + image.data,
          width: image.width,
          height: image.height,
        });
        console.log(image);
        setImages(null);
      })
      .catch(e => alert(e));
  };

  const cleanupImages = () => {
    ImagePicker.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  };

  const cleanupSingleImage = () => {
    let selectedImage = image || (images && images.length ? images[0] : null);
    console.log('will cleanup image', selectedImage);

    ImagePicker.cleanSingle(selectedImage ? selectedImage.uri : null)
      .then(() => {
        console.log(
          `removed tmp image ${selectedImage.uri} from tmp directory`,
        );
      })
      .catch(e => {
        alert(e);
      });
  };

  const cropLast = () => {
    if (!image) {
      return Alert.alert(
        'No image',
        'Before open cropping only, please select image',
      );
    }

    ImagePicker.openCropper({
      path: image.uri,
      width: 200,
      height: 200,
    })
      .then(image => {
        console.log('received cropped image', image);
        setImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
        setImages(null);
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };

  const pickSingle = (cropit, circular = false, mediaType) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then(image => {
        console.log('received image', image);
        setImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
        setImages(null);
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  };

  const pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then(selectedImages => {
        setImages(
          selectedImages.map(i => ({
            uri: i.path,
            width: i.width,
            height: i.height,
            mime: i.mime,
          })),
        );
        setImage(null);
      })
      .catch(e => alert(e));
  };

  const scaledHeight = (oldW, oldH, newW) => {
    return (oldH / oldW) * newW;
  };

  const renderVideo = video => {
    console.log('rendering video');
    return (
      <View style={{height: 300, width: 300}}>
        <Video
          source={{uri: video.uri, type: video.mime}}
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          rate={1}
          paused={false}
          volume={1}
          muted={false}
          resizeMode={'cover'}
          onError={e => console.log(e)}
          onLoad={load => console.log(load)}
          repeat={true}
        />
      </View>
    );
  };

  const renderImage = image => {
    return (
      <Image
        style={{width: 300, height: 300, resizeMode: 'contain'}}
        source={image}
      />
    );
  };

  const renderAsset = image => {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return renderVideo(image);
    }

    return renderImage(image);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {image ? renderAsset(image) : null}
        {images
          ? images.map(i => <View key={i.uri}>{renderAsset(i)}</View>)
          : null}
      </ScrollView>

      <TouchableOpacity
        onPress={() => pickSingleWithCamera(false)}
        style={styles.button}>
        <Text style={styles.text}>Select Single Image With Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => pickSingleWithCamera(false, (mediaType = 'video'))}
        style={styles.button}>
        <Text style={styles.text}>Select Single Video With Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => pickSingleWithCamera(true)}
        style={styles.button}>
        <Text style={styles.text}>Select Single With Camera With Cropping</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pickSingle(false)} style={styles.button}>
        <Text style={styles.text}>Select Single</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => cropLast()} style={styles.button}>
        <Text style={styles.text}>Crop Last Selected Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => pickSingleBase64(false)}
        style={styles.button}>
        <Text style={styles.text}>Select Single Returning Base64</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => pickSingle(true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Cropping</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => pickSingle(true, true)}
        style={styles.button}>
        <Text style={styles.text}>Select Single With Circular Cropping</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickMultiple} style={styles.button}>
        <Text style={styles.text}>Select Multiple</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={cleanupImages} style={styles.button}>
        <Text style={styles.text}>Cleanup All Images</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={cleanupSingleImage} style={styles.button}>
        <Text style={styles.text}>Cleanup Single Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CropImage;
