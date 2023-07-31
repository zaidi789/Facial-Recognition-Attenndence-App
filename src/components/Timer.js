import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import moment from 'moment';

const CustomTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleTimer = () => {
    setIsPlaying(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={60} // Change the duration to your desired timer value (in seconds)
        colors={[['#004777', 0.4], ['#F7B801', 0.4], ['#A30000']]}
        onComplete={() => {
          setIsPlaying(false);
        }}>
        {({remainingTime, animatedColor}) => (
          <Text style={[styles.timerText, {color: animatedColor}]}>
            {moment.utc(remainingTime * 1000).format('mm:ss')}
          </Text>
        )}
      </CountdownCircleTimer>

      <TouchableOpacity style={styles.button} onPress={handleToggleTimer}>
        <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomTimer;
