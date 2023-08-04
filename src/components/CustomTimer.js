import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

const screen = Dimensions.get('window');

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const hours = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const secs = time - hours * 3600 - mins * 60;
  return {
    hours: formatNumber(hours),
    mins: formatNumber(mins),
    secs: formatNumber(secs),
  };
};

const Timer = ({isActive}) => {
  const [remainingSecs, setRemainingSecs] = useState(28800); // Initial value (you can change it)
  const {hours, mins, secs} = getRemaining(remainingSecs);

  // const toggle = () => {
  //   setIsActive(!isActive);
  // };

  // const startTimer = () => {
  //   setIsActive(true);
  //   BackgroundTimer.start();
  // };

  // const stopTimer = () => {
  //   setIsActive(false);
  //   BackgroundTimer.stop();
  // };

  useEffect(() => {
    let interval = null;
    if (isActive && remainingSecs > 0) {
      interval = BackgroundTimer.setInterval(() => {
        setRemainingSecs(prevSecs => prevSecs - 1);
      }, 1000);
    } else if (remainingSecs === 0) {
      stopTimer();
    }

    return () => {
      BackgroundTimer.clearInterval(interval);
    };
  }, [isActive, remainingSecs]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{`${hours}:${mins}:${secs}`}</Text>
      {/* <TouchableOpacity
        onPress={isActive ? stopTimer : startTimer}
        style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#07121B',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    width: screen.width / 10,
    height: screen.width / 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
  },
  timerText: {
    color: 'gray',
    fontSize: 30,
    paddingRight: 10,
    fontWeight: 'bold',
  },
});

export default Timer;
