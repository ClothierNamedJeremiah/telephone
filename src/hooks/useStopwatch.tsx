'use client';

import { useEffect, useState } from 'react';

type Options = {
  durationMins: number;
  durationSeconds: number;
};

export default function useStopwatch({
  durationMins,
  durationSeconds
}: Options) {
  const [status, setStatus] = useState<'on' | 'off'>('on');
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (status === 'on') {
      intervalId = setInterval(() => {
        setElapsedTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [status]);

  const duration = durationMins * 60 + durationSeconds;
  const remainingTime = Math.max(0, duration - elapsedTime);
  const isTimeUp = remainingTime === 0;
  if (isTimeUp && status === 'on') {
    setStatus('off');
  }

  return {
    remainingTime,
    isTimeUp,
    restart: () => {
      setElapsedTime(0);
      setStatus('on');
    }
  };
}
