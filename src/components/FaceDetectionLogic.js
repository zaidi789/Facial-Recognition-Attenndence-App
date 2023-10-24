import React, {useState} from 'react';
import {RNCamera} from 'react-native-vision-camera';
import {FaceDetector} from '@react-native-community/cameraroll';

const FaceDetectionLogic = () => {
  const [isLive, setIsLive] = useState(false);

  const handleFaceDetection = faces => {
    if (faces.length > 0) {
      const face = faces[0];
      // Check for movements or other liveness actions
      if (face.smilingProbability > 0.5) {
        setIsLive(true);
      } else {
        setIsLive(false);
      }
    }
  };

  return (
    <RNCamera
      style={{flex: 1}}
      type={RNCamera.Constants.Type.front}
      onFacesDetected={handleFaceDetection}
      faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
    />
  );
};

export default FaceDetectionLogic;
