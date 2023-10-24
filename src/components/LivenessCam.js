import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';

function LivenessCam() {
  const camera = useRef(null);

  const [isLivenessDetected, setIsLivenessDetected] = useState(false);
  const [lastBlinkTimestamp, setLastBlinkTimestamp] = useState(0);
  const [simulateBlink, setSimulateBlink] = useState(false);

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await RNCamera.requestCameraPermission();
      console.log(newCameraPermission);
    }
    getPermission();
  }, []);

  const handleCameraStream = async camera => {
    const isBlinkDetected = await detectBlink();
    setIsLivenessDetected(isBlinkDetected);
  };

  const detectBlink = () => {
    const now = Date.now();
    if (now - lastBlinkTimestamp < 1000) {
      return false; // Avoid rapid blinking detection
    }

    const isBlinkSimulated = simulateBlink; // Simulate blink based on button press

    if (isBlinkSimulated) {
      setLastBlinkTimestamp(now);
      return true; // Blink detected
    }

    return false;
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera} // Add this line to pass the camera reference
        style={styles.camera}
        type={RNCamera.Constants.Type.front}
        onCameraReady={({camera}) => handleCameraStream(camera)}
      />
      <TouchableOpacity
        onPress={() => setSimulateBlink(true)}
        style={styles.button}>
        <Text>Simulate Blink</Text>
      </TouchableOpacity>
      <Text style={styles.resultText}>
        Liveness Detected: {isLivenessDetected ? 'Yes' : 'No'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '70%',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  resultText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default LivenessCam;
