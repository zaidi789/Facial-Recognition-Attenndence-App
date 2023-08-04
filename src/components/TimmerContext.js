import React, {createContext, useState, useEffect} from 'react';

const TimerContext = createContext();

const formatTime = totalSeconds => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
  };
};

export const TimerProvider = ({children}) => {
  const [remainingSecs, setRemainingSecs] = useState(28800); // Initial value (you can change it)
  const [formattedTime, setFormattedTime] = useState(formatTime(remainingSecs));

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setRemainingSecs(prevSecs => (prevSecs > 0 ? prevSecs - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setFormattedTime(formatTime(remainingSecs));
  }, [remainingSecs]);

  return (
    <TimerContext.Provider value={{remainingSecs, formattedTime}}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
