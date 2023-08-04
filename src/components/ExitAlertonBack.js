import {useEffect, useState} from 'react';
import {BackHandler, Alert} from 'react-native';

export function useExitAlertOnBack(screenToHandleBack) {
  useEffect(() => {
    const handleBackPress = () => {
      if (screenToHandleBack) {
        // Show the exit alert if the user is on the screen that requires the alert
        Alert.alert(
          'Confirm Exit',
          'Are you sure you want to exit?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => BackHandler.exitApp(),
            },
          ],
          {cancelable: false},
        );
        return true; // Prevent default back behavior
      } else {
        // Use the default back behavior for other screens
        return false;
      }
    };

    // Add back press event listener when the screen is focused
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      // Remove back press event listener when the screen is unfocused
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [screenToHandleBack]);
}
