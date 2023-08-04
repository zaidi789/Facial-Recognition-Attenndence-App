import React, {useEffect} from 'react';
import Nav from './src/navigation';
import initializeRealm from './src/Realm/realm';
import {TimerProvider} from './src/components/TimmerContext';

export default function App() {
  useEffect(() => {
    const realm = initializeRealm();
    return () => realm.close();
  }, []);
  return (
    <TimerProvider>
      <Nav />
    </TimerProvider>
  );
}
