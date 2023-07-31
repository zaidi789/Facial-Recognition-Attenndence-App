// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   StatusBar,
//   TouchableOpacity,
//   Dimensions,
//   AppState,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import BackgroundTimer from 'react-native-background-timer';

// const screen = Dimensions.get('window');

// const formatNumber = number => `0${number}`.slice(-2);

// const getRemaining = time => {
//   const hours = Math.floor(time / 3600);
//   const mins = Math.floor((time % 3600) / 60);
//   const secs = time - hours * 3600 - mins * 60;
//   return {
//     hours: formatNumber(hours),
//     mins: formatNumber(mins),
//     secs: formatNumber(secs),
//   };
// };

// export default function Timer() {
//   const [remainingSecs, setRemainingSecs] = useState(600); // Initial value (you can change it)
//   const [isActive, setIsActive] = useState(false);
//   const {hours, mins, secs} = getRemaining(remainingSecs);

//   const toggle = () => {
//     setIsActive(!isActive);
//   };

//   const loadTimerFromStorage = async () => {
//     try {
//       const savedRemainingSecs = await AsyncStorage.getItem('remainingSecs');
//       if (savedRemainingSecs !== null) {
//         setRemainingSecs(parseInt(savedRemainingSecs));
//       }
//     } catch (error) {
//       console.error('Error loading timer from storage:', error);
//     }
//   };

//   const saveTimerToStorage = async () => {
//     try {
//       await AsyncStorage.setItem('remainingSecs', remainingSecs.toString());
//     } catch (error) {
//       console.error('Error saving timer to storage:', error);
//     }
//   };

//   useEffect(() => {
//     const appStateChangeHandler = async nextState => {
//       if (nextState === 'background' || nextState === 'inactive') {
//         // Save timer state when the app goes to the background or becomes inactive
//         await saveTimerToStorage();
//       }
//     };

//     loadTimerFromStorage();
//     AppState.addEventListener('change', appStateChangeHandler);

//     return () => {
//       AppState.removeEventListener('change', appStateChangeHandler);
//     };
//   }, []);

//   useEffect(() => {
//     let interval = null;
//     if (isActive && remainingSecs > 0) {
//       interval = BackgroundTimer.setInterval(() => {
//         setRemainingSecs(prevRemainingSecs => prevRemainingSecs - 1);
//       }, 1000);
//     } else if (remainingSecs === 0) {
//       BackgroundTimer.clearInterval(interval);
//       setIsActive(false);
//       // Show an alert when the timer reaches 00:00:00
//       //   alert('Timer completed!');
//     }
//     return () => {
//       BackgroundTimer.clearInterval(interval);
//     };
//   }, [isActive, remainingSecs]); // Include remainingSecs in the dependency array

//   return (
//     <View style={styles.container}>
//       {hours > 0 ? (
//         <Text style={styles.timerText}>{`${hours}:${mins}:${secs}`}</Text>
//       ) : (
//         <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
//       )}
//       <TouchableOpacity onPress={toggle} style={styles.button}>
//         <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     backgroundColor: '#07121B',
//     alignItems: 'flex-start',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   button: {
//     // borderWidth: 1,
//     // borderColor: '#fff',
//     width: screen.width / 10,
//     height: screen.width / 10,
//     // borderRadius: screen.width / 7,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 2,
//   },
//   buttonText: {
//     fontSize: 12,
//     color: '#fff',
//   },
//   timerText: {
//     color: '#fff',
//     fontSize: 30,
//     // marginBottom: 20,
//     paddingRight: 10,
//   },
//   buttonReset: {
//     marginTop: 10,
//     borderColor: '#FF851B',
//   },
//   buttonTextReset: {
//     color: '#FF851B',
//   },
// });

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

const Timer = () => {
  const [remainingSecs, setRemainingSecs] = useState(600); // Initial value (you can change it)
  const [isActive, setIsActive] = useState(false);
  const {hours, mins, secs} = getRemaining(remainingSecs);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const startTimer = () => {
    setIsActive(true);
    BackgroundTimer.start();
  };

  const stopTimer = () => {
    setIsActive(false);
    BackgroundTimer.stop();
  };

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
      <TouchableOpacity
        onPress={isActive ? stopTimer : startTimer}
        style={styles.button}>
        <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#07121B',
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
    color: '#fff',
    fontSize: 30,
    paddingRight: 10,
  },
});

export default Timer;
